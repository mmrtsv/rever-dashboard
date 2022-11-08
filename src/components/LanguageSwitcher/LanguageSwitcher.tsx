import {
    Button,
    MenuItem,
    Popover,
    ListItemText,
    Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const languageTitles = { en: 'EN', es: 'ES' }
export const languageLabels = { en: 'English', es: 'Español' }

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const [language, setLanguage] = useState(i18n.language)
    const [menu, setMenu] = useState(null)

    const menuOpen = (event: any) => {
        setMenu(event.currentTarget)
    }
    const menuClose = () => {
        setMenu(null)
    }

    const handleChange = (lang: string) => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
        menuClose()
    }

    return (
        <>
            <Button data-testid="LanguageSwitcher" onClick={menuOpen}>
                <div className="flex items-center">
                    <img
                        className="mx-2"
                        src={`src/assets/images/flags/${language}.svg`}
                    />
                    <Typography
                        fontFamily="Roobert"
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="20px"
                        color="black"
                    >
                        {
                            languageTitles[
                                language as keyof typeof languageTitles
                            ]
                        }
                    </Typography>
                </div>
            </Button>
            <Popover
                data-testid="Popover"
                open={Boolean(menu)}
                onClose={menuClose}
                anchorEl={menu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                {Object.entries(languageLabels).map(([lang, label]) => (
                    <MenuItem key={lang} onClick={() => handleChange(lang)}>
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Popover>
        </>
    )
}

export default LanguageSwitcher
