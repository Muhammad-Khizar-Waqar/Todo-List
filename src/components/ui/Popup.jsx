import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const cn = (...parts) => parts.filter(Boolean).join(" ");

const variantClasses = {
  black: "bg-black/90 text-white border border-white/10",
  white: "bg-white text-slate-900 border border-slate-200",
};

export default function Popup({
  triggerLabel = "Open Popup",
  title = "Dialog Title",
  description = "",
  children,
  variant = "white",
  size = "md",
  className,
}) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "rounded-md px-4 py-2 font-medium shadow-sm",
            variant === "black"
              ? "bg-black text-white hover:bg-black/80"
              : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
          )}
        >
          {triggerLabel}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fadeIn" />

        {/* Content */}
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg focus:outline-none p-6",
            variantClasses[variant],
            sizeClasses[size],
            "data-[state=open]:animate-zoomIn",
            className
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button
                className="rounded-md p-1 opacity-70 hover:opacity-100 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-sm text-slate-500 mb-4">
              {description}
            </Dialog.Description>
          )}

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/*
💡 Usage Example:

import Popup from "./Popup";
import Input from "./Input";

export default function DemoPopup() {
  return (
    <div className="p-6">
      <Popup
        triggerLabel="Open Form"
        title="Subscribe to Newsletter"
        description="Stay updated with our latest news."
        variant="white"
      >
        <form className="grid gap-3">
          <Input label="Email" placeholder="you@example.com" />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </Popup>

      <Popup
        triggerLabel="Dark Popup"
        title="Dark Mode Popup"
        variant="black"
        size="lg"
      >
        <p>This is a dark-themed popup using Radix UI + Tailwind.</p>
      </Popup>
    </div>
  );
}
*/
