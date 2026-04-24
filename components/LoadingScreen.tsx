"use client";

import { useEffect, useState } from "react";

// レーダー上に出現する人影ピンの位置 (%)
const PINS = [
  { top: 22, left: 30, color: "#FFD700", delay: 0.2 },
  { top: 35, left: 72, color: "#F4C2C2", delay: 0.6 },
  { top: 60, left: 20, color: "#E60012", delay: 1.0 },
  { top: 70, left: 62, color: "#FFB800", delay: 1.4 },
  { top: 48, left: 50, color: "#FF3355", delay: 1.8 },
  { top: 30, left: 55, color: "#FFED4E", delay: 2.2 },
  { top: 78, left: 40, color: "#F4C2C2", delay: 2.6 },
];

const STATUS_TEXTS = [
  "近くにいる人を探しています...",
  "候補を検出しました",
  "相性を解析中...",
  "運命の相手を発見！",
];

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1800),
      setTimeout(() => setPhase(2), 3800),
      setTimeout(() => setPhase(3), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-gold bg-pachiBlack p-8 text-center shadow-neon animate-neon-border"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 radial-rays opacity-25" />

      <p className="relative z-10 mb-2 text-xs font-black tracking-[0.3em] text-gold">
        ◉ SCANNING ◉
      </p>
      <p className="text-gold-metallic animate-gold-pulse relative z-10 mb-6 text-xl font-black sm:text-2xl">
        情報を解析しています
      </p>

      {/* レーダー本体 (円形クリップでスイープや波動の漏れを防止) */}
      <div className="relative z-10 mx-auto mb-6 aspect-square w-full max-w-[320px] overflow-hidden rounded-full">
        {/* 背景同心円 */}
        <div className="pointer-events-none absolute inset-0">
          {[0.35, 0.6, 0.85].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-gold/40"
              style={{
                top: "50%",
                left: "50%",
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <div
            className="absolute rounded-full border-4 border-gold shadow-neon"
            style={{ inset: 0 }}
          />
        </div>


        {/* 回転スイープ (扇形グラデーション) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 330deg, rgba(255,215,0,0.08) 345deg, rgba(255,215,0,0.28) 358deg, rgba(255,215,0,0.0) 360deg)",
            animation: "radar-sweep 2s linear infinite",
            maskImage:
              "radial-gradient(circle, black 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.3) 80%, transparent 96%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.3) 80%, transparent 96%)",
          }}
        />

        {/* 十字ガイド */}
        <div
          className="pointer-events-none absolute top-1/2 left-0 right-0 h-px bg-gold/30"
          style={{ transform: "translateY(-50%)" }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-gold/30"
          style={{ transform: "translateX(-50%)" }}
        />

        {/* 人影ピン */}
        {PINS.map((pin, i) => (
          <div
            key={i}
            className="absolute h-4 w-4 rounded-full"
            style={{
              top: `${pin.top}%`,
              left: `${pin.left}%`,
              backgroundColor: pin.color,
              boxShadow: `0 0 12px ${pin.color}, 0 0 24px ${pin.color}`,
              animation: `pin-blink 3.2s ease-in-out ${pin.delay}s infinite`,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        ))}

        {/* 中心のあなた */}
        <div
          className="absolute h-5 w-5 rounded-full bg-gold"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "center-beat 1s ease-in-out infinite",
          }}
          aria-hidden
        />
      </div>

      <p className="relative z-10 text-sm font-black text-gold-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {STATUS_TEXTS[phase]}
      </p>
    </section>
  );
}
