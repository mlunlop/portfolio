'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './AnimatedList.css';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const THEMES = {
  dark: {
    '--al-frame': 'rgba(24, 24, 27, 0.72)',
    '--al-frame-edge': 'rgba(255, 255, 255, 0.08)',
    '--al-frame-highlight': 'rgba(255, 255, 255, 0.07)',
    '--al-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--al-tile': 'linear-gradient(180deg, #1c1c21 0%, #131316 100%)',
    '--al-tile-edge': 'rgba(255, 255, 255, 0.07)',
    '--al-tile-highlight': 'rgba(255, 255, 255, 0.1)',
    '--al-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
    '--al-well': 'rgba(255, 255, 255, 0.06)',
    '--al-ink': '#f4f4f5',
    '--al-muted': 'rgba(244, 244, 245, 0.55)',
    '--al-thumb': 'rgba(255, 255, 255, 0.18)',
    '--al-ring': '#f97316',
    '--al-ring-fill': 'rgba(249, 115, 22, 0.08)',
    '--al-hover': 'brightness(1.15)',
    '--al-press': 'brightness(0.85)',
    '--al-active': 'brightness(1.18)'
  },
  light: {
    '--al-frame': 'rgba(240, 240, 243, 0.8)',
    '--al-frame-edge': 'rgba(24, 24, 27, 0.07)',
    '--al-frame-highlight': 'rgba(255, 255, 255, 0.95)',
    '--al-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
    '--al-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)',
    '--al-tile-edge': 'rgba(24, 24, 27, 0.08)',
    '--al-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--al-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.25)',
    '--al-well': 'rgba(24, 24, 27, 0.05)',
    '--al-ink': '#27272a',
    '--al-muted': 'rgba(39, 39, 42, 0.55)',
    '--al-thumb': 'rgba(24, 24, 27, 0.16)',
    '--al-ring': '#f97316',
    '--al-ring-fill': 'rgba(249, 115, 22, 0.08)',
    '--al-hover': 'brightness(0.97)',
    '--al-press': 'brightness(0.92)',
    '--al-active': 'none'
  }
};

export interface AnimatedListItem {
  id?: string | number;
  title: string;
  description?: string;
  meta?: string;
  icon?: ReactNode;
  image?: string;
  color?: string;
}

const HIDDEN = {
  pop: { above: 'translate3d(0, -12px, 0) scale(0.8)', below: 'translate3d(0, 12px, 0) scale(0.8)' },
  slide: { above: 'translate3d(0, -28px, 0) scale(0.98)', below: 'translate3d(0, 28px, 0) scale(0.98)' },
  fade: { above: 'translate3d(0, -4px, 0)', below: 'translate3d(0, 4px, 0)' }
};

const SPRING =
  'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';

const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

const FADE_MASK = (() => {
  const steps = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
  const top = steps.map(t => `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(var(--al-fade-top) * ${t})`);
  const bottom = [...steps]
    .reverse()
    .map(t => `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(100% - var(--al-fade-bottom) * ${t})`);
  return `linear-gradient(to bottom, ${[...top, ...bottom].join(', ')})`;
})();

const size = (value?: string | number) => (typeof value === 'number' ? `${value}px` : value);

export interface AnimatedListProps {
  items?: (AnimatedListItem | string)[];
  onItemSelect?: (item: AnimatedListItem | string, index: number) => void;
  renderItem?: (item: AnimatedListItem | string, index: number, isSelected: boolean) => ReactNode;
  initialSelectedIndex?: number;
  selectOnHover?: boolean;
  enableArrowNavigation?: boolean;
  loop?: boolean;
  animation?: 'pop' | 'slide' | 'fade' | 'none';
  animateOnce?: boolean;
  stagger?: number;
  showGradients?: boolean;
  fadeSize?: number;
  displayScrollbar?: boolean;
  frame?: boolean;
  theme?: 'dark' | 'light';
  accentColor?: string;
  radius?: number;
  gap?: number;
  width?: string | number;
  maxHeight?: string | number;
  className?: string;
  itemClassName?: string;
  style?: CSSProperties;
}

