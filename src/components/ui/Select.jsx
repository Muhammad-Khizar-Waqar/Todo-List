import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

// Simple helper for classNames
const cn = (...parts) => parts.filter(Boolean).join(" ");

const variantClasses = {
  black:
    "bg-black/90 text-white border border-white/10 focus:ring-2 focus:ring-white/20",
  white:
    "bg-white text-slate-900 border border-slate-200 focus:ring-2 focus:ring-slate-300",
};

const triggerBase =
  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm shadow-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 transition-colors";

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      triggerBase,
      variantClasses.white,
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown size={16} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = ({ className = "", children, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        "z-50 mt-1 overflow-hidden rounded-md border shadow-md",
        variantClasses.white,
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectItem = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded-md outline-none select-none transition-colors",
      "data-[highlighted]:bg-slate-100 data-[state=checked]:font-medium",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="ml-auto">
      <Check size={14} />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
