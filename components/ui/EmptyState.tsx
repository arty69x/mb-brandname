import Button from './Button';
export default function EmptyState({ title, body, ctaHref, ctaLabel }: { title: string; body: string; ctaHref: string; ctaLabel: string }) {
  return <div className='py-14 text-center'><h2 className='text-[14px] uppercase tracking-[0.12em]'>{title}</h2><p className='mt-3 text-[14px] text-[#6b6b6b]'>{body}</p><div className='mt-6'><Button href={ctaHref}>{ctaLabel}</Button></div></div>;
}
