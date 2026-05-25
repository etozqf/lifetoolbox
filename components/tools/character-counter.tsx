"use client";
import { useMemo, useState } from "react";
import { countCharacters, SOCIAL_LIMITS } from "@/lib/formulas/social";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function CharacterCounterTool() {
  const ui = useToolUi("character-counter");
  const { locale } = useLocale();
  const [text, setText] = useState("");
  const stats = useMemo(() => countCharacters(text), [text]);
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.yourText}</span>
        <textarea className="tool-input mt-2 min-h-[200px] font-sans" placeholder={ui.placeholder} value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div className="result-card grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div><p className="text-xs text-[var(--muted)]">{ui.characters}</p><p className="text-xl font-bold">{numFmt(stats.characters)}</p></div>
        <div><p className="text-xs text-[var(--muted)]">{ui.noSpaces}</p><p className="text-xl font-bold">{numFmt(stats.charactersNoSpaces)}</p></div>
        <div><p className="text-xs text-[var(--muted)]">{ui.words}</p><p className="text-xl font-bold">{numFmt(stats.words)}</p></div>
        <div><p className="text-xs text-[var(--muted)]">{ui.lines}</p><p className="text-xl font-bold">{numFmt(stats.lines)}</p></div>
      </div>
      <div className="tool-panel space-y-2">
        <p className="text-sm font-medium">{ui.platformLimits}</p>
        {SOCIAL_LIMITS.map((p) => {
          const remaining = p.limit - stats.characters;
          const ok = remaining >= 0;
          return (
            <div key={p.platform} className="flex justify-between text-sm">
              <span>{p.platform}</span>
              <span className={ok ? "text-secondary" : "text-red-500"}>
                {ok ? ui.left.replace("{n}", numFmt(remaining)) : ui.over.replace("{n}", numFmt(Math.abs(remaining)))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
