interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitleBlock({ title, subtitle }: Props) {
  return (
    <div className='relative mb-10 h-[300px] overflow-hidden lg:h-[380px]'>
      <img src='/assets/mb/v1/ref/hero3.svg' alt={title} className='h-full w-full object-cover' />
      <div className='absolute inset-0 bg-black/35' />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
        <h1 className='text-[58px] uppercase'>{title}</h1>
        {subtitle ? <p className='mt-3 text-[16px] text-white/85'>{subtitle}</p> : null}
      </div>
    </div>
  );
}
