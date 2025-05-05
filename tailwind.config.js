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
            sm: ['0.8rem', '1.5rem'],
            base: ['1rem', '1.5rem'],
            lg: ['1.5rem', '2rem'],
            xl: ['2rem', '2.5rem'],
            '2xl': ['2.5rem', '3rem'],
        },

        fontFamily: { roboto: ['Roboto', 'sans-serif'] },

        extend: {
            colors: {
                primary: {
                    DEFAULT: '#5A5DFF',
                    light: '#7C7EFF',
                    dark: '#4346CC',
                },
                secondary: {
                    DEFAULT: '#222222',
                    light: '#4F4F4F',
                    dark: '#111111',
                },
                orange: {
                    DEFAULT: '#FF6A13',
                    light: '#FF8A4D',
                    dark: '#CC5A00',
                },
            },

            keyframes: {
                colorPulse: {
                    '0%': { backgroundColor: '#fff' }, // жёлтый
                    '50%': { backgroundColor: '#efefef' }, // красный
                    '100%': { backgroundColor: '#fff' }, // обратно к жёлтому
                },
            },
            animation: { colorPulse: 'colorPulse 2s ease-in-out infinite' },
        },
    },
}
