import React, { createContext, useContext, useState, useCallback } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <div className="min-h-screen w-full">
        <div className="relative w-full">
          {children}
        </div>
        {isLoading && (
          <div 
            className="fixed inset-0 bg-slate-900 z-[9999] w-full h-full" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              WebkitTransform: 'translate3d(0,0,0)'
            }}
          >
            <LoadingAnimation />
          </div>
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
