import mixpanel from 'mixpanel-browser'

mixpanel.init('238407a6ca3c61839a67bb3c376364a4')

const development = import.meta.env.VITE_DEVELOPMENT

const actions = {
    track: (name: string, props?: any) => {
        if (!development) {
            mixpanel.track(name, props)
        }
    },
    identify: (id: any) => {
        if (!development) mixpanel.identify(id)
        // mixpanel.identify(id)
    },
    people: (props: any) => {
        if (!development) mixpanel.people.set(props)
        // mixpanel.people.set(props)
    }
}

const Mixpanel = actions

export default Mixpanel
