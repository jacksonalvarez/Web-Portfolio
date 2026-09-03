"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden bg-signal px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-strong"
    >
      Print / save PDF
    </button>
  );
}
