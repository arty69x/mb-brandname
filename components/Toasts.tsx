import { useStore } from '@/context/StoreContext';

export function Toasts() {
  const { toasts, removeToast } = useStore();
  const safeToasts = Array.isArray(toasts) ? toasts : [];

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {safeToasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => removeToast(toast.id)}
          className="block bg-black px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:opacity-80"
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
