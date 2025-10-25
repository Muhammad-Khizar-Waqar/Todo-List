import React from "react";

const base =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
const variantMap = {
  solid:
    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  subtle:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "text-foreground",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
};

export const Badge = ({
  children,
  variant = "solid",
  className = "",
  ...props }) => {

  const classes = [base, variantMap[variant], className].join(" ");

  return <span className={classes} {...props}>{children}</span>;
};

