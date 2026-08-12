import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', loading = false, disabled = false, ...props }) => {
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
            className={`${baseStyles} ${variantClasses} ${loading ? 'opacity-80 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