const AnimatedList = ({
  items = [],
  onItemSelect,
  renderItem,
  initialSelectedIndex = -1,
  selectOnHover = true,
  enableArrowNavigation = true,
  loop = false,
  animation = 'pop',
  animateOnce = false,
  stagger = 0.04,
  showGradients = true,
  fadeSize = 48,
  displayScrollbar = true,
  frame = true,
  theme = 'dark',
  accentColor,
  radius = 16,
  gap = 8,
  width = '100%',
  maxHeight = 440,
  className = '',
  itemClassName = '',
  style
}: AnimatedListProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<{ place: (instant?: boolean) => void; syncRing: () => void; updateFades: () => void; sync: () => void } | null>(null);
  const keyboardRef = useRef(false);
  const navigatingRef = useRef(false);
  const [selected, setSelected] = useState(initialSelectedIndex);
  const baseId = useId();
  const settings = {
    items,
    onItemSelect,
    selected,
    selectOnHover,
    enableArrowNavigation,
    loop,
    animation,
    animateOnce,
    stagger,
    showGradients,
    fadeSize
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    const ring = ringRef.current;
    if (!root || !viewport || !track || !indicator || !ring) return undefined;

    let engaged = false;
    let entered = false;
    let pointer = [0, 0];
    let heights: number[] = [];
    let tops: number[] = [];
    let raf = 0;

    const measure = () => {
      const children = itemRefs.current.filter(Boolean) as HTMLElement[];
      heights = children.map(child => child.offsetHeight);
      tops = children.map(child => child.offsetTop);
    };

    const updateFades = () => {
      const { showGradients: show, fadeSize: fSize } = settingsRef.current;
      if (!show) {
        viewport.style.setProperty('--al-fade-top', '0px');
        viewport.style.setProperty('--al-fade-bottom', '0px');
        return;
      }
      const top = Math.min(viewport.scrollTop, fSize);
      const bottom = Math.min(viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop, fSize);
      viewport.style.setProperty('--al-fade-top', `${Math.max(0, top)}px`);
      viewport.style.setProperty('--al-fade-bottom', `${Math.max(0, bottom)}px`);
    };

    const place = (instant = false) => {
      const idx = settingsRef.current.selected;
      if (idx < 0 || idx >= tops.length) {
        indicator.style.opacity = '0';
        return;
      }
      const y = tops[idx];
      const h = heights[idx];
      indicator.style.opacity = '1';
      indicator.style.height = `${h}px`;

      const currentItem = settingsRef.current.items[idx];
      const itemColor =
        typeof currentItem === 'object' && currentItem !== null && 'color' in currentItem && currentItem.color
          ? (currentItem.color as string)
          : null;
      if (itemColor) {
        ring.style.setProperty('--al-ring', itemColor);
        ring.style.setProperty('--al-ring-fill', `color-mix(in srgb, ${itemColor} 10%, transparent)`);
      } else {
        ring.style.removeProperty('--al-ring');
        ring.style.removeProperty('--al-ring-fill');
      }

      if (instant) {
        indicator.style.transition = 'none';
        indicator.style.transform = `translate3d(0, ${y}px, 0)`;
      } else {
        indicator.style.transition = `transform 0.28s ${SPRING}, height 0.24s ease`;
        indicator.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const syncRing = () => {
      ring.style.opacity = '1';
    };

    const reveal = (staggered = false) => {
      const { animation: anim, stagger: sStagger } = settingsRef.current;
      if (anim === 'none') return;
      const vTop = viewport.scrollTop;
      const vBottom = vTop + viewport.clientHeight;
      const children = itemRefs.current.filter(Boolean) as HTMLElement[];
      children.forEach((child, index) => {
        const top = tops[index];
        const height = heights[index];
        const visible = top + height >= vTop && top <= vBottom;
        if (visible && child.dataset.state !== 'entered') {
          child.dataset.state = 'entered';
          const delay = staggered ? index * sStagger : 0;
          child.style.transition = `transform 0.45s ${SPRING} ${delay}s, opacity 0.35s ease ${delay}s`;
          child.style.transform = 'translate3d(0, 0, 0) scale(1)';
          child.style.opacity = '1';
        } else if (!visible && !settingsRef.current.animateOnce && child.dataset.state === 'entered') {
          child.dataset.state = 'idle';
          const above = top < vTop;
          const pose = HIDDEN[anim]?.[above ? 'above' : 'below'] || '';
          child.style.transition = 'none';
          child.style.transform = pose;
          child.style.opacity = '0';
        }
      });
    };

    const sync = () => {
      measure();
      place(true);
      updateFades();
      reveal(false);
    };

    const gate =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries, observer) => {
              if (!entries.some(entry => entry.isIntersecting)) return;
              observer.disconnect();
              if (entered) return;
              entered = true;
              measure();
              reveal(true);
            },
            { rootMargin: '0px 0px -10% 0px' }
          );

    if (!entered) {
      if (gate) gate.observe(root);
      else {
        entered = true;
        measure();
        reveal(true);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      place(true);
      updateFades();
      measure();
      reveal(false);
    });
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    const onScroll = () => {
      updateFades();
      reveal(false);
    };

    const onKey = (event: KeyboardEvent) => {
      const s = settingsRef.current;
      if (!s.enableArrowNavigation || event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const active = document.activeElement;
      const focused = active === viewport;
      const idle = !active || active === document.body || active === document.documentElement;
      if (!focused && !(engaged && idle)) return;
      const count = s.items.length;
      if (!count) return;
      const index = s.selected;
      let next: number | null = null;
      if (event.key === 'ArrowDown') next = index < 0 ? 0 : index + 1;
      else if (event.key === 'ArrowUp') next = index < 0 ? count - 1 : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = count - 1;
      else if ((event.key === 'Enter' || (focused && event.key === ' ')) && index >= 0 && index < count) {
        event.preventDefault();
        s.onItemSelect?.(s.items[index], index);
        return;
      }
      if (next === null) return;
      event.preventDefault();
      next = s.loop ? (next + count) % count : Math.min(count - 1, Math.max(0, next));
      keyboardRef.current = true;
      navigatingRef.current = true;
      setSelected(next);
    };

    const onPointerMove = (event: PointerEvent) => {
      const moved = event.clientX !== pointer[0] || event.clientY !== pointer[1];
      pointer = [event.clientX, event.clientY];
      if (!navigatingRef.current || !moved) return;
      navigatingRef.current = false;
      const item = event.target instanceof Element ? event.target.closest('[data-index]') : null;
      if (item && root.contains(item) && settingsRef.current.selectOnHover) setSelected(Number((item as HTMLElement).dataset.index));
    };

    const onEnter = () => {
      engaged = true;
    };
    const onLeave = () => {
      engaged = false;
      if (settingsRef.current.selectOnHover) {
        setSelected(-1);
      }
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointermove', onPointerMove);

    updateFades();
    place(true);
    syncRing();

    engineRef.current = { place, syncRing, updateFades, sync };

    return () => {
      cancelAnimationFrame(raf);
      gate?.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointermove', onPointerMove);
      engineRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  }, [items, animation]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.place(false);
    engine.syncRing();
    if (!keyboardRef.current) return;
    keyboardRef.current = false;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const item = itemRefs.current[selected];
    if (!viewport || !track || !item) return;
    const top = track.offsetTop + item.offsetTop;
    const bottom = top + item.offsetHeight;
    const room = Math.max(0, (viewport.clientHeight - item.offsetHeight) / 2);
    const margin = Math.min(showGradients ? Math.max(12, fadeSize) : 12, room);
    if (top < viewport.scrollTop + margin) {
      viewport.scrollTo({ top: Math.max(0, top - margin), behavior: 'smooth' });
    } else if (bottom > viewport.scrollTop + viewport.clientHeight - margin) {
      viewport.scrollTo({ top: bottom - viewport.clientHeight + margin, behavior: 'smooth' });
    }
  }, [selected, fadeSize, showGradients]);

  useEffect(() => {
    engineRef.current?.updateFades();
  }, [showGradients, fadeSize, maxHeight, gap]);

  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hover = (index: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (!navigatingRef.current) setSelected(index);
  };

  const leave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setSelected(-1);
    }, 50);
  };

  const choose = (item: AnimatedListItem | string, index: number) => {
    if (onItemSelect) {
      setSelected(index);
      onItemSelect(item, index);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`animated-list${frame ? ' animated-list--framed' : ''} ${className}`.trim()}
      data-animated={animation !== 'none' ? '' : undefined}
      style={{
        ...(THEMES[theme] ?? THEMES.dark),
        '--al-radius': `${Math.max(0, radius)}px`,
        '--al-gap': `${Math.max(0, gap)}px`,
        '--al-width': size(width),
        '--al-accent': accentColor || 'var(--al-ink)',
        ...(accentColor
          ? { '--al-ring': accentColor, '--al-ring-fill': `color-mix(in srgb, ${accentColor} 8%, transparent)` }
          : {}),
        ...style
      } as unknown as CSSProperties}
    >
      <div
        ref={viewportRef}
        className={`animated-list__viewport${displayScrollbar ? '' : ' animated-list__viewport--bare'}`}
        role="listbox"
        tabIndex={0}
        aria-activedescendant={selected >= 0 && selected < items.length ? `${baseId}-${selected}` : undefined}
        onPointerLeave={() => {
          if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
          if (selectOnHover) setSelected(-1);
        }}
        style={{
          maxHeight: maxHeight && maxHeight !== 'none' ? size(maxHeight) : undefined,
          overflowY: maxHeight && maxHeight !== 'none' ? 'auto' : 'visible',
          maskImage: showGradients ? FADE_MASK : undefined,
          WebkitMaskImage: showGradients ? FADE_MASK : undefined
        }}
      >
        <div ref={trackRef} className="animated-list__track">
          {items.map((item, index) => {
            const entry: AnimatedListItem = item !== null && typeof item === 'object' ? item : { title: item };
            const isSelected = index === selected;
            return (
              <div
                key={entry.id ?? index}
                ref={element => {
                  itemRefs.current[index] = element;
                }}
                id={`${baseId}-${index}`}
                className={`animated-list__item ${itemClassName}`.trim()}
                role="option"
                aria-selected={isSelected}
                data-index={index}
                data-selected={isSelected ? '' : undefined}
                data-cursor-target=""
                data-cursor-magnetic="true"
                style={entry.color ? ({ '--item-color': entry.color } as CSSProperties) : undefined}
                onPointerEnter={selectOnHover ? (e) => { if (e.pointerType !== 'touch') hover(index); } : undefined}
                onPointerLeave={selectOnHover ? (e) => { if (e.pointerType !== 'touch') leave(); } : undefined}
                onClick={() => choose(item, index)}
              >
                {renderItem ? (
                  renderItem(item, index, isSelected)
                ) : (
                  <>
                    {(entry.image || entry.icon) && (
                      <span className="animated-list__lead">
                        {entry.image ? <img src={entry.image} alt="" draggable={false} /> : entry.icon}
                      </span>
                    )}
                    <span className="animated-list__text">
                      <span className="animated-list__title font-sans">{entry.title}</span>
                      {entry.description && <span className="animated-list__description font-mono">{entry.description}</span>}
                    </span>
                    {entry.meta && (
                      <span className="animated-list__meta font-mono inline-flex items-center text-[10px] sm:text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.15)] shrink-0">
                        {entry.meta}
                      </span>
                    )}
                  </>
                )}
                <span className="animated-list__rim" aria-hidden="true" />
              </div>
            );
          })}
          <span ref={indicatorRef} className="animated-list__indicator" aria-hidden="true">
            <span ref={ringRef} className="animated-list__ring" />
          </span>
        </div>
      </div>
      {frame && <span className="animated-list__frame-rim" aria-hidden="true" />}
    </div>
  );
};

export default AnimatedList;
