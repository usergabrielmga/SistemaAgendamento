"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  loading?: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  open,
  loading = false,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">

        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 text-gray-500 hover:text-black transition disabled:opacity-50 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="mt-5 text-center text-2xl font-serif font-semibold text-[#1B120D]">
          {title}
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-gray-600">
          {description}
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              border
              border-gray-200
              py-2.5
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              transition
              disabled:opacity-50
              cursor-pointer
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              bg-green-600
              py-2.5
              text-sm
              font-medium
              text-white
              hover:bg-green-700
              transition
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}