"use client";

import { useState } from "react";
import type { Gender } from "@/app/page";
import FieryMinchoTitle from "@/components/FieryMinchoTitle";
import { INSTAGRAM_HANDLE, UNIVERSITY_EN } from "@/lib/constants";

type Props = {
  onMatch: (gender: Gender) => void;
};

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "その他" },
];

// マーキーライト (外枠をぐるりと囲む点滅ライト)
function MarqueeLights() {
  const count = 24;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const colors = ["#FFD700", "#E60012", "#FFFFFF", "#FFB800"];
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full animate-marquee-lights"
            style={{
              color,
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-170px)`,
              animationDelay: `${(i * 0.05).toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function StartScreen({ onMatch }: Props) {
  const [selected, setSelected] = useState<Gender | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    onMatch(selected);
  };

  return (
    <section className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-gold bg-pachiBlack p-8 font-gokubuto shadow-neon animate-neon-border">
      <MarqueeLights />

      <header className="relative z-10 mb-6 text-center">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-pachiRed-light">
          ★ {UNIVERSITY_EN} ★
        </p>
        <h1 className="leading-tight">
          <span className="block text-4xl sm:text-5xl">
            <FieryMinchoTitle text="学習院大生特化" offset={5} />
          </span>
          <span className="text-gold-metallic mt-2 block text-2xl font-black tracking-wider animate-gold-pulse sm:text-3xl">
            マッチングアプリ
          </span>
        </h1>
        <div className="mx-auto mt-3 inline-block rounded-full bg-pachiRed px-4 py-1 text-xs font-black text-white shadow-[0_0_15px_rgba(230,0,18,0.8)]">
          🎰 FEVER 🎰
        </div>
        <p className="mt-4 text-sm font-black text-gold-light">
          恋人探しでも、友達探しにも。
        </p>
        <p className="mt-2 text-xs font-bold leading-relaxed text-white/80">
          あなたの性別だけ。それ以外の情報は一切使わない、
          <br />
          革新的で安心安全なマッチング体験。
        </p>
      </header>

      <div className="relative z-10 mb-6">
        <p className="mb-3 text-center text-xs font-black tracking-widest text-gold">
          ▼ あなたの性別を教えてください ▼
        </p>
        <div className="grid grid-cols-3 gap-2">
          {GENDER_OPTIONS.map((option) => {
            const isActive = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-label={`性別を${option.label}に設定`}
                aria-pressed={isActive}
                onClick={() => setSelected(option.value)}
                className={`rounded-xl border-2 py-3 font-gokubuto text-lg font-black transition-all ${
                  isActive
                    ? "border-gold bg-gradient-to-b from-gold-light to-gold-dark text-pachiBlack shadow-neon"
                    : "border-white/30 bg-white/5 text-white hover:border-gold hover:bg-white/10 hover:text-gold-light"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="マッチングを開始する"
        disabled={!selected}
        onClick={handleSubmit}
        className="relative z-10 block w-full overflow-hidden rounded-xl border-2 border-gold bg-gradient-to-b from-pachiRed-light via-pachiRed to-pachiRed-dark py-5 font-gokubuto text-xl font-black tracking-wider text-white shadow-neon transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:hover:scale-100"
      >
        <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          マッチングする
        </span>
      </button>

      <p className="relative z-10 mt-5 text-center text-[10px] font-bold leading-relaxed text-white/60">
        このサイトはジョークで、一切の情報は送信されていません。
        <br />
        制作者（
        <span className="font-black text-gold">{INSTAGRAM_HANDLE}</span>
        ）としかマッチしないようになっています。
      </p>
    </section>
  );
}
