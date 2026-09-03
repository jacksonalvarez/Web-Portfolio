"use client";

import { useEffect, useCallback, useRef } from "react";
import type { Incident } from "@/content/incidents";
import type { CaseStudy } from "@/content/case-studies";

export type AngerLevel = "idle" | "mad" | "furious";

export type BarrelEntity = {
  id: string;
  x: number;
  y: number;
  platform: number;
  direction: 1 | -1;
  speed: number;
  label: string;
  type: "incident" | "case-study";
  caseStudySlug?: string;
};

export type GameState = {
  playerX: number;
  playerY: number;
  playerPlatform: number;
  velocityY: number;
  isJumping: boolean;
  hasHammer: boolean;
  hammerTimer: number;
  anger: AngerLevel;
  solved: string[];
  barrels: BarrelEntity[];
  stunTimer: number;
  selectedCaseStudy: string | null;
  score: number;
};

const PLATFORM_Y = [0.5, 2.2, 3.9];
const PLATFORM_BOUNDS = [-4.5, 4.5];
const GRAVITY = -0.025;
const JUMP_FORCE = 0.42;
const MOVE_SPEED = 0.08;

export function createInitialState(): GameState {
  return {
    playerX: 0,
    playerY: PLATFORM_Y[0],
    playerPlatform: 0,
    velocityY: 0,
    isJumping: false,
    hasHammer: false,
    hammerTimer: 0,
    anger: "idle",
    solved: [],
    barrels: [],
    stunTimer: 0,
    selectedCaseStudy: null,
    score: 0,
  };
}

function angerFromSolved(count: number): AngerLevel {
  if (count >= 6) return "furious";
  if (count >= 3) return "mad";
  return "idle";
}

function spawnInterval(anger: AngerLevel) {
  if (anger === "furious") return 1800;
  if (anger === "mad") return 2800;
  return 4000;
}

