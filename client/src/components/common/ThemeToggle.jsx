import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
// import Button from './Button'; // Using a simple button for icon only to avoid style conflicts

// Using the common Button component for now, or a simple div if button styles conflict
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-500 hover:rotate-90" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 transition-transform duration-500 hover:-rotate-12" />
            )}
        </button>
    );
};

export default ThemeToggle;
