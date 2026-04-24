"use client";

import { useEffect, useState } from "react";
import FieryMinchoTitle from "@/components/FieryMinchoTitle";

const SYMBOLS = ["7", "★", "♥", "◆", "♣", "♠", "☆", "✿", "♪", "◎"];
const LOCK_TIMES_MS = [900, 1600, 2500]; // 3 つのリールが順に 7 で固定

function Reel({ locked }: { locked: boolean }) {
  const [symbol, setSymbol] = useState<string>("?");

  useEffect(() => {
    if (locked) {
      setSymbol("7");
      return;
    }
    const id = setInterval(() => {
      setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }, 70);
    return () => clearInterval(id);
  }, [locked]);

  return (
    <div
      className={`relative flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border-4 sm:h-28 sm:w-24 ${
        locked
          ? "border-gold bg-gradient-to-b from-pachiRed via-pachiRed-dark to-pachiBlack shadow-neon"
          : "border-gray-500 bg-pachiBlack"
      }`}
    >
      <span
        key={symbol}
        className={`text-5xl font-black sm:text-6xl ${
          locked
            ? "text-gold-metallic animate-jackpot-bounce"
            : "text-white/80"
        }`}
      >
        {symbol}
      </span>
      {locked && (
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-gold" />
      )}
    </div>
  );
}

export default function LoadingScreen() {
  const [lockedCount, setLockedCount] = useState(0);

  useEffect(() => {
    const timers = LOCK_TIMES_MS.map((ms, idx) =>
      setTimeout(() => setLockedCount(idx + 1), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const showReach = lockedCount === 2;
  const showJackpot = lockedCount === 3;

  return (
    <section
      className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-gold bg-pachiBlack p-8 text-center shadow-neon ${
        showJackpot ? "animate-shake" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 radial-rays opacity-30" />

      <p className="relative z-10 mb-2 text-xs font-bold tracking-[0.3em] text-gold">
        ANALYZING...
      </p>
      <p className="relative z-10 mb-6 text-lg font-black text-gold-metallic animate-gold-pulse">
        情報を解析しています
      </p>

      <div className="relative z-10 mb-6 flex justify-center gap-2 sm:gap-3">
        {[0, 1, 2].map((i) => (
          <Reel key={i} locked={i < lockedCount} />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[3rem] items-center justify-center">
        {showReach && (
          <span className="animate-jackpot-bounce text-3xl sm:text-4xl">
            <FieryMinchoTitle text="リーチ!!" offset={4} />
          </span>
        )}
        {showJackpot && (
          <span className="animate-jackpot-bounce text-4xl sm:text-5xl">
            <FieryMinchoTitle text="大当たり!!!" offset={5} />
          </span>
        )}
        {!showReach && !showJackpot && (
          <p className="text-xs text-white/60">最適なお相手を検索中...</p>
        )}
      </div>
    </section>
  );
}
