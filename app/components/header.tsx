"use client";

import { useAccount } from "wagmi";
import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Check from "../svg/Check";

// const SCHEMA_UID =
//   "0x7889a09fb295b0a0c63a3d7903c4f00f7896cca4fa64d2c1313f8547390b7d39";

export default function Header() {
  const { address } = useAccount();
  const { context } = useMiniKit();
  const farcasterUser = context?.user;
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame, setFrameAdded]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          type="button"
          onClick={handleAddFrame}
          className="cursor-pointer bg-transparent font-semibold text-sm"
        >
          + SAVE FRAME
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-semibold animate-fade-out">
          <Check />
          <span>SAVED</span>
        </div>
      );
    }

    return null;
  }, [context, handleAddFrame, frameAdded]);

  return (
    <header className="mr-2 mt-1 flex justify-between items-center">
      <div className="justify-start pl-1">
        {address && farcasterUser ? (
          <div className="flex items-center space-x-2">
            {farcasterUser.pfpUrl && (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={farcasterUser.pfpUrl}
                  alt={farcasterUser.username ?? "Avatar"}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-semibold text-sm">
              {farcasterUser.username}
            </span>
          </div>
        ) : (
          <div className="pl-2 pt-1 text-gray-500 text-sm font-semibold">
            NOT CONNECTED
          </div>
        )}
      </div>
      <div className="pr-1 justify-end">{saveFrameButton}</div>
    </header>
  );
}
