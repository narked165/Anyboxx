import { default as Controller } from './scripts/controller.js'
import { default as TransformComponents } from './scripts/transform-component.js'
import { default as TransformEvent } from './scripts/transform-event.js'
import { default as verifyCredentials } from './scripts/verify-credentials.js'
import { default as updateInfo } from './scripts/update-info.js'
import transformTemplate from './scripts/TransformTemlplate.js'
import { default as componentTemplateTransform } from '../../scripts/component-template-transform.js'
import { default as updatePassword } from './scripts/update-password.js'
import { default as serverUtilities } from './scripts/server-utilities.js'
import { default as secureRequest } from '../../scripts/secure-request.js'


window.addEventListener('load', () => {

    const controllers = TransformComponents('app-login')
    controllers.catch(console.error)

    const docTitle = Controller('doc-title', (docTitle) => {
        docTitle.innerText="Credential Baron"
    })

    const appMain = Controller('app-main', (appMain) => {

        appMain.on('goto-login', async (username) => {
            await TransformEvent({ app0: appWelcome, app1: 'app-login', username })
        })
        appMain.on('active-panel', () => {
            utilPanel.classList.add('active-panel')
        })
        appMain.on('set-inactive', () => {
            utilPanel.classList.remove('active-panel')
        })
        appMain.on('password-submit', async (POST_DATA) => {
            try {
                let result = await updatePassword(POST_DATA)
                    appMain.emit('password-complete')
            }
            catch(e) {
              console.error(e)
            }

        })

            appMain.on('request-state', ({agent, key}) => {
                if(appMain.$state[key]) {
                    agent.emit('state-request', appMain.$state[key])
                }
                else {
                    agent.emit('error', `No existing key in state: ${ key }.`)
                }
            })
            appMain.on('verify-credentials', async (options) => {
                let verify = await verifyCredentials(options)

                if (verify.authenticated) {
                    appMain.$state.username=verify.username

                    await componentTemplateTransform({ appHost: appLogin, app: 'app-welcome', username: verify.username  })

                }
                else {
                    let e = { description: 'Your credentials were incorrect, please try again.'}
                    appLogin.emit('error', e)
                }
            })
            appMain.on('password-complete', () => {
                oInfoUpdate.emit('message', 'Your password has been updated, successfully.')
                utilPanel.classList.remove('active-panel')
                return appWelcomeForm.emit('password-updated')
            })
            appMain.on('password-error', (err) => {
                oInfoUpdate.emit('message', 'An unknown server excepion occured.')
                utilPanel.classList.remove('active-panel')
                return appWelcomeForm.emit('password-updated')
            })
        appMain.on('info-update', async (POST_DATA) => {
            try {
                let body = await updateInfo(POST_DATA)
            }
            catch(e) {
                await Promise.reject(e)
            }
        })
        appMain.on('user-log-in', (username) => {
            appWidget.emit('main-login')
        })
        appMain.on('widget-active', async () => {
            let serverUtils = await serverUtilities({ username: appMain.$state.username })
            appUtil.$state.username = appMain.$state.username
            appUtil.innerHTML = serverUtils

        })
        appMain.on('util-loaded', () => {
            appUtilityPanel.emit('activate-utility-panel')
            appWidget.emit('toggle-widget')


        })
        appMain.on('deactivate-utility', () => {
            appUtilityPanel.innerHTML=''
            appUtilityPanel.emit('deactivate-utility-panel')
        })
        appMain.on('require-credentials', (app) => {
            appMain.$state.secureApp = app
            nope.classList.add('admin-lock')
            authReq.classList.add('admin-credentials')

        })
        appMain.on('admin-authentication', async (POST_USER) => {
            try {
                console.log(appMain.$state.secureApp)
                let response = await secureRequest(appMain.$state.secureApp, POST_USER)
                nope.classList.remove('admin-lock')
                authReq.classList.remove('admin-credentials')
                databaseToolkitIo.value = response.status
            } catch (e) {
                await Promise.reject(e)
            }
        })


    })
    const appWidget = Controller('app-widget', (appWidget) => {
        appWidget.innerHTML='<i class="fa-solid fa-bars"></i>'
        appWidget.setAttribute('href', 'javascript:void(0);')
        appWidget.on('toggle-widget', () => {
            if (appWidget.classList.contains('fire-button')) {
                appWidget.classList.remove('fire-button')
                if (appUtil.classList.contains('pop-in')) {
                    appUtil.classList.replace('pop-in', 'pop-out')
                }
                else  {
                    appUtil.classList.add('pop-out')
                }

            }

            else {
                appWidget.classList.add('fire-button')
                if (appUtil.classList.contains('pop-out')) {
                    appUtil.classList.replace('pop-out', 'pop-in')
                }
                else  {
                    appUtil.classList.add('pop-in')
                }
            }
        })

        appWidget.addEventListener('click', (e) => {
            e.preventDefault()
            appWidget.emit('toggle-widget')
        })
        appWidget.on('main-login', () => {
            appWidget.classList.add('widget-active')
            appMain.emit('widget-active')
        })
    })
    const appBrand = Controller('app-brand', (appBrand) => {

    })

    const appBrandTitle = Controller('app-brand-title', (appBrandTitle) => {
        appBrandTitle.innerHTML=`<span class='brand-leading'>Credential</span>
                                    <span class="rabbit-hop"><img class='rabbit-move' src='/media/bunny.png' alt='bunny' /></span>
                                    <span class='top-hat'>&#127913;</span>
                                    <span class='brand-following'>Baron</span>`

    })
    const appUtilityPanel = Controller('app-utility-panel', (appUtilityPanel) => {
        appUtilityPanel.on('activate-utility-panel', () => {
            appUtilityPanel.classList.add('active-utility-panel')
        })
        appUtilityPanel.on('deactivate-utility-panel', () => {
            appUtilityPanel.classList.remove('active-utility-panel')
        })
    })
    const appUtil = Controller('app-util', (appUtil) => {

    })

    const appPanel = Controller('app-panel', (appPanel) => {

    })

    const nope = Controller('nope', (nope) => {

    }, 'auth-nope')
    const authReq = Controller('auth-req', (authReq) => {

    })

    const authTitle = Controller('auth-title', (authTitle) => {
        authTitle.innerHTML='<i class="icon fa-duotone fa-square-a-lock fa-2x"></i><span>Administrator Secure Login</span>'
    })

    const authUsername = Controller('auth-username', (authUsername) => {
        authUsername.setAttribute('placeholder', 'Username')
    })

    const authPassword = Controller('auth-password', (authPassword) => {
        authPassword.setAttribute('placeholder', 'Password')
        authPassword.setAttribute('type', 'password')
    })
    const authOut = Controller('auth-out', (authOut) => {
        authOut.on('message', (m) => { authOut.firstElementChild.innerHTML+=`<li>${ m }</li>` })
        authOut.emit('message', `You must authenticate with administrator credentials to use this feature!`)
    })
    const authSubmitVerify = Controller('auth-submit-verify', (authSubmitVerify) => {
        authSubmitVerify.innerHTML = 'Authenticate!'
        authSubmitVerify.setAttribute('type', 'button')
        authSubmitVerify.addEventListener('mouseup', (e) => {
            e.preventDefault()
            appMain.emit('admin-authentication', {
                POST_USERNAME: authUsername.value,
                POST_PASSWORD: authPassword.value
            })
        })
    })

    const uLbl = Controller('u-lbl', (uLbl) => {
        uLbl.innerHTML='Username'
    })
    const pLbl = Controller('p-lbl', (pLbl) => {
        pLbl.innerHTML='Password'
    })
    const uOut = Controller('u-out', (uOut) => {
        uOut.value='* Required!'
    })
    const pOut = Controller('p-out', (pOut) => {
        pOut.value='* Required!'
    })

    const bAuthExit = Controller('b-auth-exit', (bAuthExit) => {
        bAuthExit.innerHTML='Exit Authentication'
    })

})
