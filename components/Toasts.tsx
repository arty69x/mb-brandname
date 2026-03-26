import { useStore } from '@/context/StoreContext';

export function Toasts() {
  const { toasts, removeToast } = useStore();
  const safeToasts = Array.isArray(toasts) ? toasts : [];

  return (
    <div className="fixed bottom-4 right-4 z-[80] space-y-2">
      {safeToasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => removeToast(toast.id)}
          className="block bg-[#111111] px-4 py-2 text-[14px] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-80"
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
