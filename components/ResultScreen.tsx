"use client";

import { useMemo } from "react";
import type { Gender } from "@/app/page";
import FieryMinchoTitle from "@/components/FieryMinchoTitle";
import {
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_ICON_SRC,
  INSTAGRAM_PROFILE_URL,
} from "@/lib/constants";

type Props = {
  gender: Gender | null;
  onRematch: () => void;
  onReset: () => void;
};

const GENDER_LABEL: Record<Gender, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
};

const CONFETTI_COLORS = [
  "#FFD700",
  "#FF6B00",
  "#FFFFFF",
  "#FFB800",
  "#C41E8E",
  "#FFED4E",
  "#7B2CBF",
];

// 紙吹雪 (画面全体に散る)
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2.5 + Math.random() * 2.5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            top: "-10vh",
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// 火の粉 (カード内で下から舞い上がる)
function Embers({ count = 24 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        dx: (Math.random() - 0.5) * 80,
        dur: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 3,
        size: 3 + Math.random() * 5,
      })),
    [count]
  );

  return (
    <>
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              "--ember-dx": `${e.dx}px`,
              "--ember-dur": `${e.dur}s`,
              "--ember-delay": `${e.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

// 斜めの光線 (複数本)
function LightBeams() {
  const beams = [
    { top: "18%", angle: 18, delay: "0s" },
    { top: "42%", angle: -12, delay: "0.6s" },
    { top: "68%", angle: 8, delay: "1.1s" },
    { top: "86%", angle: -22, delay: "1.6s" },
  ];
  return (
    <>
      {beams.map((b, i) => (
        <span
          key={i}
          className="light-beam"
          style={{
            top: b.top,
            transform: `rotate(${b.angle}deg)`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </>
  );
}

export default function ResultScreen({ gender, onRematch, onReset }: Props) {
  return (
    <>
      <Confetti />

      <section className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-gold shadow-jackpot animate-neon-border">
        {/* 多層背景 (順に重ねる) */}
        <div className="absolute inset-0 explosion-bg" aria-hidden />
        <div className="burst-core" aria-hidden />
        <div className="absolute inset-0 burst-lines animate-radial-burst" aria-hidden />
        <LightBeams />

        {/* 火の粉はカード下部から舞い上がる */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 overflow-hidden">
          <Embers count={28} />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* 上部バッジ */}
          <div className="mb-3 text-center">
            <p className="inline-block rounded-full border border-gold/60 bg-black/50 px-4 py-1 text-[10px] font-black tracking-[0.35em] text-gold backdrop-blur-sm">
              ★ 777 FEVER ★
            </p>
          </div>

          {/* 大当たり タイトル (極太明朝 炎グラデ + ゴールド影) */}
          <h2 className="animate-jackpot-bounce my-4 text-center text-6xl leading-none sm:text-7xl">
            <FieryMinchoTitle text="激アツ！！" offset={6} />
          </h2>

          {/* サブタイトル (明朝で統一感) */}
          <p className="mb-4 text-center">
            <FieryMinchoTitle
              text="マッチング成立！！"
              offset={5}
              className="text-3xl sm:text-4xl"
            />
          </p>

          {gender && (
            <p className="mb-4 text-center text-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              あなた（{GENDER_LABEL[gender]}）にぴったりのお相手
            </p>
          )}

          {/* 777 リール (小さめ) */}
          <div className="mb-5 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-12 w-10 items-center justify-center rounded-md border-2 border-gold bg-gradient-to-b from-pachiRed via-pachiRed-dark to-pachiBlack shadow-neon sm:h-14 sm:w-12"
              >
                <span className="text-gold-metallic text-2xl font-black sm:text-3xl">
                  7
                </span>
              </div>
            ))}
          </div>

          {/* お相手カード */}
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${INSTAGRAM_HANDLE} の Instagram プロフィールを開く`}
            className="mb-4 block rounded-xl border-2 border-gold bg-black/65 p-4 text-center backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-black/80"
          >
            <p className="mb-2 text-[10px] font-bold tracking-widest text-gold">
              ★ お相手 ★
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={INSTAGRAM_ICON_SRC}
              alt={`${INSTAGRAM_HANDLE} のアイコン`}
              width={88}
              height={88}
              className="mx-auto mb-2 h-22 w-22 rounded-full border-4 border-gold object-cover shadow-neon animate-gold-pulse"
              style={{ width: "88px", height: "88px" }}
            />
            <p className="text-gold-metallic text-lg font-black underline-offset-4 hover:underline">
              {INSTAGRAM_HANDLE}
            </p>
            <p className="mt-1 text-[10px] text-white/80">学習院大学の在学生</p>
          </a>

          {/* DM ボタン */}
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram で DM を送る"
            className="mb-3 block w-full overflow-hidden rounded-xl border-2 border-gold bg-gradient-to-b from-pachiRed-light via-pachiRed to-pachiRed-dark py-4 text-center text-lg font-black tracking-wider text-white shadow-neon transition-all hover:scale-[1.03]"
          >
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              💌 Instagram で DM を送る 💌
            </span>
          </a>

          {/* 下部操作 */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onRematch}
              className="rounded-xl border-2 border-gold bg-black/70 py-3 text-xs font-bold text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-pachiBlack"
            >
              もう一度マッチング
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-xl border-2 border-white/40 bg-black/70 py-3 text-xs font-bold text-white/80 backdrop-blur-sm transition-colors hover:border-white hover:text-white"
            >
              最初からやり直す
            </button>
          </div>

          <p className="mt-5 text-center text-[10px] leading-relaxed text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            このサイトはジョークで、一切の情報は送信されていません。
          </p>
        </div>
      </section>
    </>
  );
}
