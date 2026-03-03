import { ReactNode } from 'react';

interface Props { label: string; children: ReactNode; onClick?: () => void; }

export default function IconButton({ label, children, onClick }: Props) {
  return <button aria-label={label} onClick={onClick} className='inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.06)] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)]'>{children}</button>;
}
