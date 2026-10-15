import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePhoto from '../assets/profile.webp';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let assetsReady = false;

    // Preload critical assets: Fonts & Hero image
    const preloadAssets = async () => {
      try {
        const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
        const imgPromise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = profilePhoto;
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });

        await Promise.all([fontPromise, imgPromise]);
      } catch {
        // Fallback gracefully
      } finally {
        assetsReady = true;
      }
    };

    preloadAssets();

    // Fast and subtle progress ticker (~750ms duration)
    const startTime = performance.now();
    const duration = 750;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      if (calculatedProgress >= 90 && !assetsReady && elapsed < 2000) {
        setProgress(90);
        return;
      }

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = originalOverflow;
          onComplete?.();
        }, 120);
      }
    }, 16);

    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setIsLoaded(true);
      document.body.style.overflow = originalOverflow;
      onComplete?.();
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {shouldRender && !isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center gap-3">
            {/* Subtle Name */}
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
              Mario Luna
            </span>

            {/* Ultra-thin Minimalist Progress Line */}
            <div className="w-28 sm:w-36 h-[2px] bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Tiny discreet counter */}
            <span className="text-[11px] font-mono text-zinc-600 tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
