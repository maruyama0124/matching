"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import StartScreen from "@/components/StartScreen";

type Screen = "start" | "loading" | "result";
export type Gender = "male" | "female" | "other";

const LOADING_DURATION_MS = 7000;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gender, setGender] = useState<Gender | null>(null);

  useEffect(() => {
    if (screen !== "loading") return;
    const timer = setTimeout(() => setScreen("result"), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [screen]);

  const handleMatch = (selected: Gender) => {
    setGender(selected);
    setScreen("loading");
  };

  const handleRematch = () => {
    setScreen("loading");
  };

  const handleReset = () => {
    setGender(null);
    setScreen("start");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-8 sm:py-12">
      <div className="flex w-full flex-1 items-center justify-center">
        {screen === "start" && <StartScreen onMatch={handleMatch} />}
        {screen === "loading" && <LoadingScreen />}
        {screen === "result" && (
          <ResultScreen
            gender={gender}
            onRematch={handleRematch}
            onReset={handleReset}
          />
        )}
      </div>
      <Footer />
    </main>
  );
}
