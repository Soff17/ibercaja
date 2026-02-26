import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input"> & {
	onClear?: () => void;
};

const SearchField = React.forwardRef<HTMLInputElement, Props>(
	({ className, type = "text", value, onChange, onClear, ...props }, ref) => {
		const hasValue = typeof value === "string" && value.length > 0;

		return (
			<div className="relative">
				<div className="absolute top-3 right-4 flex items-center gap-2">
					{hasValue ? (
						<button
							type="button"
							onClick={onClear}
							className="flex text-gray-500 hover:text-gray-500 focus:outline-none"
						>
							<FontAwesomeIcon
								icon={faXmark}
								width={14}
								className="text-primary"
							/>
						</button>
					) : (
						<FontAwesomeIcon
							icon={faSearch}
							className="text-primary"
							width={14}
						/>
					)}
				</div>
				<input
					type={type}
					ref={ref}
					value={value}
					onChange={onChange}
					className={cn(
						"flex h-[46px] outline-none w-full rounded-lg bg-background px-3 pl-4 pr-9 transition-all",
						"file:border-0 file:bg-transparent file:text-sm file:font-medium",
						"file:text-foreground placeholder:text-muted-foreground focus-visible:border-black focus-visible:shadow-[0_0_0_4px_rgba(75,85,99,0.35)]",
						"disabled:cursor-not-allowed md:text-sm",
						className,
					)}
					{...props}
				/>
			</div>
		);
	},
);

SearchField.displayName = "SearchField";
export { SearchField };
