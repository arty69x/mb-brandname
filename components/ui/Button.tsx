import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'pill';

interface Props {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const classes: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-full bg-[var(--cta)] px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-white transition-colors duration-300 ease-in-out hover:bg-[var(--ctaHover)] focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)] focus:ring-offset-2 disabled:opacity-40',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-[var(--text)] transition-colors duration-300 ease-in-out hover:bg-[var(--bg-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)] focus:ring-offset-2',
  pill:
    'inline-flex items-center justify-center rounded-full bg-[#6f6f6f] px-8 py-2.5 text-[12px] uppercase tracking-[0.12em] text-white transition-colors duration-300 ease-in-out hover:bg-[#5b5b5b] focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)] focus:ring-offset-2'
};

export default function Button({ children, variant = 'primary', href, type = 'button', disabled, onClick }: Props) {
  if (href) {
    return (
      <Link href={href} className={classes[variant]} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes[variant]}>
      {children}
    </button>
  );
}