export function useGameState(
  incidents: Incident[],
  caseStudies: CaseStudy[],
  onSolved?: (label: string) => void,
) {
  const stateRef = useRef<GameState>(createInitialState());
  const keysRef = useRef<Set<string>>(new Set());
  const lastSpawnRef = useRef(0);
  const incidentIndexRef = useRef(0);
  const caseStudyIndexRef = useRef(0);
  const listenersRef = useRef<Set<() => void>>(new Set());
  const frameRef = useRef<number | null>(null);

  const notify = useCallback(() => {
    listenersRef.current.forEach((listener) => listener());
  }, []);

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);

  const getState = useCallback(() => stateRef.current, []);

  const spawnBarrel = useCallback(() => {
    const state = stateRef.current;
    const anger = state.anger;
    const useCaseStudy = anger === "furious" && Math.random() > 0.4;

    if (useCaseStudy && caseStudies.length > 0) {
      const study = caseStudies[caseStudyIndexRef.current % caseStudies.length];
      caseStudyIndexRef.current += 1;
      state.barrels.push({
        id: `cs-${Date.now()}-${Math.random()}`,
        x: 4.5,
        y: PLATFORM_Y[2] + 1.2,
        platform: 2,
        direction: -1,
        speed: 0.035 + Math.random() * 0.02,
        label: study.title,
        type: "case-study",
        caseStudySlug: study.slug,
      });
      return;
    }

    const incident = incidents[incidentIndexRef.current % incidents.length];
    incidentIndexRef.current += 1;
    const platform = Math.floor(Math.random() * 3);
    const fromLeft = Math.random() > 0.5;

    state.barrels.push({
      id: `inc-${Date.now()}-${Math.random()}`,
      x: fromLeft ? -4.5 : 4.5,
      y: PLATFORM_Y[platform],
      platform,
      direction: fromLeft ? 1 : -1,
      speed: 0.03 + (anger === "mad" ? 0.01 : 0) + (anger === "furious" ? 0.015 : 0),
      label: incident.label,
      type: "incident",
    });
  }, [incidents, caseStudies]);

  const tick = useCallback(() => {
    const state = stateRef.current;
    const keys = keysRef.current;
    const now = Date.now();

    if (state.stunTimer > 0) {
      state.stunTimer -= 1;
    } else {
      if (keys.has("ArrowLeft") || keys.has("a")) state.playerX -= MOVE_SPEED;
      if (keys.has("ArrowRight") || keys.has("d")) state.playerX += MOVE_SPEED;
      if (
        (keys.has(" ") || keys.has("ArrowUp") || keys.has("w")) &&
        !state.isJumping
      ) {
        state.velocityY = JUMP_FORCE;
        state.isJumping = true;
      }
    }

    state.playerX = Math.max(PLATFORM_BOUNDS[0], Math.min(PLATFORM_BOUNDS[1], state.playerX));

    if (state.isJumping) {
      state.velocityY += GRAVITY;
      state.playerY += state.velocityY;

      for (let i = PLATFORM_Y.length - 1; i >= 0; i--) {
        if (state.velocityY < 0 && state.playerY <= PLATFORM_Y[i] + 0.1 && state.playerY > PLATFORM_Y[i] - 0.5) {
          if (Math.abs(state.playerX) < 4.8) {
            state.playerY = PLATFORM_Y[i];
            state.playerPlatform = i;
            state.velocityY = 0;
            state.isJumping = false;
            break;
          }
        }
      }

      if (state.playerY < -1) {
        state.playerY = PLATFORM_Y[0];
        state.playerPlatform = 0;
        state.velocityY = 0;
        state.isJumping = false;
      }
    }

    if (state.hasHammer) {
      state.hammerTimer -= 1;
      if (state.hammerTimer <= 0) state.hasHammer = false;
    }

    if (now - lastSpawnRef.current > spawnInterval(state.anger)) {
      spawnBarrel();
      if (state.anger === "furious" && Math.random() > 0.5) {
        setTimeout(() => spawnBarrel(), 400);
      }
      lastSpawnRef.current = now;
    }

    if (state.anger === "furious" && !state.hasHammer && state.solved.length >= 6 && Math.random() < 0.002) {
      state.hasHammer = true;
      state.hammerTimer = 360;
    }

    state.barrels = state.barrels.filter((barrel) => {
      barrel.x += barrel.speed * barrel.direction;

      const dx = Math.abs(barrel.x - state.playerX);
      const dy = Math.abs(barrel.y - state.playerY);
      const colliding = dx < 0.55 && dy < 0.45;

      if (colliding) {
        if (state.hasHammer && barrel.type === "case-study") {
          state.solved.push(barrel.label);
          state.score += 100;
          state.selectedCaseStudy = barrel.caseStudySlug ?? null;
          onSolved?.(barrel.label);
          return false;
        }

        if (state.isJumping && state.velocityY < 0 && barrel.type === "incident") {
          state.solved.push(barrel.label);
          state.score += 25;
          state.anger = angerFromSolved(state.solved.length);
          onSolved?.(barrel.label);
          return false;
        }

        state.stunTimer = 30;
        return false;
      }

      if (barrel.x < PLATFORM_BOUNDS[0] - 1 || barrel.x > PLATFORM_BOUNDS[1] + 1) {
        return false;
      }

      return true;
    });

    notify();
    frameRef.current = requestAnimationFrame(tick);
  }, [notify, onSolved, spawnBarrel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current.add(event.key);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [tick]);

  const reset = useCallback(() => {
    stateRef.current = createInitialState();
    lastSpawnRef.current = Date.now();
    incidentIndexRef.current = 0;
    caseStudyIndexRef.current = 0;
    notify();
  }, [notify]);

  const clearCaseStudy = useCallback(() => {
    stateRef.current.selectedCaseStudy = null;
    notify();
  }, [notify]);

  return { subscribe, getState, reset, clearCaseStudy };
}
