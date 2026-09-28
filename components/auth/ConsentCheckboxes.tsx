"use client";
import Link from "next/link";
import { useDarkMode } from "@/lib/DarkModeContext";

type Props = {
  consent: boolean;
  ageConfirmed: boolean;
  onConsentChange: (v: boolean) => void;
  onAgeConfirmedChange: (v: boolean) => void;
};

export default function ConsentCheckboxes({
  consent, ageConfirmed, onConsentChange, onAgeConfirmedChange,
}: Props) {
  const { darkMode } = useDarkMode();
  const text = darkMode ? "text-orange-200/90" : "text-orange-800";
  const link = darkMode ? "text-orange-400 underline" : "text-orange-600 underline";

  return (
    <div className={`mb-4 space-y-2.5 p-3 rounded-xl ${darkMode ? "bg-orange-900/10" : "bg-orange-50"}`}>
      <label className={`flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer ${text}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="w-4 h-4 rounded accent-orange-500 mt-0.5 shrink-0"
        />
        <span>
          I have read the <Link href="/legal/privacy" target="_blank" className={link}>Privacy Notice</Link> and
          consent to VartaLang processing my personal data as described in it.
        </span>
      </label>

      <label className={`flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer ${text}`}>
        <input
          type="checkbox"
          checked={ageConfirmed}
          onChange={(e) => onAgeConfirmedChange(e.target.checked)}
          className="w-4 h-4 rounded accent-orange-500 mt-0.5 shrink-0"
        />
        <span>I confirm that I am 18 years of age or older.</span>
      </label>
    </div>
  );
}