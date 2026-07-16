import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    // Base styles: rounded-xl, consistent padding, clean transition, no hover scaling
    const baseStyles = "inline-flex items-center justify-center font-bold px-5 py-2.5 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-purple-600 hover:bg-purple-700 text-white",
        success: "bg-emerald-600 hover:bg-emerald-700 text-white",
        outline: "bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
        danger: "bg-red-600 hover:bg-red-700 text-white"
    };

    const variantClasses = variants[variant] || variants.primary;

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
