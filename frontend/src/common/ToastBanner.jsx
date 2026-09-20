import { X } from "lucide-react";

export default function ToastBanner({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        />

        <p className="text-sm text-gray-800">{toast.message}</p>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}