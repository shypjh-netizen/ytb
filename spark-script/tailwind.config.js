/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#121212',
                surface: '#1E1E1E',
                surfaceHighlight: '#2A2A2A',
                primary: '#FF4D4D',
                primaryHover: '#FF3333',
                textMain: '#FFFFFF',
                textSecondary: '#A0A0A0',
                border: '#333333',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
