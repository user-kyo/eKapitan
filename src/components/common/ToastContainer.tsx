import React from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBarangay();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
        };

        const borderStyles = {
          success: 'border-emerald-200 bg-emerald-50/95 text-emerald-950',
          warning: 'border-amber-200 bg-amber-50/95 text-amber-950',
          error: 'border-rose-200 bg-rose-50/95 text-rose-950',
          info: 'border-blue-200 bg-blue-50/95 text-blue-950',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-xs transition-all animate-in fade-in slide-in-from-bottom-3 ${borderStyles[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">{toast.title}</p>
              <p className="text-xs opacity-90 mt-0.5 leading-snug">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
