import { default as Controller } from './scripts/controller.js'
import { default as TransformComponents } from './scripts/transform-component.js'


window.addEventListener('load', () => {
    const transform = TransformComponents()
    transform.catch(console.error)

    const docTitle = Controller('doc-title', (docTitle) => {
        docTitle.innerText="Credential Baron"
    })

    const appMain = Controller('app-main', (appMain) => {

    })

    const appBrand = Controller('app-brand', (appBrand) => {

    })

    const appBrandTitle = Controller('app-brand-title', (appBrandTitle) => {
        appBrandTitle.innerHTML="<span class='brand-leading'>Credential</span><span class='rabbit-move'><span class='rabbit-hop'>&#128007;</span></span><span class='top-hat'>&#127913;</span><span class='brand-following'>Baron</spanclass>"

    })
})
