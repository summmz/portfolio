"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Payload = { message: string };

export function CopyToast() {
  const [toast, setToast] = useState<Payload | null>(null);

  useEffect(() => {
    const onCopy = (e: CustomEvent<Payload>) => setToast(e.detail);
    const onHide = () => setToast(null);
    window.addEventListener("app:copy", onCopy as EventListener);
    window.addEventListener("app:toast-hide", onHide);
    return () => {
      window.removeEventListener("app:copy", onCopy as EventListener);
      window.removeEventListener("app:toast-hide", onHide);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-[96] -translate-x-1/2"
          role="status"
        >
          <span className="flex items-center gap-2 rounded-full border border-lime/40 bg-surface/95 px-5 py-2.5 font-mono text-sm text-lime shadow-[0_0_30px_rgba(163,230,53,0.25)]">
            <CheckCircle2 className="h-4 w-4" />
            {toast.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}