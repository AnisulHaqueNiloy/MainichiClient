// LanguageDropdown.tsx

import { useCallback, useEffect, useState } from "react";
import { changeLanguage, isTranslateReady } from "./useGoogleTranslate";
import { ChevronDown } from "lucide-react"; // ChevronDown use kora standard

export interface Language {
  code: string;
  name: string;
  flag: string;
}

// Japan and USA logic set kora holo
const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" }, // USA Flag
  { code: "ja", name: "Japan", flag: "🇯🇵" }, // Japan Flag
];

interface LanguageDropdownProps {
  onLanguageChange?: (language: Language) => void;
}

export const LanguageDropdown = ({
  onLanguageChange,
}: LanguageDropdownProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkReady = () => {
      if (!isMounted) return;
      if (isTranslateReady()) {
        setReady(true);
        loadSavedLanguage();
      } else {
        setTimeout(checkReady, 300);
      }
    };
    const timer = setTimeout(checkReady, 500);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const loadSavedLanguage = useCallback(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      try {
        const lang = JSON.parse(savedLanguage);
        setSelectedLanguage(lang);
        setTimeout(() => {
          changeLanguage(lang.code).catch((err) => {
            console.error("[LanguageDropdown] Error restoring language:", err);
          });
        }, 300);
      } catch (e) {
        localStorage.removeItem("selectedLanguage");
      }
    }
  }, []);

  const handleLanguageChange = useCallback(
    async (language: Language) => {
      if (!ready) return;

      setSelectedLanguage(language);
      setIsDropdownOpen(false);

      try {
        localStorage.setItem("selectedLanguage", JSON.stringify(language));
        if (onLanguageChange) onLanguageChange(language);
        await changeLanguage(language.code);
      } catch (error) {
        console.error("[LanguageDropdown] Error changing language:", error);
      }
    },
    [ready, onLanguageChange],
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center bg-white text-[#1F5E3B] border border-gray-200 space-x-2 text-sm px-3 py-2 cursor-pointer rounded-full hover:bg-gray-50 transition-all shadow-sm font-bold"
        disabled={!ready}
      >
        <span className="text-xl">{selectedLanguage.flag}</span>
        <span className="hidden md:inline">{selectedLanguage.name}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isDropdownOpen && (
        <>
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-[200] overflow-hidden p-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex cursor-pointer items-center space-x-3 px-4 py-3 text-sm rounded-xl transition-colors
                  ${selectedLanguage.code === language.code ? "bg-[#F1F5F1] text-[#1F5E3B] font-bold" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {selectedLanguage.code === language.code && (
                  <div className="w-2 h-2 bg-[#1F5E3B] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setIsDropdownOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default LanguageDropdown;
