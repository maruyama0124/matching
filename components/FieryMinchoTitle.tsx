type Props = {
  text: string;
  className?: string;
  offset?: number;
};

// 極太明朝で赤オレンジ炎グラデ + ゴールド影レイヤーの 2 段重ねタイトル
export default function FieryMinchoTitle({
  text,
  className = "",
  offset = 6,
}: Props) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* 背面 ゴールド影レイヤー (X = Y で 45° 一定) */}
      <span
        aria-hidden
        className="text-mincho-gold-back absolute left-0 top-0 select-none"
        style={{ transform: `translate(${offset}px, ${offset}px)` }}
      >
        {text}
      </span>
      {/* 前面 炎グラデレイヤー */}
      <span className="text-fire-mincho relative block">{text}</span>
    </span>
  );
}
