export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 w-full max-w-[480px] text-center text-[10px] leading-relaxed text-white/50">
      <p>
        Inspired by{" "}
        <a
          href="https://itf-matching.colk-tech.workers.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gold"
        >
          筑波大生特化マッチングアプリ
        </a>{" "}
        (
        <a
          href="https://x.com/Colk_"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gold"
        >
          @Colk_
        </a>
        )
      </p>
      <p className="mt-1">Licensed under MIT · © {year}</p>
    </footer>
  );
}
