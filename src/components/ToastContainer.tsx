import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/40 bg-slate-900/95 text-slate-100';
            case 'error':
              return 'border-rose-500/40 bg-slate-900/95 text-slate-100';
            case 'warning':
              return 'border-amber-500/40 bg-slate-900/95 text-slate-100';
            default:
              return 'border-blue-500/40 bg-slate-900/95 text-slate-100';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl backdrop-blur-md flex items-start gap-3 transition-all animate-in slide-in-from-right-5 ${getBorderColor()}`}
          >
            {getIcon()}
            <div className="flex-1 text-xs">
              {toast.title && <p className="font-bold text-white mb-0.5">{toast.title}</p>}
              <p className="text-slate-300 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
