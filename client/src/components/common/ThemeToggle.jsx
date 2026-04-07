import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 transition-colors duration-300 hover:bg-[#1A1A1A] active:scale-95 border border-transparent hover:border-[#3A3A3A] focus:outline-none flex items-center justify-center text-[#A0A0A0] hover:text-white"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform duration-500 rotate-0 scale-100" />
            ) : (
                <Moon className="h-5 w-5 transition-transform duration-500 rotate-0 scale-100" />
            )}
        </button>
    );
};

export default ThemeToggle;
