interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitleBlock({ title, subtitle }: Props) {
  return (
    <div className='pb-10 pt-6 text-center lg:pb-12 lg:pt-10'>
      <h1 className='text-[20px] font-medium uppercase tracking-[0.24em] lg:text-[24px]'>{title}</h1>
      {subtitle ? (
        <p className='mx-auto mt-4 max-w-[760px] text-[14px] leading-[1.8] text-[var(--muted)] lg:text-[15px]'>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
