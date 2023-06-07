const Sizes = {
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

export const moreThan = {
    sm: `(min-width: ${Sizes.sm})`,
    md: `(min-width: ${Sizes.md})`,
    lg: `(min-width: ${Sizes.lg})`,
    xl: `(min-width: ${Sizes.xl})`,
    '2xl': `(min-width: ${Sizes['2xl']})`
}

export const lessThan = {
    sm: `(max-width: 374px)`,
    md: `(max-width: 599px)`,
    lg: `(max-width: 899px)`,
    xl: `(max-width: 1199px)`,
    '2xl': `(max-width: 1479px))`
}
