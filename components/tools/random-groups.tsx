"use client";

import { useState } from "react";
import { parseNames, splitIntoGroups, type GroupMode } from "@/lib/formulas/random-groups";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function RandomGroupsTool() {
  const ui = useToolUi("random-groups");
  const [names, setNames] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank\nGrace\nHenry\nIvy\nJack");
  const [mode, setMode] = useState<GroupMode>("groupCount");
  const [value, setValue] = useState("3");
  const [groups, setGroups] = useState<string[][]>([]);
  const [error, setError] = useState("");

  const regroup = () => {
    const list = parseNames(names);
    const num = parseInt(value, 10);
    const result = splitIntoGroups(list, mode, num);

    if (!result.ok) {
      setGroups([]);
      setError(
        result.error === "noNames"
          ? ui.errNoNames
          : result.error === "invalidCount"
            ? ui.errInvalidCount
            : ui.errInvalidSize
      );
      return;
    }

    setError("");
    setGroups(result.groups);
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.names}</span>
        <textarea
          className="tool-input mt-2 min-h-[160px] font-sans"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          placeholder={ui.namesPlaceholder}
        />
      </label>

      <div className="tool-panel space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={mode === "groupCount" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("groupCount")}
          >
            {ui.byGroupCount}
          </button>
          <button
            type="button"
            className={mode === "groupSize" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("groupSize")}
          >
            {ui.byGroupSize}
          </button>
        </div>
        <label className="block">
          <span className="text-sm font-medium">
            {mode === "groupCount" ? ui.groupCountLabel : ui.groupSizeLabel}
          </span>
          <input
            type="number"
            min={1}
            className="tool-input mt-1 w-32"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>

      <button type="button" className="btn-primary w-full" onClick={regroup}>
        {ui.regroup}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {groups.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <div key={index} className="tool-panel">
              <p className="text-sm font-medium">
                {ui.groupLabel} {index + 1} ({group.length})
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {group.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">{ui.strategyNote}</p>
    </div>
  );
}
