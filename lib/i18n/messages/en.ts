export const en = {
  nav: {
    tools: "Tools",
    blog: "Blog",
    about: "About",
    allTools: "All Tools",
    allToolsArrow: "All tools →",
    sisterSite: "DevToolbox ↗",
    toggleTheme: "Toggle theme",
    menu: "Menu",
  },
  home: {
    title: "Everyday Tools That Just Work",
    subtitle:
      "Free calculators for tips, BMI, percentages, unit conversions, and more — no signup, runs in your browser.",
    exploreTools: "Explore Tools",
    readBlog: "Read the Blog",
    open: "Open →",
  },
  toolsIndex: {
    title: "All Tools",
    subtitle: "Every tool has its own page for fast loading and SEO.",
    all: "All",
  },
  blog: {
    title: "Blog",
    subtitle: "Practical guides for everyday life — with free tools to try inline.",
    tryItYourself: "Try it yourself",
    useTool: "Use our free {tool} — no signup required.",
    openTool: "Open {tool} →",
  },
  toolPage: {
    privacyNote: "All calculations run locally in your browser — nothing is uploaded.",
    relatedTools: "Related Tools",
  },
  footer: {
    tagline: "LifeToolbox — Free everyday tools.",
    blog: "Blog",
    about: "About",
    privacy: "Privacy Policy",
    terms: "Terms",
    affiliate: "Affiliate Disclosure",
    sisterSite: "Developer tools → DevToolbox",
    copyright: "Everyday tools that just work.",
    privacyShort: "All calculations run locally in your browser. We do not upload your data.",
  },
  disclaimer: {
    medical:
      "This tool is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.",
    financial:
      "Calculations are estimates for educational purposes only and do not constitute financial advice. Consult a licensed professional before making financial decisions.",
  },
  language: {
    label: "Language",
    en: "EN",
    zh: "中文",
  },
  common: {
    copy: "Copy",
    copied: "Copied!",
    reset: "Reset",
    calculate: "Calculate",
    result: "Result",
    input: "Input",
    output: "Output",
  },
} as const;

export type Messages = {
  nav: Record<keyof typeof en.nav, string>;
  home: Record<keyof typeof en.home, string>;
  toolsIndex: Record<keyof typeof en.toolsIndex, string>;
  blog: Record<keyof typeof en.blog, string>;
  toolPage: Record<keyof typeof en.toolPage, string>;
  footer: Record<keyof typeof en.footer, string>;
  disclaimer: Record<keyof typeof en.disclaimer, string>;
  language: Record<keyof typeof en.language, string>;
  common: Record<keyof typeof en.common, string>;
};
