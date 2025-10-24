import { forwardRef } from "react";

const base =
  "cursor-pointer  inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizeMap = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  ra: "px-12 py-2 text-sm  tracking-wide",
};

const variantMap = {
  solid:
    "bg-[var(--accent-9)] text-[var(--accent-12)] hover:bg-[var(--accent-10)] active:bg-[var(--accent-11)] ring-2 ring-transparent focus:ring-[var(--focus-8)]",
  ghost:
    "bg-transparent text-[var(--accent-11)] hover:bg-[var(--gray-2)] active:bg-[var(--gray-3)]",
  subtle:
    "bg-[var(--gray-3)] text-[var(--gray-12)] hover:bg-[var(--gray-4)] active:bg-[var(--gray-5)]",
  black:
    "bg-[var(--gray-12)] text-[var(--gray-4)] border hover:bg-[var(--gray-0)] hover:text-[var(--gray-12)] hover:border hover:border-[var(--gray-12)]",
  destructive:
    "bg-[var(--red-8)] text-[var(--red-12)] hover:bg-[var(--red-9)] active:bg-[var(--red-10)] focus:ring-[var(--focus-8)]",
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const Button = forwardRef(
  (
    {
      children,
      variant = "solid",
      size = "md",
      className = "",
      icon,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [base, sizeMap[size], variantMap[variant], className].join(
      " "
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? <Spinner /> : icon}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

/*
Usage examples:

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Button from "./ReusableButton";

export default function App() {
  return (
    <Theme>
      <div className="p-6 space-x-2">
        <Button variant="solid">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </Theme>
  );
}
*/
