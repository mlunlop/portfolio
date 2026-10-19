import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor, type CursorType } from "./CursorProvider";
import { cn } from "@/lib/utils";
import { cursorConfig } from "./cursorConfig";

// Helper to extract cursor styles from an element
function getCursorStyle(element: HTMLElement, type: CursorType) {
  const style = window.getComputedStyle(element);

  let radius: string = cursorConfig.block.defaultRadius;
  const child = element.firstElementChild as HTMLElement | null;
  if (child) {
    const childStyle = window.getComputedStyle(child);
    if (childStyle.borderRadius && childStyle.borderRadius !== "0px") {
      radius = childStyle.borderRadius;
    } else if (style.borderRadius && style.borderRadius !== "0px") {
      radius = style.borderRadius;
    }
  } else if (style.borderRadius && style.borderRadius !== "0px") {
    radius = style.borderRadius;
  }

  let lineHeight: number | undefined;
  if (type === "text") {
    const targetEl = element.firstElementChild || element;
    const targetStyle = window.getComputedStyle(targetEl);
    const lhStr = targetStyle.lineHeight;

    if (lhStr === "normal") {
      lineHeight = parseFloat(targetStyle.fontSize) * 1.25;
    } else if (lhStr.endsWith("px")) {
      lineHeight = parseFloat(lhStr);
    } else {
      lineHeight = parseFloat(lhStr) * parseFloat(targetStyle.fontSize);
    }
  }

  return { radius, lineHeight };
}

