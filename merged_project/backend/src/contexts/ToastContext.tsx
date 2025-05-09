import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toast, ToastType } from '../types';

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string, duration = 5000) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, type, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Auto-remove toasts after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => removeToast(toast.id), toast.duration);
        timers.push(timer);
      }
    });

    // Cleanup timers on unmount
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-fade-in px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-xs ${
              toast.type === 'success' ? 'bg-success-500 text-white' :
              toast.type === 'error' ? 'bg-error-500 text-white' :
              toast.type === 'warning' ? 'bg-warning-500 text-black' :
              'bg-brand-500 text-white'
            }`}
          >
            <span>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="ml-4 text-sm opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};