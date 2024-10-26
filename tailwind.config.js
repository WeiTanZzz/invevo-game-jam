/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "cell-current": "inset 0 0 0 2px orange",
                "cell-trigger": "inset 0 0 0 2px yellow",
                "cell-base": "inset 0 0 0 2px rgba(255,255,255,0.1)",
                "cell-available": "inset 0 0 0 2px green",
                "cell-unavailable": "inset 0 0 0 2px red"
            }
        }
    },
    plugins: []
}
