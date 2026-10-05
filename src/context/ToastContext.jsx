import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Bookmark, Share2, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'bookmark-add':
        return <Bookmark className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />;
      case 'bookmark-remove':
        return <Bookmark className="w-4 h-4 text-zinc-400 flex-shrink-0" />;
      case 'share':
        return <Share2 className="w-4 h-4 text-blue-500 flex-shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-zinc-400 flex-shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast notifications container */}
      <div 
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900/95 dark:bg-zinc-800/95 backdrop-blur-md text-white text-sm font-medium rounded-xl shadow-2xl border border-zinc-700/50 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          >
            <div className="flex items-center gap-3">
              {getIcon(toast.type)}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
