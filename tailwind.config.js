/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'deep-emerald': '#1a4d2e',
                'marble-white': '#f8f9fa',
                'ruby-red': '#8b0000',
                'matte-gold': {
                    DEFAULT: '#d4af37',
                    light: '#f4d03f',
                    dark: '#b8941e',
                },
                'turquoise-dark': '#0d7377',
                'charcoal': '#1a1a1a',
            },
            fontFamily: {
                iranyekan: ['IranYekan', 'sans-serif'],
                nastaliq: ['Nastaliq', 'serif'],
            },
            backgroundImage: {
                'gradient-gold': 'linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #b8941e 100%)',
                'gradient-emerald': 'linear-gradient(135deg, #1a4d2e 0%, #2d5a3d 100%)',
                'radial-vignette': 'radial-gradient(circle at center, transparent 0%, rgba(26,26,26,0.8) 100%)',
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E\")",
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
                'shine': 'shine 3s linear infinite',
            },
            keyframes: {
                'pulse-gold': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                'shine': {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                },
            },
        },
    },
    plugins: [],
}
