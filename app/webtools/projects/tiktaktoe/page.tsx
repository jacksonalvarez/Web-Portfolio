"use client";
import Image from "next/image";
import React, { use, useEffect } from "react";

enum GameStatus{
  Playing = "playing",
  Won = "won",
  Draw = "draw",
}

export default function Home() {
  
  const [tileMap, setTileMap] = React.useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [score, setScore] = React.useState<{ player1: number; player2: number }>({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = React.useState<1 | 2>(1); // Magic numbers????
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.Playing); // ENUMS
  // const [gameStatus, setGameStatus] = React.useState<
  const [lastPlayer, setLastPlayer] = React.useState<1 | 2 | 0>(0); // Magic numbers????
  //What happens when a tile is clicked
  const setTile = (row: number, col: number, currentPlayer: 1 | 2) => () => { //*** MARK COMMENTS *** handleTileOnClick
    if(gameStatus == "playing") {
      //Handle Click on Playing State
      if (tileMap[row][col] == 0) {
        //Handle Click on empty tile
        console.log(`Empty Tile clicked at row: ${row}, col: ${col} by player ${currentPlayer}`);
        tileMap[row][col] = currentPlayer; 
        setTileMap([...tileMap]);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setLastPlayer(currentPlayer);
    } else{
      //Handle Click on filled tile
      return;
    }
  }

  };

  useEffect(() => {
    // Check for win conditions
    const checkWin = () => {
      //check win by row.
      for(let i =0; i<3; i++){
        if(tileMap[i][0]===1 && tileMap[i][1]===1 && tileMap[i][2]===1){
          setGameStatus(GameStatus.Won);
          return;
        }
        if(tileMap[i][0]===2 && tileMap[i][1]===2 && tileMap[i][2]===2){
          setGameStatus(GameStatus.Won);
          return;
        }
      }

      //check win by column.
      for(let j =0; j<3; j++){
        if(tileMap[0][j]===1 && tileMap[1][j]===1 && tileMap[2][j]===1){
          setGameStatus(GameStatus.Won);
          return;
        }
        if(tileMap[0][j]===2 && tileMap[1][j]===2 && tileMap[2][j]===2){
          setGameStatus(GameStatus.Won);
          return;
        }
      }

      //check win by diagonal.
      if(tileMap[0][0]==1 && tileMap[1][1]==1 && tileMap[2][2]==1){
          setGameStatus(GameStatus.Won);
        return;
      }
      if(tileMap[0][0]==2 && tileMap[1][1]==2 && tileMap[2][2]==2){
          setGameStatus(GameStatus.Won);
        return;
      }

      // Check for anti-diagonal
      if(tileMap[0][2]==1 && tileMap[1][1]==1 && tileMap[2][0]==1){
          setGameStatus(GameStatus.Won);
        return;
      }
      if(tileMap[0][2]==2 && tileMap[1][1]==2 && tileMap[2][0]==2){
        setGameStatus(GameStatus.Won);
        return;
      }

      // Check for draw
      const isBoardFull = tileMap.every(row => row.every(cell => cell !== 0));
      if(isBoardFull) {
          setGameStatus(GameStatus.Draw);
      }
    };
    const updateScore = () => {
      if(gameStatus === "won") {
        console.log("Updating Score for player ", lastPlayer);
        if(lastPlayer === 1) {
          setScore({player1: score.player1 + 1, player2: score.player2});
        } else if(lastPlayer === 2) {
          setScore({player1: score.player1, player2: score.player2 + 1});
        }
        resetGame();
    }else if (gameStatus === "draw") {
        console.log("Game Drawn");
        resetGame();// No score update on draw
        return;
      }
    };

    updateScore();
    checkWin();
  }, [tileMap,gameStatus]);

  const resetGame = () => {
    setTimeout(() => {
      setTileMap([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
      setGameStatus(GameStatus.Playing);
      setCurrentPlayer(1);
      setLastPlayer(0);
    }, 5000); // 5 seconds delay before resetting the game
  }
  return (
    // use a map to create the grid of images, not hardcoded.
      <div style={{display: "grid", gap: "5px", alignContent: "center",justifyContent: "center", textAlign:"center",gridTemplateRows: "repeat(1, 140px)"}}><img src="/title.gif" style={{padding: "40px", transform: "scale(.3)"}}></img>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "5px", alignContent: "center", justifyContent: "center", padding: "90px", paddingBottom:"50px", paddingTop:"100px", marginLeft: "100px",marginRight:"100px", background: "#25366994", maxWidth:"600px",borderRadius:"30px"}}>
        <Image
          src={tileMap[0][0] === 1 ? "tiktaktoe/x.png" : tileMap[0][0] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(0,0, currentPlayer)}
        />
        <Image
          src={tileMap[0][1] === 1 ? "tiktaktoe/x.png" : tileMap[0][1] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(0,1, currentPlayer)}
        />
        <Image
          src={tileMap[0][2] === 1 ? "tiktaktoe/x.png" : tileMap[0][2] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(0,2, currentPlayer)}
        />
        <Image
          src={tileMap[1][0] === 1 ? "tiktaktoe/x.png" : tileMap[1][0] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(1,0, currentPlayer)}
        />
          <Image
          src={tileMap[1][1] === 1 ? "tiktaktoe/x.png" : tileMap[1][1] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(1,1, currentPlayer)}
        />
          <Image
          src={tileMap[1][2] === 1 ? "tiktaktoe/x.png" : tileMap[1][2] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(1,2, currentPlayer)}
        />
          <Image
          src={tileMap[2][0] === 1 ? "tiktaktoe/x.png" : tileMap[2][0] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(2,0, currentPlayer)}
        />
          <Image
          src={tileMap[2][1] === 1 ? "tiktaktoe/x.png" : tileMap[2][1] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(2,1, currentPlayer)}
        />
          <Image
          src={tileMap[2][2] === 1 ? "tiktaktoe/x.png" : tileMap[2][2] === 2 ? "tiktaktoe/o.png" : "tiktaktoe/block.png"}
          alt="Tik-Tak-Toe Block"
          width={200}
          height={200}
          onClick={setTile(2,2, currentPlayer)}
        />
      </div>
      <div style={{marginLeft: "100px",marginRight:"100px",background: "#25366994", maxWidth:"600px",borderRadius:"20px"}}>
      <div style={{textAlign: "center", fontSize: "24px", fontWeight: "bold", color: "#fff", paddingTop:"10px"}}>
        {gameStatus === "won" && <div>Player {lastPlayer} Wins! </div>}
        {gameStatus === "draw" && <div>Draw !</div>}
        {gameStatus === "playing" && <div>{currentPlayer === 1 ? "Place a X" : "Place a O"}</div>}
      </div>

      <div style={{textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "#fff", paddingBottom: "10px",}}>
        X: {score.player1} // O: {score.player2}
      </div>
      </div>
      </div>
  );
}
