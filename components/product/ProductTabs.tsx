import { useState } from "react";
import { reviews } from "../../lib/content";

export default function ProductTabs({ description, details }: { description: string; details: string[] }) {
  const [tab, setTab] = useState<"desc" | "details" | "reviews">("desc");

  return (
    <div>
      <div className="flex gap-8 border-b border-gray-100">
        {[
          { key: "desc", label: "Description" },
          { key: "details", label: "Details" },
          { key: "reviews", label: "Reviews" },
        ].map((t) => (
          <button key={t.key} className="pb-3 text-[11px] font-black uppercase tracking-[0.3em]" onClick={() => setTab(t.key as "desc" | "details" | "reviews")}>{t.label}</button>
        ))}
      </div>
      <div className="pt-6 text-sm opacity-80">
        {tab === "desc" && <p>{description}</p>}
        {tab === "details" && <ul className="list-disc pl-5">{Array.isArray(details) && details.map((d) => <li key={d}>{d}</li>)}</ul>}
        {tab === "reviews" && <div className="space-y-4">{reviews.map((r) => <article key={`${r.author}-${r.date}`}><p className="text-[11px] font-black uppercase tracking-[0.2em]">{r.author} · {r.rating}/5</p><p>{r.body}</p></article>)}</div>}
      </div>
    </div>
  );
}
