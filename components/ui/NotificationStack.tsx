import { useStore } from "../../context/store";

export default function NotificationStack() {
  const { notifications, dismiss } = useStore();
  return (
    <div className="fixed right-4 top-4 z-50 space-y-3">
      {Array.isArray(notifications) && notifications.map((n) => (
        <div key={n.id} className="border border-gray-200 bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] shadow-sm">
          <div className="flex items-center gap-3">
            <span>{n.message}</span>
            <button className="text-[10px]" onClick={() => dismiss(n.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
