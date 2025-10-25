import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

const base =
    "flex items-center justify-center w-5 h-5 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-8)] disabled:opacity-50 disabled:cursor-not-allowed";

const variantMap = {
    default:
        "border-[var(--gray-7)] bg-[var(--gray-1)] text-[var(--accent-12)] hover:bg-[var(--gray-2)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)]",
    subtle:
        "border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--accent-12)] hover:bg-[var(--gray-3)] data-[state=checked]:bg-[var(--accent-8)]",
    destructive:
        "border-[var(--red-7)] bg-[var(--red-1)] text-[var(--red-12)] hover:bg-[var(--red-2)] data-[state=checked]:bg-[var(--red-8)]",
};

export const Checkbox = forwardRef(
    ({ variant = "default", className = "", checked, ...props }, ref) => {
        const classes = [base, variantMap[variant], className].join(" ");

        return (
            <CheckboxPrimitive.Root
                ref={ref}
                checked={checked}
                className={classes}
                {...props}
            >
                <CheckboxPrimitive.Indicator className="text-current">
                    <CheckIcon size={16} />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
    }
);

Checkbox.displayName = "Checkbox";