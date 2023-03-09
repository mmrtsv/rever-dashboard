import React, { useState } from 'react'
import { Button, MenuItem, Popover } from '@mui/material'
import EN from '@/assets/images/languages/EN.svg'
import ES from '@/assets/images/languages/ES.svg'
import { useTranslation } from 'react-i18next'

export const languageTitles = { en: 'EN', es: 'ES' }
export const languageLabels = { en: 'English', es: 'Español' }

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const [language, setLanguage] = useState(i18n.language)
    const [menu, setMenu] = useState<HTMLElement | null>(null)

    const handleChange = (lang: string) => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
        setMenu(null)
    }

    return (
        <>
            <Button
                data-testid="LanguageSwitcher"
                onClick={(e) => setMenu(e.currentTarget)}
            >
                <div className="flex items-center">
                    <img className="mr-2" src={language === 'en' ? EN : ES} />
                    <h6 style={{ color: 'black' }}>
                        {
                            languageTitles[
                                language as keyof typeof languageTitles
                            ]
                        }
                    </h6>
                </div>
            </Button>
            <Popover
                data-testid="Popover"
                open={Boolean(menu)}
                onClose={() => setMenu(null)}
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
                        <h6>{label}</h6>
                    </MenuItem>
                ))}
            </Popover>
        </>
    )
}

export default LanguageSwitcher
