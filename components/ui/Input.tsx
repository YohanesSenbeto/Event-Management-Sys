// components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
}

const Input: React.FC<InputProps> = ({
    name,
    type,
    placeholder,
    value,
    className,
    ...rest
}) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            className={className ?? "w-full p-2 border border-gray-200"}
            {...rest}
        />
    );
};

export default Input;
