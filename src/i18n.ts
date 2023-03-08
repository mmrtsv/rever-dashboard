import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'

const resources = {
    es: {
        translation: es
    },
    en: {
        translation: en
    }
}

function FindInitialLanguage() {
    const language = navigator.languages.find((lng) => {
        if (lng.substring(0, 2) === 'es' || lng.substring(0, 2) === 'en') {
            return lng
        }
    })
    if (language) {
        return language.substring(0, 2)
    }
    return 'en'
}

i18next.use(initReactI18next).use(Backend).init({
    lng: FindInitialLanguage(),
    resources
})
