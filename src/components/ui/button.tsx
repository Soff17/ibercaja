import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				primary:
					"bg-primary border-primary text-white focus-visible:bg-white focus-visible:outline-offset-2 focus-visible:outline-secondary hover:bg-primary-700 hover:border hover:border-primary-700 hover:text-white disabled:bg-disabled active:bg-secondary-800",
				secondary:
					"border border-primary text-primary bg-white focus-visible:outline-secondary hover:bg-primary hover:border hover:border-primary-700 hover:text-white disabled:border-disabled disabled:text-disabled",
				danger:
					"bg-danger text-danger-foreground focus-visible:bg-danger focus-visible:outline-offset-2 focus-visible:outline-danger hover:bg-danger-800 disabled:bg-disabled active:bg-danger-800",
				"danger-outline":
					"border border-red-600 text-red-600 bg-white hover:bg-red-700 hover:text-white hover:border-red-700 focus-visible:outline-none focus-visible:border-2 focus-visible:text-red-800 focus-visible:border-red-800 active:bg-red-50 active:border-red-800 disabled:border-disabled disabled:text-disabled",
				"success-outline":
					"border border-green-800 text-green-800 bg-white hover:bg-green-800 hover:text-white hover:border-green-800 focus-visible:outline-none focus-visible:border-2 focus-visible:text-green-800 focus-visible:border-green-800 active:bg-green-50 active:border-green-800 disabled:border-disabled disabled:text-disabled",
				ghost:
					"text-primary hover:bg-secondary-200 hover:text-primary-700 disabled:text-disabled",
				outline:
					"border border-primary text-primary hover:bg-primary-700 hover:text-white disabled:border-disabled disabled:text-disabled",
				text: "border-none text-primary hover:text-secondary focus:outline-none focus-visible:text-secondary focus-visible:outline-none disabled:text-disabled",
				"text-danger": "",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-lg px-3",
				lg: "h-11 rounded-lg px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	startIcon?: React.ReactNode;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			disabled,
			loading,
			startIcon,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={disabled || loading}
				ref={ref}
				{...props}
			>
				{startIcon && <span>{startIcon}</span>}
				{props.children}
				{loading && (
					<FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" />
				)}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
