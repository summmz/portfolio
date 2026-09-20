"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "boot sumit.exe .................. OK",
  "mount /dev/hustle ............... OK",
  "load react, node, sql modules ... OK",
  "starting portfolio shell ........ OK",
];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((c) => {
        if (c >= lines.length) {
          window.clearInterval(interval);
          return c;
        }
        return c + 1;
      });
      if (count >= lines.length) return;
    }, 300);
    const timeout = window.setTimeout(
      () => setGone(true),
      (lines.length + 2) * 300
    );
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [count]);

  return (
    <AnimatePresence>
      {!gone && count <= lines.length && (
        <motion.div
          exit={{ opacity: 0, y: -20, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="w-[min(90vw,28rem)] font-mono text-xs sm:text-sm">
            <p className="mb-3 flex items-center gap-2">
              <span className="gradient-text font-bold text-lg">sumit.dev</span>
              <span className="ml-auto text-dim">v2.0</span>
            </p>
            {lines.slice(0, count).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="py-1 text-dim"
              >
                <span className="text-lime">[ok]</span> {line}
              </motion.p>
            ))}
            <p className="mt-4 flex h-1 w-full overflow-hidden rounded-full bg-elevated">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: (lines.length + 2) * 0.3, ease: "linear" }}
                className="bg-gradient-to-r from-cyan via-violet to-fuchsia"
              />
            </p>
            <p className="mt-3 flex items-center gap-2 text-dim">
              <span className="h-3 w-2 animate-pulse bg-cyan/80" />
              press <kbd className="rounded border border-edge px-1 text-xs">⌘K</kbd> for commands
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}