import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    // Base styles: rounded-xl, consistent padding, smooth transition, scale on hover
    const baseStyles = "inline-flex items-center justify-center font-bold px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)]",
        secondary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-[0_4px_15px_rgba(217,70,239,0.3)] hover:shadow-[0_6px_20px_rgba(217,70,239,0.4)]",
        success: "bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-300 hover:to-green-400 text-white shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.4)]",
        outline: "bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm hover:shadow-md",
        danger: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white shadow-[0_4px_15px_rgba(244,63,94,0.3)]"
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
