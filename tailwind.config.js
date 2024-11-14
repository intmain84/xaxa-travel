/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        spacing: {
            1: '2px',
            2: '4px',
            3: '8px',
            4: '16px',
            5: '24px',
            6: '32px',
            7: '40px',
            8: '48px',
            9: '56px',
            10: '64px',
            11: '72px',
            12: '80px',
            13: '88px',
            14: '96px',
            15: '104px',
        },

        borderRadius: {
            none: '0',
            xsm: '.125rem',
            sm: '.25rem',
            DEFAULT: '.5rem',
            lg: '1rem',
            xl: '1.5rem',
            '2xl': '2rem',
            full: '9999px',
        },

        fontSize: {
            base: ['1rem', '1.5rem'],
            lg: ['1.5rem', '2rem'],
            xl: ['2rem', '2.5rem'],
            '2xl': ['2.5rem', '3rem'],
        },

        fontFamily: {
            funnel: ['Funnel', 'sans-serif'],
        },

        extend: {
            colors: {
                'dark-green': '#0A4C38',
                'light-green': '#0D5D45',
                'lighter-green': '#47CB88',
                'toxic-green': '#D1EFBA',
                'light-blue': '#EAF3F5',
                'light-sky': '#66A6FD',
                'dark-sky': '#4583D6',
                'light-red': '#FF5356',
            },
        },
    },
    plugins: [],
}
