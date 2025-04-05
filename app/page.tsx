"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import BottomBar from "./components/bottom-bar";
import Header from "./components/header";
import { useEffect } from "react";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  // Initialize frame when component mounts
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen sm:min-h-[820px] font-sans bg-[#E5E5E5] text-black items-center snake-dark relative">
      <div className="w-screen max-w-[520px]">
        <Header />
        <main className="font-serif flex-1">
          <BottomBar />
        </main>
      </div>
    </div>
  );
}
