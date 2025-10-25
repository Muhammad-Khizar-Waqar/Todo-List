import { forwardRef } from "react";

const base =
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

const sizeMap = {
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-9 px-4 py-2",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const variantMap = {
  default: "bg-black text-white shadow hover:bg-black/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
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

export const Button = forwardRef(
  (
    {
      children,
      variant = "default",
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
