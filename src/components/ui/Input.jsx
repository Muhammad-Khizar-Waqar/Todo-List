import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

// Simple classnames helper
const cn = (...parts) => parts.filter(Boolean).join(" ");

const sizeClasses = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-3 text-base",
  lg: "py-3 px-4 text-lg",
};

const variantClasses = {
  black:
    "bg-black/90 text-white placeholder-white/50 border border-white/10 focus-visible:ring-2 focus-visible:ring-white/20",
  white:
    "bg-white text-slate-900 placeholder-slate-400 border border-slate-200 focus-visible:ring-2 focus-visible:ring-slate-300",
};

const baseInputClasses =
  "flex items-center gap-2 rounded-md shadow-sm transition-colors duration-150 outline-none disabled:opacity-60 disabled:cursor-not-allowed";

const Input = forwardRef((props, ref) => {
  const {
    label,
    description,
    error,
    variant = "white",
    size = "md",
    icon,
    className,
    placeholder,
    ...rest
  } = props;

  const hasError = Boolean(error);

  return (
    <div className="w-full">
      {label && (
        <LabelPrimitive.Root className="block text-sm font-medium mb-1">
          {label}
        </LabelPrimitive.Root>
      )}

      <div
        className={cn(
          baseInputClasses,
          sizeClasses[size],
          variantClasses[variant],
          hasError ? "ring-1 ring-red-500 border-red-400" : "",
          className
        )}
      >
        {icon ? <Slot className="flex-none opacity-90">{icon}</Slot> : null}

        <input
          ref={ref}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={description ? `${label}-desc` : undefined}
          className="flex-1 bg-transparent border-0 outline-none placeholder:opacity-70"
          {...rest}
        />
      </div>

      {description && (
        <p id={`${label}-desc`} className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      )}

      {hasError && typeof error === "string" && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

/*
Usage example:

import { FiSearch } from "react-icons/fi";
import Input from "./Input";

export default function Demo() {
  return (
    <div className="p-6 grid gap-4 max-w-md">
      <Input label="Name" placeholder="Enter your name" />

      <Input
        label="Email"
        placeholder="you@company.com"
        variant="white"
        size="lg"
        description="We'll never share your email."
      />

      <Input
        label="Search"
        placeholder="Search..."
        icon={<FiSearch />}
        variant="black"
        size="md"
      />

      <Input
        label="Disabled"
        placeholder="Can't touch this"
        disabled
        variant="black"
      />
    </div>
  );
}
*/
