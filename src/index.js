import { default as Controller } from './scripts/controller.js'
import { default as TranslateComponent } from './scripts/translate-component.js'
import { default as verifyCredentials } from './scripts/verify-credentials.js'



window.addEventListener('load', () => {
    const translate = TranslateComponent()
    translate.catch(console.error)

    const appTitle = Controller('app-title', appTitle => {

    })

    const appMain = Controller('app-main', appMain => {



    })


    const appBrand = Controller('app-brand', appBrand => {

    })

    const appBrandTitle = Controller('app-brand-title', appBrandTitle => {
        appBrandTitle.icons = {box: "&#128230;"}
        appBrandTitle.innerHTML=`Anyb<span class='box'>${ appBrandTitle.icons.box }</span>x<span class='decX'>x</span>`
    })

    const appPanel = Controller('app-panel', (appPanel) => {

    })

    async function sendCreds() {
        let location = 'http://127.0.0.1:9044/b/verifyCredentials'
        let credentials = {
            "POST_USERNAME": "narked165@gmail.com",
            "POST_PASSWORD": "spork",
            "POST_URL": "http://127.0.0.1.9010",
            "POST_APP_TITLE": "Anyboxx"
        }
        let options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify(credentials)
        }
        try {
            let response = await fetch(location, options)
            if(response.ok) {
                let data = await response.json()
                let { body } = await data
                return body
            }
        }
        catch(e) {
            await Promise.reject(e)
        }
    }

    async function fetchFromCB() {
        try {
            let body = await sendCreds()

            return await body
        }

        catch(e) {
            console.error(e)
        }
    }

    let serverResponse = fetchFromCB()
    serverResponse
        .then(body => console.log(body))
        .catch(console.error)
})