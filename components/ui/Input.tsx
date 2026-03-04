interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

export default function Input({ id, label, value, onChange, type = 'text', required }: Props) {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className='text-[12px] uppercase tracking-[0.14em] text-[#8b8b8b]'>{label}</label>
      <input
        id={id}
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='h-11 w-full rounded-full border border-[#d9d9d9] bg-white px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)]'
      />
    </div>
  );
}
