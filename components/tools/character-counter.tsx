"use client";
import { useMemo, useState } from "react";
import { countCharacters, SOCIAL_LIMITS } from "@/lib/formulas/social";

export function CharacterCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countCharacters(text), [text]);
  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Your text</span>
        <textarea className="tool-input mt-2 min-h-[200px] font-sans" placeholder="Paste or type your post..." value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div className="result-card grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div><p className="text-xs text-[var(--muted)]">Characters</p><p className="text-xl font-bold">{stats.characters}</p></div>
        <div><p className="text-xs text-[var(--muted)]">No spaces</p><p className="text-xl font-bold">{stats.charactersNoSpaces}</p></div>
        <div><p className="text-xs text-[var(--muted)]">Words</p><p className="text-xl font-bold">{stats.words}</p></div>
        <div><p className="text-xs text-[var(--muted)]">Lines</p><p className="text-xl font-bold">{stats.lines}</p></div>
      </div>
      <div className="tool-panel space-y-2">
        <p className="text-sm font-medium">Platform limits</p>
        {SOCIAL_LIMITS.map((p) => {
          const remaining = p.limit - stats.characters;
          const ok = remaining >= 0;
          return (
            <div key={p.platform} className="flex justify-between text-sm">
              <span>{p.platform}</span>
              <span className={ok ? "text-secondary" : "text-red-500"}>
                {ok ? `${remaining} left` : `${Math.abs(remaining)} over`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
