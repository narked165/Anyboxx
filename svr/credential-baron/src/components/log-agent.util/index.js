import { default as Controller } from '../../scripts/controller.js'
import { default as logTransaction } from '../../scripts/log-transaction.js'

const logAgentUtil = Controller('log-agent-util', (logAgentUtil) => {

})

const logAgentTitle = Controller('log-agent-title', (logAgentTitle) => {
    logAgentTitle.innerHTML="Logging Utility"
})
const logAgentOutput = Controller('log-agent-output', async (logAgentOutput) => {


})

const cLogAgentNav = Controller('c-log-agent-nav', (cLogAgentNav) => {

})

const refreshLogs = Controller('refresh-logs', (refreshLogs) => {
    refreshLogs.innerHTML='Refresh'

    refreshLogs.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          let logs = await logTransaction({ logAgentOutput })



        }

        catch(e) {
            console.error(e)
        }
    })
})

const mainMenu = Controller('main-menu', (mainMenu) => {
    mainMenu.innerHTML="Main-Menu"
    mainMenu.addEventListener('click', (e) => {
        e.preventDefault()
        appMain.emit('deactivate-utility')

    })
})