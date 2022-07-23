import { default as Controller } from '../../scripts/controller.js'
import { default as loadUtility } from '../../scripts/load-utility.js'
import { default as injectComponentScript } from '../../scripts/inject-component-scripts.js'
import { default as logTransaction } from '../../scripts/log-transaction.js'


const utilApp = Controller('util-app', (utilApp) => {
    utilApp.on('load-utility', async (app) => {
       let comp = `${ app }.util`

        try {
            let util = await loadUtility(app)
            appUtilityPanel.innerHTML= await util
            await injectComponentScript(comp)
            appMain.emit('util-loaded')
        }

        catch(e) {
            await Promise.reject(e)
        }
    })

})

const cLogAgent = Controller('c-log-agent', (cLogAgent) => {

})

const logAgent = Controller('log-agent', (logAgent) => {
   /*logAgent.addEventListener('click', (e) => {
       e.preventDefault()
       utilApp.emit('load-utility', 'log-agent')
   })*/


})


const cServerConfig = Controller('c-server-config', (cServerConfig) => {

})

const cUserManagement = Controller('c-user-management', (cUserManagement) => {

})

const cServerAdmin = Controller('c-server-admin', (cServerAdmin) => {

})

const cErrorLog = Controller('c-error-log', (cErrorLog) => {

})

const cKhanRemote = Controller('c-khan-remote', (cKhanRemote) => {

})

const khanRemote = Controller('khan-remote', (khanRemote) => {
   /* cKhanRemote.addEventListener('click', (e) => {
        e.preventDefault()
        utilApp.emit('load-utility', 'khan-remote')
    })*/
})
const cDatabaseToolkit = Controller('c-database-toolkit', (cDatabaseToolkit) => {

})

const cApiDocs = Controller('c-api-docs', (cApiDocs) => {

})

const cAccessibilityManager = Controller('c-accessibility-manager', (cAccessibilityManager) => {

})

const cAboutCredentialBaron = Controller('c-about-credential-baron', (cAboutCredentialManager) => {

})

const cNetworkAdministration = Controller('c-network-administration', (cNetworkAdministration) => {

})

const cCBSupport = Controller('c-cb-support', (cCBSupport) => {

})

let _utilityIcons = document.querySelectorAll('[data-element-group="utility-icons"]')
const utilityIcons = []
for (let elm of Object.values(_utilityIcons)) {
    utilityIcons.push(elm)
}
utilityIcons.forEach(elm => elm.classList.add('utility-icons'))
utilityIcons.forEach(elm => elm.classList.add('fa-5x'))
utilityIcons.forEach(elm => elm.addEventListener('click', (e) => {
    e.preventDefault()
    utilApp.emit('load-utility', e.dataset.role)
}))


