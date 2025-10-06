import React from 'react';
import { useApp } from './AppContext';

export const SkipToContent: React.FC = () => {
  const { t } = useApp();

  const handleSkipToContent = () => {
    const mainContent = document.querySelector('main, [role="main"], #main-content');
    if (mainContent instanceof HTMLElement) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <button
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      onClick={handleSkipToContent}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSkipToContent();
        }
      }}
    >
      {t('skipToContent')}
    </button>
  );
};