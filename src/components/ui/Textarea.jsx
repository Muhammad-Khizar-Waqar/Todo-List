import { forwardRef } from "react";

const base =
  "w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-8)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[var(--gray-9)]";

const variantMap = {
  default:
    "bg-[var(--gray-1)] border-[var(--gray-7)] text-[var(--gray-12)] focus:border-[var(--accent-9)]",
  subtle:
    "bg-[var(--gray-2)] border-[var(--gray-4)] text-[var(--gray-12)] hover:bg-[var(--gray-3)] focus:border-[var(--accent-8)]",
  destructive:
    "bg-[var(--red-1)] border-[var(--red-7)] text-[var(--red-12)] focus:border-[var(--red-8)]",
};

const sizeMap = {
  sm: "p-2 text-sm",
  md: "p-3 text-sm",
  lg: "p-4 text-base",
};

export const Textarea = forwardRef(
  (
    {
      variant = "default",
      size = "md",
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const classes = [base, variantMap[variant], sizeMap[size], className].join(
      " "
    );

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={classes}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";