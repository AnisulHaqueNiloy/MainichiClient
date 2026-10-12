// GoogleTranslateWrapper.tsx
import type { ReactNode } from "react";
import { useEffect } from "react";
import { loadGoogleTranslateScript } from "./useGoogleTranslate";

interface GoogleTranslateWrapperProps {
  children: ReactNode;
}

export const GoogleTranslateWrapper = ({
  children,
}: GoogleTranslateWrapperProps) => {
  useEffect(() => {
    loadGoogleTranslateScript().catch((error) => {
      console.error("[GoogleTranslateWrapper] Error loading translation script:", error);
    });
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <div />
      </div>
      <div id="app-content">
        {children}
      </div>
    </>
  );
};
