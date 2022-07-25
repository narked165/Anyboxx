import { default as Controller } from '../../scripts/controller.js'
import { default as loadUtility } from '../../scripts/load-utility.js'
import { default as injectComponentScript } from '../../scripts/inject-component-scripts.js'
import { default as logTransaction } from '../../scripts/log-transaction.js'
import { default as ElementGroup } from '../../scripts/create-element-group.js'

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
  /* logAgent.addEventListener('click', (e) => {
       e.preventDefault()
       utilApp.emit('load-utility', 'log-agent')
   }) */


})


const cServerConfig = Controller('c-server-config', (cServerConfig) => {

})
const serverConfig = Controller('server-config', (serverConfig) => {

})

const cUserManagement = Controller('c-user-management', (cUserManagement) => {

})
const userManagement = Controller('user-management', (userManagement) => {

})

const cServerAdmin = Controller('c-server-admin', (cServerAdmin) => {

})
const serverAdmin = Controller('server-admin', (serverAdmin) => {

})

const cErrorLog = Controller('c-error-log', (cErrorLog) => {

})
const errorLog = Controller('error-log', (errorLog) => {

})

const cKhanRemote = Controller('c-khan-remote', (cKhanRemote) => {

})
const khanRemote = Controller('khan-remote', (khanRemote) => {
   /* cKhanRemote.addEventListener('click', (e) => {
        e.preventDefault()
        utilApp.emit('load-utility', 'khan-remote')
    }) */
})

const cDatabaseToolkit = Controller('c-database-toolkit', (cDatabaseToolkit) => {

})
const databaseToolkit = Controller('database-toolkit', (databaseToolkit) => {

})

const cApiDocs = Controller('c-api-docs', (cApiDocs) => {

})
const apiDocs = Controller('api-docs', (apiDocs) => {

})

const cAccessibilityManager = Controller('c-accessibility-manager', (cAccessibilityManager) => {

})
const accessibilityManager = Controller('accessibility-manager', (accessibilityManager) => {

})

const cAboutCredentialBaron = Controller('c-about-credential-baron', (cAboutCredentialManager) => {

})
const aboutCredentialBaron = Controller('about-credential-baron', (aboutCredentialManager) => {

})

const cNetworkAdministration = Controller('c-network-administration', (cNetworkAdministration) => {

})
const networkAdministration = Controller('network-administration', (networkAdministration) => {

})

const cCBSupport = Controller('c-cb-support', (cCBSupport) => {

})
const cbSupport = Controller('cb-support', (cbSupport) => {

})




const { utilityIcons, utilityLinks } = ElementGroup(({ utilityIcons, utilityLinks }) => {
    utilityIcons.forEach(elm => elm.classList.add('utility-icons'))
    utilityIcons.forEach(elm => elm.classList.add('fa-5x'))
    utilityLinks.forEach(elm => elm.addEventListener('click', (e) => {
        e.preventDefault()
        utilApp.emit('load-utility', elm.dataset.role)
    }))
})