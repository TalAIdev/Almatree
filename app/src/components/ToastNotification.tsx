'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  type: ToastType;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
  },
};

export function ToastNotification({ 
  type, 
  title, 
  message, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastNotificationProps) {
  const [isClosing, setIsClosing] = useState(false);
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && !isClosing && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-4 shadow-lg backdrop-blur-sm`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 p-2 rounded-xl bg-white/50`}>
                <Icon className={`w-5 h-5 ${config.iconColor}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
                  {title}
                </h4>
                <p className={`text-sm ${config.messageColor} leading-relaxed`}>
                  {message}
                </p>
              </div>
              
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/50 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing toast notifications
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    title: string;
    message: string;
  }>>([]);

  const showToast = (type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 left-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isVisible={true}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    ToastContainer,
  };
}
