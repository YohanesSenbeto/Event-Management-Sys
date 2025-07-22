"use client";
import clsx from "clsx";
import { ReactNode } from "react";

interface buttonProps {
    type?: "button" | "submit" | "reset";
    text: string | ReactNode;
    onClick?: () => void;
    actionButton?: boolean;
    className?: string; // <-- Add this line
}

const Button = ({
    type,
    text,
    onClick,
    actionButton,
    className,
}: buttonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={clsx(
                actionButton && `bg-orange-700 rounded-full p-2 text-white`,
                `bg-orange-700 px-2 text-white`,
                className // <-- Add this here so you can pass custom classes
            )}
        >
            {text}
        </button>
    );
};

export default Button;
