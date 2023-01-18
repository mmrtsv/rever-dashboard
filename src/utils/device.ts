const size = {
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

const device = {
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`,
    '2xl': `(min-width: '1480px')`
}

export default device
