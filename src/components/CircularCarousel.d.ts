import type { CSSProperties, ReactElement, Ref } from 'react';

export interface CircularCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface CircularCarouselApi {
  next: () => void;
  prev: () => void;
  focus: (index: number) => void;
}

export interface CircularCarouselProps {
  items: CircularCarouselItem[];
  preset?: 'cylinder' | 'orbit' | 'wheel' | 'panorama';
  intro?: 'assemble' | 'rise' | 'spin' | 'none';
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  curve?: number;
  tilt?: number;
  perspective?: number;
  autoplay?: 'drift' | 'step' | 'off';
  speed?: number;
  interval?: number;
  direction?: 'left' | 'right';
  draggable?: boolean;
  momentum?: number;
  snap?: boolean;
  pauseOnHover?: boolean;
  focusOnClick?: boolean;
  parallax?: number;
  stretch?: number;
  depthFade?: number;
  fadeColor?: string;
  innerShade?: number;
  cornerRadius?: number;
  captions?: boolean;
  onChange?: (index: number) => void;
  onItemClick?: (item: CircularCarouselItem, index: number) => void;
  apiRef?: Ref<CircularCarouselApi>;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

declare const CircularCarousel: (props: CircularCarouselProps) => ReactElement;
export default CircularCarousel;
