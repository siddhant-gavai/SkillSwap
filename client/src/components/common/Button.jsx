import React from 'react';
import { GradientButton } from '@/components/ui/gradient-button';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    // Map primary and secondary variants to GradientButton
    if (variant === 'primary') {
        // Pass className to allow overriding styles (e.g., size, padding)
        return (
            <GradientButton onClick={onClick} type={type} className={className} {...props}>
                {children}
            </GradientButton>
        );
    }
    if (variant === 'secondary') {
        return (
            <GradientButton variant="variant" onClick={onClick} type={type} className={className} {...props}>
                {children}
            </GradientButton>
        );
    }

    // Fallback for other variants (danger, outline) using standard Tailwind classes
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
    };

    const variantClasses = variants[variant] || variants.primary; // default to standard primary style if mapping fails (though primary is handled above)

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
