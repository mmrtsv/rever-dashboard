/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                common: {
                    white: '#ffffff',
                    black: '#000000'
                },
                primary: {
                    main: '#1b75eb',
                    light: '#63a2f4',
                    dark: '#0148a5',
                    contrastText: '#ffffff'
                },
                secondary: {
                    main: '#10fab8',
                    light: '#a6fce4',
                    dark: '#02dd9f',
                    contrastText: '#000'
                },
                success: {
                    main: '#00b0a6',
                    light: '#e6f7f6',
                    dark: '#00716a',
                    contrastText: '#ffffff'
                },
                error: {
                    main: '#ff5962',
                    light: '#feeeef',
                    dark: '#c3373f',
                    contrastText: '#ffffff'
                },
                grey: {
                    1: '#808080',
                    2: '#999999',
                    3: '#B3B3B3',
                    4: '#CCCCCC',
                    5: '#E5E5E5',
                    6: '#F2F2F2'
                }
            },
            screens: {
                sm: '375px',
                // => @media (min-width: 375px) { ... }

                md: '600px',
                // => @media (min-width: 600px) { ... }

                lg: '900px',
                // => @media (min-width: 900px) { ... }

                xl: '1200px',
                // => @media (min-width: 1200px) { ... }

                '2xl': '1480px'
                // => @media (min-width: 1480px) { ... }
            }
        }
    },
    plugins: []
}
