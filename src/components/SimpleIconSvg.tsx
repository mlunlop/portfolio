export interface SimpleIconData {
  title: string;
  slug: string;
  path: string;
  hex: string;
}

export interface SimpleIconProps {
  icon: SimpleIconData;
  size?: number;
  className?: string;
  color?: string;
}

export function SimpleIconSvg({ icon, size = 18, className = '', color }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color || `#${icon.hex}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

