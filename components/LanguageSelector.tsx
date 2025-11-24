import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

interface LanguageSelectorProps {
  currentLocale: string;
  className?: string;
  variant?: "default" | "pre-header" | "footer";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLocale,
  className = "",
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const getCurrentPathWithoutLocale = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pathWithoutLocale = path.replace(`/${currentLocale}`, "");
      return pathWithoutLocale || "/";
    }
    return "/";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-0 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm ${
          variant === "pre-header"
            ? "text-white bg-transparent border border-white hover:bg-white hover:text-black"
            : variant === "footer"
              ? "text-white bg-transparent border border-white hover:bg-white hover:text-black"
              : "text-[#025C7A] bg-white border border-gray-200 hover:bg-gray-50 focus:ring-[#025C7A]"
        }`}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-semibold">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 ${
            variant === "footer" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="py-1">
            {languages.map(language => {
              const pathWithoutLocale = getCurrentPathWithoutLocale();
              const href = `/${language.code}${pathWithoutLocale}`;

              return (
                <Link
                  key={language.code}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                    language.code === currentLocale
                      ? "bg-[#6E9753] bg-opacity-10 text-[#6E9753] border-l-4 border-[#6E9753]"
                      : "text-[#025C7A]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {language.code === currentLocale && (
                    <svg
                      className="w-4 h-4 ml-auto text-[#6E9753]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
