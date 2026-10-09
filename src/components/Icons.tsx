import type { SVGProps } from 'react';

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function KaggleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.825 23.859c-.022.046-.06.082-.114.108s-.112.033-.174.033h-3.41c-.131 0-.251-.055-.339-.142l-4.706-5.865-1.503 1.458v4.298c0 .077-.027.142-.082.197s-.12.082-.197.082H5.65c-.076 0-.142-.027-.197-.082s-.082-.12-.082-.197V.284c0-.077.027-.142.082-.197s.12-.082.197-.082h2.649c.077 0 .142.027.197.082s.082.12.082.197v14.492l6.007-6.225c.088-.088.208-.131.339-.131h3.454c.066 0 .126.011.18.033s.098.055.131.109c.044.055.066.115.066.18s-.011.126-.033.18l-6.39 6.433 6.641 8.279c.033.044.049.098.049.164s-.011.12-.033.164z" />
    </svg>
  );
}

