import type { DisclaimerType } from "@/lib/tool-registry";

const messages: Record<DisclaimerType, string> = {
  medical:
    "This tool is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.",
  financial:
    "Calculations are estimates for educational purposes only and do not constitute financial advice. Consult a licensed professional before making financial decisions.",
};

export function DisclaimerBanner({ type }: { type: DisclaimerType }) {
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
      ⚠ {messages[type]}
    </div>
  );
}
