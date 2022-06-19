import { default as Controller } from './scripts/controller.js'
import { default as TranslateComponent } from './scripts/translate-component.js'

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
})