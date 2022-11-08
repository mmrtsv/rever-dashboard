import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
//import LanguageDetector from 'i18next-browser-languagedetector'
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

// debug: true -> for more browser console info in .init()
i18next.use(initReactI18next).use(Backend).init({
    //.use(LanguageDetector)
    lng: 'en',
    //fallbackLng: 'en',
    resources
})

export default i18next
