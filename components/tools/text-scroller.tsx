"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SCROLLER_PRESETS,
  scrollDurationSeconds,
  type ScrollDirection,
} from "@/lib/formulas/text-scroller";

export function TextScrollerTool() {
  const [text, setText] = useState("Your scrolling message here");
  const [speed, setSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [direction, setDirection] = useState<ScrollDirection>("left");
  const [bold, setBold] = useState(true);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const duration = useMemo(() => scrollDurationSeconds(speed), [speed]);
  const horizontal = direction === "left" || direction === "right";

  const animationName = horizontal
    ? direction === "left"
      ? "marquee-left"
      : "marquee-right"
    : direction === "up"
      ? "marquee-up"
      : "marquee-down";

  const enterFullscreen = useCallback(async () => {
    const el = stageRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      /* unsupported */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.fullscreenElement) void document.exitFullscreen();
      if (e.key === " " && document.fullscreenElement === stageRef.current) {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const applyPreset = (idx: number) => {
    const p = SCROLLER_PRESETS[idx];
    setText(p.text);
    setBgColor(p.bg);
    setTextColor(p.color);
    setFontSize(p.size);
    setSpeed(p.speed);
  };

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes marquee-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scroller-stage:fullscreen {
          min-height: 100vh;
          height: 100vh;
          width: 100vw;
          border-radius: 0;
          border: none;
        }
        .scroller-stage:fullscreen .scroller-track {
          min-height: 100vh;
          height: 100vh;
        }
        .scroller-stage:fullscreen .scroller-text {
          font-size: clamp(2rem, 8vw, 6rem) !important;
        }
      `}</style>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Display text</span>
        <textarea
          className="tool-input mt-2 min-h-[100px] font-sans"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your message…"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {SCROLLER_PRESETS.map((p, i) => (
          <button key={p.label} type="button" className="btn-preset text-xs" onClick={() => applyPreset(i)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="tool-panel block">
          <span className="text-sm font-medium">Speed: {speed}</span>
          <input
            type="range"
            min={1}
            max={100}
            className="mt-2 w-full"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Font size: {fontSize}px</span>
          <input
            type="range"
            min={16}
            max={120}
            className="mt-2 w-full"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Text color</span>
          <input type="color" className="mt-2 h-10 w-full cursor-pointer" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Background</span>
          <input type="color" className="mt-2 h-10 w-full cursor-pointer" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Scroll direction</span>
        <select className="tool-input mt-2" value={direction} onChange={(e) => setDirection(e.target.value as ScrollDirection)}>
          <option value="left">Horizontal ← (right to left)</option>
          <option value="right">Horizontal → (left to right)</option>
          <option value="up">Vertical ↑</option>
          <option value="down">Vertical ↓</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} />
        Bold text
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => setPaused((p) => !p)}>
          {paused ? "Play" : "Pause"}
        </button>
        <button type="button" className="btn-primary" onClick={enterFullscreen}>
          Fullscreen display
        </button>
      </div>

      <p className="text-xs text-[var(--muted)]">
        Tip: In fullscreen, press Space to pause/resume, Esc to exit. Great for events, concerts, and signage.
      </p>

      <div
        ref={stageRef}
        className="scroller-stage relative overflow-hidden rounded-2xl border border-[var(--border)]"
        style={{ backgroundColor: bgColor, minHeight: horizontal ? 120 : 280 }}
      >
        <div
          className={`scroller-track flex ${horizontal ? "h-[120px] items-center" : "min-h-[280px] w-full items-center justify-center"}`}
        >
          <span
            className="scroller-text inline-block whitespace-nowrap px-4"
            style={{
              color: textColor,
              fontSize: `${fontSize}px`,
              fontWeight: bold ? 700 : 400,
              animationName: text.trim() ? animationName : "none",
              animationDuration: `${duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {text.trim() || "Enter text above"}
          </span>
        </div>
      </div>
    </div>
  );
}
