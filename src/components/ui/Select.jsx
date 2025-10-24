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

export default function Select({
  label,
  description,
  error,
  variant = "white",
  size = "md",
  placeholder = "Select...",
  options = [],
  onValueChange,
  value,
  className,
}) {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          className={cn(
            triggerBase,
            variantClasses[variant],
            hasError ? "ring-1 ring-red-500 border-red-400" : "",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown size={16} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "z-50 mt-1 overflow-hidden rounded-md border shadow-md",
              variantClasses[variant]
            )}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded-md outline-none select-none transition-colors",
                    "data-[highlighted]:bg-slate-100 data-[state=checked]:font-medium"
                  )}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ml-auto">
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {description && (
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      )}

      {hasError && typeof error === "string" && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

/*
Usage example:

import Select from "./Select";

export default function Demo() {
  const [value, setValue] = React.useState("");

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <div className="p-6 grid gap-4 max-w-md">
      <Select
        label="Fruit"
        placeholder="Choose a fruit"
        options={options}
        value={value}
        onValueChange={setValue}
        variant="white"
      />

      <Select
        label="Dark Mode Select"
        options={options}
        value={value}
        onValueChange={setValue}
        variant="black"
      />
    </div>
  );
}
*/
