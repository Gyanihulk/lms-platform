// ScrollContext.tsx
import React, { createContext, useContext, useRef, ReactNode, useCallback, RefObject } from 'react';

interface ScrollContextType {
  scrollToProject: () => void;
  projectRef:RefObject<HTMLDivElement>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const projectRef = useRef<HTMLDivElement>(null);

  const scrollToProject = useCallback(() => {
    projectRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ScrollContext.Provider value={{ projectRef,scrollToProject }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll1 = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
