// components/ui/Form.tsx
"use client";
import { useRef, ReactNode, useState } from "react";

interface FormProps {
    children: ReactNode;
    action: (formData: FormData) => Promise<void>;
    className?: string;
    onSubmit?: () => void;
}

const Form = ({ children, action, className, onSubmit }: FormProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(ref.current!);

        try {
            await action(formData);
            ref.current?.reset();
            if (onSubmit) {
                onSubmit();
            }
            setError(null);
        } catch (e) {
            setError("An error occurred while processing your request.");
            console.error("Form submission error:", e);
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit} ref={ref}>
            {children}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default Form;