export function Cursor() {
  const { config, setConfig, updateCursor } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isHoveringWindow, setIsHoveringWindow] = useState(true);

  // Check if viewport is a mobile phone (< 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  // Track active target state locally to avoid context lag for physics
  const activeTargetRef = useRef<{
    element: HTMLElement;
    baseRect: DOMRect;
    lastRect: DOMRect;
    transform: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        document.documentElement.classList.remove("custom-cursor-active");
        if (activeTargetRef.current) {
          activeTargetRef.current.element.style.transform = "";
          activeTargetRef.current.element.style.transition = "";
          activeTargetRef.current = null;
        }
      }
    };

    mql.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      mql.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Cursor rendering target
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);

  // Spring physics
  const springConfig = config.stickiness
    ? cursorConfig.animation.sticky
    : cursorConfig.animation.position;

  const cursorX = useSpring(targetX, springConfig);
  const cursorY = useSpring(targetY, springConfig);
  const lightingX = useSpring(0, cursorConfig.animation.lighting);
  const lightingY = useSpring(0, cursorConfig.animation.lighting);

  const scaleMotion = useMotionValue(1);
  const scale = useSpring(scaleMotion, cursorConfig.animation.clickScale);

  // Main Event Loop
  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.remove("custom-cursor-active");
      if (activeTargetRef.current) {
        activeTargetRef.current.element.style.transform = "";
        activeTargetRef.current.element.style.transition = "";
        activeTargetRef.current = null;
      }
      return;
    }

    let mousePos = { x: -100, y: -100 };
    let rafId: number;
    let initialized = false;
    let isTouchActive = false;
    let touchEndTimer: number;

    const handleTouchStart = () => {
      isTouchActive = true;
    };

    const handleTouchEnd = () => {
      clearTimeout(touchEndTimer);
      touchEndTimer = window.setTimeout(() => {
        isTouchActive = false;
      }, 500);
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      // Discard touch events completely (let native mobile touch work cleanly)
      if (isTouchActive) {
        return;
      }
      if ("pointerType" in e && e.pointerType === "touch") {
        return;
      }

      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!initialized) {
        initialized = true;
        setHasMoved(true);
        targetX.jump(e.clientX);
        targetY.jump(e.clientY);
        cursorX.jump(e.clientX);
        cursorY.jump(e.clientY);
        document.documentElement.classList.add("custom-cursor-active");
      }
    };

    const handleWindowLeave = () => {
      setIsHoveringWindow(false);
    };

    const handleWindowEnter = () => {
      setIsHoveringWindow(true);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const updateLoop = () => {
      let targetEl: HTMLElement | null = null;
      let targetType: CursorType = "default";
      let targetMagnetic = true;
      let targetStickiness = false;

      if (mousePos.x >= 0 && mousePos.y >= 0) {
        const el = document.elementFromPoint(mousePos.x, mousePos.y);
        // Look for explicit data-cursor-target, buttons, links, or skill items
        const hit = el?.closest(
          '[data-cursor-target], button, a, [role="button"], [role="option"], .animated-list__item, input[type="submit"], input[type="button"]'
        ) as HTMLElement | null;

        if (hit) {
          const rect = hit.getBoundingClientRect();
          // Filter out giant layout wrappers (like huge full-width cards or containers)
          const isReasonableSize = rect.width <= 500 && rect.height <= 140;
          const hasExplicitTarget = hit.hasAttribute("data-cursor-target");

          if (hasExplicitTarget || isReasonableSize) {
            targetEl = hit;
            const explicitType = hit.getAttribute("data-cursor-type") as CursorType;
            if (explicitType) {
              targetType = explicitType;
            } else if (hit.tagName === "INPUT" && hit.getAttribute("type") === "text") {
              targetType = "text";
            } else {
              targetType = "block";
            }

            const magAttr = hit.getAttribute("data-cursor-magnetic");
            targetMagnetic = magAttr !== "false";
            const stickAttr = hit.getAttribute("data-cursor-stickiness");
            targetStickiness = stickAttr === "true";
          }
        }
      }

      // Handle Target Change
      const currentActive = activeTargetRef.current;

      if (targetEl !== (currentActive?.element || null)) {
        // Cleanup old target transform
        if (currentActive) {
          currentActive.element.style.transition =
            "transform 0.3s cubic-bezier(0.58, 0.09, 0.46, 1.46)";
          currentActive.element.style.transform = "translate3d(0,0,0)";
        }

        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const style = getCursorStyle(targetEl, targetType);

          if (targetMagnetic) {
            targetEl.style.transition = "none";
          }

          activeTargetRef.current = {
            element: targetEl,
            baseRect: rect,
            lastRect: rect,
            transform: { x: 0, y: 0 },
          };

          setConfig({
            type: targetType,
            rect,
            radius: style.radius,
            lineHeight: style.lineHeight,
            activeElement: targetEl,
            stickiness: targetStickiness,
          });
        } else {
          activeTargetRef.current = null;
          setConfig({
            type: "default",
            rect: null,
            activeElement: null,
            stickiness: false,
          });
        }
      }

      // Process Active Target Physics
      if (activeTargetRef.current && targetEl) {
        const { element, transform, lastRect } = activeTargetRef.current;
        const visualRect = element.getBoundingClientRect();

        if (
          Math.abs(visualRect.width - lastRect.width) > 1 ||
          Math.abs(visualRect.height - lastRect.height) > 1
        ) {
          activeTargetRef.current.lastRect = visualRect;
          updateCursor({ rect: visualRect });
        }

        const baseRect = {
          left: visualRect.left - transform.x,
          top: visualRect.top - transform.y,
          width: visualRect.width,
          height: visualRect.height,
        };
        activeTargetRef.current.baseRect = baseRect as DOMRect;

        if (targetType === "block") {
          const centerX = baseRect.left + baseRect.width / 2;
          const centerY = baseRect.top + baseRect.height / 2;

          const distRawX = mousePos.x - centerX;
          const distRawY = mousePos.y - centerY;

          const strength = cursorConfig.magnetic.strength;
          let magX = distRawX * strength;
          let magY = distRawY * strength;

          const maxX = baseRect.width * cursorConfig.magnetic.limitMultiplier;
          const maxY = baseRect.height * cursorConfig.magnetic.limitMultiplier;

          magX = Math.max(-maxX, Math.min(maxX, magX));
          magY = Math.max(-maxY, Math.min(maxY, magY));

          let offX = 0;
          let offY = 0;

          if (targetMagnetic) {
            offX = magX;
            offY = magY;
            element.style.transform = `translate3d(${offX}px, ${offY}px, 0)`;
            activeTargetRef.current.transform = { x: offX, y: offY };
          }

          targetX.set(centerX + offX);
          targetY.set(centerY + offY);

          lightingX.set(magX * cursorConfig.magnetic.lightingMultiplier);
          lightingY.set(magY * cursorConfig.magnetic.lightingMultiplier);
        } else {
          targetX.set(mousePos.x);
          targetY.set(mousePos.y);
        }
      } else {
        if (mousePos.x >= 0 && mousePos.y >= 0) {
          targetX.set(mousePos.x);
          targetY.set(mousePos.y);
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    const handleScroll = () => {
      // Keep last known mousePos, physics update loop will handle hit testing
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);
    document.documentElement.addEventListener("mouseenter", handleWindowEnter);

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      clearTimeout(touchEndTimer);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
      document.documentElement.removeEventListener("mouseenter", handleWindowEnter);
      document.documentElement.classList.remove("custom-cursor-active");
      if (activeTargetRef.current) {
        activeTargetRef.current.element.style.transform = "";
        activeTargetRef.current.element.style.transition = "";
        activeTargetRef.current = null;
      }
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, mouseX, mouseY, targetX, targetY, cursorX, cursorY, lightingX, lightingY, setConfig, updateCursor]);

  // Derived state for rendering
  const isBlock = config.type === "block" && config.activeElement;
  const isText = config.type === "text";

  // Calculate target size
  let targetWidth: number;
  let targetHeight: number;
  let targetRadius: string;

  if (isBlock && config.rect && config.activeElement) {
    const minDimension = Math.min(config.rect.width, config.rect.height);
    const padding = Math.max(
      cursorConfig.block.paddingMin,
      minDimension * cursorConfig.block.paddingPercent
    );
    targetWidth = config.rect.width + padding;
    targetHeight = config.rect.height + padding;
    targetRadius = config.radius || cursorConfig.block.defaultRadius;
  } else if (isText) {
    targetWidth = cursorConfig.text.width;
    targetHeight = config.lineHeight || cursorConfig.text.defaultHeight;
    targetRadius = cursorConfig.text.radius;
  } else {
    targetWidth = cursorConfig.default.size;
    targetHeight = cursorConfig.default.size;
    targetRadius = cursorConfig.default.radius;
  }

  // Update scale based on click state
  useEffect(() => {
    let clickScale = 1;
    if (isMouseDown) {
      if (isBlock && config.rect) {
        const minDimension = Math.min(config.rect.width, config.rect.height);
        const paddingNormal = Math.max(
          cursorConfig.block.paddingMin,
          minDimension * cursorConfig.block.paddingPercent
        );
        const paddingClicked = Math.max(
          cursorConfig.block.paddingClickedMin,
          minDimension * cursorConfig.block.paddingClickedPercent
        );
        const widthScale =
          (config.rect.width + paddingClicked) / (config.rect.width + paddingNormal);
        const heightScale =
          (config.rect.height + paddingClicked) / (config.rect.height + paddingNormal);
        clickScale = (widthScale + heightScale) / 2;
      } else {
        clickScale = cursorConfig.click.defaultScale;
      }
    }
    scaleMotion.set(clickScale);
  }, [isMouseDown, isBlock, config.rect, scaleMotion]);

  if (isMobile) {
    return null;
  }

  const isVisible = hasMoved && isHoveringWindow;

  return (
    <motion.div
      ref={cursorRef}
      initial={false}
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center overflow-hidden transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0",
        isBlock
          ? "border border-white/20 shadow-md shadow-black/20 ring-1 ring-white/10"
          : isText
          ? "bg-orange-500 shadow-sm shadow-orange-500/50"
          : "border border-white/40 shadow-md shadow-black/40 backdrop-blur-[2px]"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        scale: scale,
        translate: "-50% -50%",
        width: targetWidth,
        height: targetHeight,
        borderRadius: targetRadius,
        backgroundColor: isBlock
          ? cursorConfig.colors.blockBackground
          : isText
          ? cursorConfig.colors.textBackground
          : cursorConfig.colors.defaultBackground,
      }}
      animate={{
        width: targetWidth,
        height: targetHeight,
        borderRadius: targetRadius,
        backgroundColor: isBlock
          ? cursorConfig.colors.blockBackground
          : isText
          ? cursorConfig.colors.textBackground
          : cursorConfig.colors.defaultBackground,
      }}
      transition={{
        width: cursorConfig.animation.sizeShape,
        height: cursorConfig.animation.sizeShape,
        borderRadius: cursorConfig.animation.sizeShape,
        backgroundColor: { duration: 0.15, ease: "easeInOut" },
      }}
    >
      <AnimatePresence>
        {isBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none inset-0 mix-blend-plus-lighter"
            style={{
              width: "300%",
              height: "300%",
              background: cursorConfig.colors.lightingGradient,
              x: lightingX,
              y: lightingY,
              left: "-100%",
              top: "-100%",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
