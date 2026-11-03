import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  isLoading = false,
}) => {
  const getIconAndStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: AlertCircle,
          iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
          btnClass:
            'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
          btnClass:
            'bg-amber-600 hover:bg-amber-700 text-white shadow-sm focus:ring-amber-500',
        };
      case 'success':
        return {
          icon: CheckCircle,
          iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
          btnClass:
            'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500',
        };
      case 'primary':
      default:
        return {
          icon: HelpCircle,
          iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
          btnClass:
            'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-500',
        };
    }
  };

  const { icon: Icon, iconBg, btnClass } = getIconAndStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" showCloseButton={false}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}>
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>

        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-6 leading-relaxed">
          {description}
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition focus:outline-hidden focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 ${btnClass}`}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
