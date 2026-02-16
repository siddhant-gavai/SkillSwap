import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 
                    bg-white dark:bg-slate-800 
                    text-gray-900 dark:text-white
                    border-gray-300 dark:border-slate-600 
                    placeholder-gray-400 dark:placeholder-gray-500
                    ${error ? 'border-red-500' : ''}
                `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export default Input;
