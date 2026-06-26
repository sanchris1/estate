import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  onclick?: () => void;
};

const Button = ({
  variant = "primary",
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled,
  onclick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      disabled={loading || disabled}
      className={clsx(
        `   
        inline-flex items-center justify-center gap-2 h-13 px-6 rounded-2xl font-semibold
        transition-all duration-300 cursor-pointer
        `,
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "border border-black/10 text-text hover:border-primary hover:text-primary":
            variant === "outline",
          className,
          "w-full": fullWidth,
          "opacity-70 cursor-not-allowed": loading || disabled,
          props,
        },
      )}
    >
      {loading ? (
        <>
          <div className="size-4 border-current border-t-transparent border-2  rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition == "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition == "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
