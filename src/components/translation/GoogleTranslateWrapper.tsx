// GoogleTranslateWrapper.tsx
import type { ReactNode } from "react";

interface GoogleTranslateWrapperProps {
  children: ReactNode;
}

export const GoogleTranslateWrapper = ({
  children,
}: GoogleTranslateWrapperProps) => {
  return (
    <>
      <div id="google_translate_element" aria-hidden="true" className="hidden">
        <div />
      </div>
      <div id="app-content" className="notranslate" translate="no">
        {children}
      </div>
    </>
  );
};
