"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  FONT_FAMILIES,
  SCROLLER_PRESETS,
  TEMPLATE_OPTIONS,
  computeAutoFontSizePx,
  fontSizeCss,
  fontSizeLabel,
  scrollDurationFromSpeed,
  type ScrollDirection,
  type ScrollerFontFamily,
} from "@/lib/formulas/text-scroller";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

function SettingsSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
      <button
        type="button"
        className="flex w-full items-center justify-between bg-[var(--surface-muted)] px-4 py-3 text-left text-sm font-semibold"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title}
        <span className="text-[var(--muted)]">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="space-y-4 p-4">{children}</div>}
    </div>
  );
}

export function TextScrollerTool() {
  const ui = useToolUi("text-scroller");
  const [text, setText] = useState("Your scrolling message here");
  const [speedPx, setSpeedPx] = useState(50);
  const [fontSizeScale, setFontSizeScale] = useState(0);
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [stageHeight, setStageHeight] = useState(120);
  const [direction, setDirection] = useState<ScrollDirection>("left");
  const [fontFamily, setFontFamily] = useState<ScrollerFontFamily>("sans");
  const [fontWeight, setFontWeight] = useState(700);
  const [letterSpacing, setLetterSpacing] = useState(2);
  const [repeatSpacing, setRepeatSpacing] = useState(100);
  const [paused, setPaused] = useState(false);
  const [browserDisplay, setBrowserDisplay] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [travelPx, setTravelPx] = useState(800);
  const [autoFontPx, setAutoFontPx] = useState(48);

  const stageRef = useRef<HTMLDivElement>(null);
  const browserStageRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const fitMeasureRef = useRef<HTMLSpanElement>(null);

  const horizontal = direction === "left" || direction === "right";
  const displayText = text.trim() || ui.emptyDisplay;
  const fontCss = useMemo(
    () => (fontSizeScale === 0 ? `${autoFontPx}px` : fontSizeCss(fontSizeScale)),
    [fontSizeScale, autoFontPx]
  );
  const fontStack = FONT_FAMILIES.find((f) => f.id === fontFamily)?.css ?? FONT_FAMILIES[0].css;
  const duration = useMemo(
    () => scrollDurationFromSpeed(travelPx, speedPx),
    [travelPx, speedPx]
  );

  const animationName = horizontal
    ? direction === "left"
      ? "marquee-left"
      : "marquee-right"
    : direction === "up"
      ? "marquee-up"
      : "marquee-down";

  const measureTravel = useCallback(() => {
    const stage = stageRef.current;
    const span = measureRef.current;
    if (!stage || !span) return;
    const gap = (repeatSpacing / 100) * span.offsetWidth;
    if (horizontal) {
      setTravelPx(stage.offsetWidth + span.offsetWidth + gap);
    } else {
      setTravelPx(stage.offsetHeight + span.offsetHeight + gap);
    }
  }, [horizontal, repeatSpacing]);

  const fitAutoFontSize = useCallback(() => {
    if (fontSizeScale !== 0) return;
    const container = browserDisplay ? browserStageRef.current : stageRef.current;
    const probe = fitMeasureRef.current;
    if (!container || !probe) return;
    probe.style.fontSize = "10px";
    probe.style.lineHeight = "1";
    const textHeightAt10 = probe.offsetHeight;
    setAutoFontPx(computeAutoFontSizePx(container.clientHeight, textHeightAt10));
  }, [fontSizeScale, browserDisplay]);

  useLayoutEffect(() => {
    fitAutoFontSize();
  }, [
    displayText,
    stageHeight,
    fontSizeScale,
    fontWeight,
    letterSpacing,
    fontFamily,
    browserDisplay,
    fitAutoFontSize,
  ]);

  useLayoutEffect(() => {
    measureTravel();
  }, [
    displayText,
    stageHeight,
    fontSizeScale,
    autoFontPx,
    fontWeight,
    letterSpacing,
    fontFamily,
    measureTravel,
  ]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      fitAutoFontSize();
      measureTravel();
    });
    if (stageRef.current) ro.observe(stageRef.current);
    if (browserStageRef.current) ro.observe(browserStageRef.current);
    return () => ro.disconnect();
  }, [fitAutoFontSize, measureTravel, browserDisplay]);

  useEffect(() => {
    const onFs = () => {
      fitAutoFontSize();
      measureTravel();
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, [fitAutoFontSize, measureTravel]);

  const resetPosition = () => setAnimKey((k) => k + 1);

  const enterFullscreen = useCallback(async () => {
    const el = stageRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      /* unsupported */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (browserDisplay) setBrowserDisplay(false);
        else if (document.fullscreenElement) void document.exitFullscreen();
      }
      if (e.key === " " && (browserDisplay || document.fullscreenElement === stageRef.current)) {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [browserDisplay]);

  useEffect(() => {
    document.body.style.overflow = browserDisplay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [browserDisplay]);

  const applyPreset = (idx: number) => {
    const p = SCROLLER_PRESETS[idx];
    setText(p.text);
    setBgColor(p.bg);
    setTextColor(p.color);
    setFontSizeScale(p.fontSizeScale);
    setSpeedPx(p.speed);
    setStageHeight(p.stageHeight);
    setFontFamily(p.fontFamily);
    setFontWeight(p.fontWeight);
    resetPosition();
  };

  const applyTemplate = () => {
    setText(TEMPLATE_OPTIONS[templateIdx]?.text ?? text);
    resetPosition();
  };

  const textStyle = {
    color: textColor,
    fontSize: fontCss,
    fontFamily: fontStack,
    fontWeight,
    lineHeight: 1,
    letterSpacing: `${letterSpacing}px`,
    animationName: displayText ? animationName : "none",
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear" as const,
    animationIterationCount: "infinite" as const,
    animationPlayState: paused ? ("paused" as const) : ("running" as const),
  };

  const gapStyle = { marginRight: horizontal ? `${repeatSpacing}%` : 0, marginBottom: horizontal ? 0 : `${repeatSpacing}%` };

  const stage = (
    <div
      ref={stageRef}
      className="scroller-stage relative overflow-hidden rounded-2xl border border-[var(--border)]"
      style={{
        backgroundColor: bgColor,
        height: stageHeight,
        containerType: "size",
      }}
    >
      <div
        className={`scroller-track flex h-full w-full ${horizontal ? "items-center" : "flex-col items-center justify-center"}`}
      >
        <span
          key={animKey}
          className={`scroller-text inline-flex whitespace-nowrap ${horizontal ? "flex-row" : "flex-col items-center"}`}
          style={textStyle}
        >
          <span ref={measureRef} className="inline-block">
            {displayText}
          </span>
          <span className="inline-block" style={gapStyle} aria-hidden>
            {displayText}
          </span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative space-y-4">
      <span
        ref={fitMeasureRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap opacity-0"
        style={{
          fontFamily: fontStack,
          fontWeight,
          letterSpacing: `${letterSpacing}px`,
          lineHeight: 1,
        }}
      >
        {displayText}
      </span>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .scroller-stage:fullscreen {
          height: 100vh !important;
          width: 100vw;
          border-radius: 0;
          border: none;
        }
      `}</style>

      {stage}

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => setPaused((p) => !p)}>
          {paused ? ui.play : ui.pause}
        </button>
        <button type="button" className="btn-secondary" onClick={resetPosition}>
          {ui.resetPosition}
        </button>
        <button type="button" className="btn-secondary" onClick={enterFullscreen}>
          {ui.fullscreen}
        </button>
        <button type="button" className="btn-secondary" onClick={() => setBrowserDisplay(true)}>
          {ui.fullBrowser}
        </button>
      </div>

      <SettingsSection title={ui.defaultTemplates}>
        <div className="flex flex-wrap gap-2">
          {SCROLLER_PRESETS.map((p, i) => (
            <button key={p.label} type="button" className="btn-preset text-xs" onClick={() => applyPreset(i)}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="tool-input flex-1" value={templateIdx} onChange={(e) => setTemplateIdx(Number(e.target.value))}>
            {TEMPLATE_OPTIONS.map((t, i) => (
              <option key={t.label} value={i}>
                {t.label}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={applyTemplate}>
            {ui.applyTemplate}
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title={ui.textSettings} defaultOpen>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.displayText}</span>
          <textarea
            className="tool-input mt-2 min-h-[100px] font-sans"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={ui.placeholderMessage}
          />
        </label>
      </SettingsSection>

      <SettingsSection title={ui.styleSettings}>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.fontSize.replace("{value}", fontSizeLabel(fontSizeScale))}</span>
          <input
            type="range"
            min={0}
            max={100}
            className="mt-2 w-full"
            value={fontSizeScale}
            onChange={(e) => setFontSizeScale(Number(e.target.value))}
          />
          <p className="mt-1 text-xs text-[var(--muted)]">{ui.fontSizeHint}</p>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.fontFamily}</span>
          <select className="tool-input mt-2" value={fontFamily} onChange={(e) => setFontFamily(e.target.value as ScrollerFontFamily)}>
            {FONT_FAMILIES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.textColor}</span>
          <div className="mt-2 flex items-center gap-2">
            <input type="color" className="h-10 w-14 cursor-pointer" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            <input type="text" className="tool-input flex-1 font-mono text-sm" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </div>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.fontWeight.replace("{n}", String(fontWeight))}</span>
          <input
            type="range"
            min={100}
            max={900}
            step={100}
            className="mt-2 w-full"
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-xs text-[var(--muted)]">
            <span>100</span>
            <span>400</span>
            <span>700</span>
            <span>900</span>
          </div>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.letterSpacing.replace("{n}", String(letterSpacing))}</span>
          <input
            type="range"
            min={0}
            max={20}
            className="mt-2 w-full"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
          />
        </label>
      </SettingsSection>

      <SettingsSection title={ui.animationSettings}>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.scrollSpeed.replace("{n}", String(speedPx))}</span>
          <input
            type="range"
            min={10}
            max={300}
            className="mt-2 w-full"
            value={speedPx}
            onChange={(e) => setSpeedPx(Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-xs text-[var(--muted)]">
            <span>{ui.slow}</span>
            <span>{ui.medium}</span>
            <span>{ui.fast}</span>
          </div>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.repeatSpacing.replace("{n}", String(repeatSpacing))}</span>
          <input
            type="range"
            min={0}
            max={200}
            className="mt-2 w-full"
            value={repeatSpacing}
            onChange={(e) => setRepeatSpacing(Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-xs text-[var(--muted)]">
            <span>0%</span>
            <span>100%</span>
            <span>200%</span>
          </div>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.scrollDirection}</span>
          <select className="tool-input mt-2" value={direction} onChange={(e) => setDirection(e.target.value as ScrollDirection)}>
            <option value="left">{ui.dirLeft}</option>
            <option value="right">{ui.dirRight}</option>
            <option value="up">{ui.dirUp}</option>
            <option value="down">{ui.dirDown}</option>
          </select>
        </label>
      </SettingsSection>

      <SettingsSection title={ui.displaySettings}>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.displayHeight.replace("{n}", String(stageHeight))}</span>
          <input
            type="range"
            min={60}
            max={800}
            step={10}
            className="mt-2 w-full"
            value={stageHeight}
            onChange={(e) => setStageHeight(Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-xs text-[var(--muted)]">
            <span>60</span>
            <span>200</span>
            <span>400</span>
            <span>800</span>
          </div>
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.backgroundColor}</span>
          <div className="mt-2 flex items-center gap-2">
            <input type="color" className="h-10 w-14 cursor-pointer" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" className="tool-input flex-1 font-mono text-sm" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </label>
      </SettingsSection>

      <p className="text-xs text-[var(--muted)]">{ui.footerHelp}</p>

      {browserDisplay && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
          role="dialog"
          aria-label="Full browser marquee display"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-lg bg-white/10 px-3 py-1 text-sm text-white"
            onClick={() => setBrowserDisplay(false)}
          >
            {ui.exit}
          </button>
          <div
            ref={browserStageRef}
            className="relative h-full w-full overflow-hidden"
            style={{ containerType: "size" }}
          >
            <div className={`flex h-full w-full ${horizontal ? "items-center" : "flex-col items-center justify-center"}`}>
              <span key={`browser-${animKey}`} className="inline-flex whitespace-nowrap" style={textStyle}>
                <span className="inline-block">{displayText}</span>
                <span className="inline-block" style={gapStyle} aria-hidden>
                  {displayText}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
