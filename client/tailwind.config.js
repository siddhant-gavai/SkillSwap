/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'orb-drift-1': {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                },
                'orb-drift-2': {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(-50px, 30px) scale(1.05)' },
                    '66%': { transform: 'translate(20px, -20px) scale(0.95)' },
                }
            },
            animation: {
                'float-slow': 'float 3s ease-in-out infinite',
                'orb-1': 'orb-drift-1 15s infinite alternate ease-in-out',
                'orb-2': 'orb-drift-2 18s infinite alternate ease-in-out',
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Poppins', 'sans-serif'],
        },
    },
    plugins: [],
}
