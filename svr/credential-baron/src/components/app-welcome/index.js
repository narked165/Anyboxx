import { default as Controller } from '../../scripts/controller.js'
import { default as getCurrentInterfaces } from '../../scripts/get-current-interfaces.js'
import { default as getCurrentConfig } from '../../scripts/get-current-config.js'
import { default as camelCase } from '../../scripts/camel-case.js'



const icons = {
    exclaim: "<span class='icon-exclaim'>&#10071;</span>",
    error: "<span class='icon-error'>&#10060;</span>",
    ok: "<span class='icon-ok'>&#9989;</span>"
}


const supportDialog = {
    required: `${ icons.exclaim } <span class="required">Required!</span>`
}
// ----------



    const appWelcome = Controller('app-welcome', (appWelcome) => {

    })
    const utilPanel = Controller('util-panel', (utilPanel) => {

        utilPanel.on('error', (e) => oPassIo.emit())
        utilPanel.on('set-active', (user) => {
            appMain.emit('active-panel')
            let outputGroup = Object.values(document.querySelectorAll('output')).filter(m => m.dataset.role.startsWith('o-pass'))
            outputGroup.forEach(m => m.emit('empty-value'))

        })
        appPanel.on('set-inactive', () => {
            utilPanel.emit('inactive-panel')


        })
        utilPanel.on('password-submit', async (POST_DATA) => {
            utilPanel.on('state-request', (value) => {
                POST_DATA.POST_USERNAME = value
            })
            appMain.emit('request-state', {agent: utilPanel, key: 'username'})

            try {
                let data = (POST_DATA.POST_N_P_MATCH)
                    ? appMain.emit('password-submit', POST_DATA)
                    : oPassIo.emit('password-reset', 'Your passwords do not match')
                appPanel.on('password-change-complete', () => {
                    appPanel.emit('set-inactive')
                })

            } catch (e) {
                await Promise.resolve(e)
            }
        })
        appMain.emit('set-inactive')
    })

    const appWelcomeForm = Controller('app-welcome-form', (appWelcomeForm) => {
        //  appWelcomeForm.$state.username = iInfoUName.value

        appWelcomeForm.on('info-update', async (POST_DATA) => {
            POST_DATA.POST_UNAME = appWelcomeForm.$state.username
            appMain.emit('info-update', POST_DATA)
        })
        appWelcomeForm.on('password-change-cancel', () => appMain.emit('set-inactive'))
    })

    const tApptemp = Controller('t-app-temp', (tAppTemp) => {
    })
    const sAppTemp = Controller('s-app-temp', (sAppTemp) => {
    })
//-----------
    const cInfoUName = Controller('c-info-uname', (cInfoUname) => {
    })
    const lInfoUName = Controller('l-info-uname', (lInfoUname) => {
        lInfoUname.innerHTML = 'Username'
    })
    const iInfoUName = Controller('i-info-uname', (iInfoUName) => {
        appWelcomeForm.$state.username = iInfoUName.value
        appMain.emit('user-log-in', iInfoUName.value)
    })

//------------
    const cInfoFName = Controller('c-info-fname', (cInfoFname) => {
    })
    const lInfoFName = Controller('l-info-fname', (lInfoFName) => {
        lInfoFName.innerHTML = 'First Name'
    })
    const iInfoFName = Controller('i-info-fname', (iInfoFName) => {
    })

// ------------
    const cInfoLName = Controller('c-info-lname', (cInfoLName) => {
    })
    const lInfoLName = Controller('l-info-lname', (lInfoLname) => {
        lInfoLname.innerHTML = "Last Name"
    })
    const iInfoLName = Controller('i-info-lname', (iInfoLName) => {
    })

// ------------
    const cInfoPassword = Controller('c-info-password', (cInfoPassword) => {
    })
    const lInfoPassword = Controller('l-info-password', (lInfoPassword) => {
        lInfoPassword.innerHTML = "Password"
    })
    const aInfoPassword = Controller('a-info-password', (aInfoPassword) => {
        aInfoPassword.setAttribute('href', 'javascript:void(0);')

        aInfoPassword.addEventListener('click', (e) => {

            appMain.emit('active-panel')

        })
        aInfoPassword.innerHTML = ' - Click Here To Securely Change Password - '
    }, false)

// -------------
    const cInfoEmail = Controller('c-info-email', (cInfoEmail) => {
    })
    const lInfoEmail = Controller('l-info-email', (lInfoEmail) => {
        lInfoEmail.innerHTML = "Email"
    })
    const iInfoEmail = Controller('i-info-email', (iInfoEmail) => {
    })


// ------------
    const cInfoUpdate = Controller('c-info-update', (cInfoUpdate) => {
    })
    const oInfoUpdate = Controller('o-info-update', (oInfoUpdate) => {
        oInfoUpdate.on('message', (msg) => {
            oInfoUpdate.classList.add('sd_hint')
            oInfoUpdate.innerHTML = msg
        })
    })
    const bInfoUpdate = Controller('b-info-update', (bInfoUpdate) => {
        bInfoUpdate.innerHTML = "Update Info"
        bInfoUpdate.setAttribute('type', 'button')
        bInfoUpdate.addEventListener('mousedown', (e) => {
            e.preventDefault()
            appWelcomeForm.emit('info-update', {
                POST_USERNAME: iInfoUName.value,
                POST_FIRSTNAME: iInfoFName.value,
                POST_LASTNAME: iInfoLName.value,
                POST_EMAIL: iInfoEmail.value
            })
        })
    })


//-----------


    const tPass = Controller('t-pass', (tPass) => {
        tPass.innerHTML = "Change Your Password"
    })

    const sPass = Controller('s-pass', (sPass) => {
        sPass.innerHTML = "It's Probably better this way."
    })

    const cPass = Controller('c-pass', (cPass) => {

    })

    const lPass = Controller('l-pass', (lPass) => {
        lPass.innerHTML = "Type your old password"
    })
    const iPass = Controller('i-pass', (iPass) => {

    })

    const oPass = Controller('o-pass', (oPass) => {
        oPass.on('empty-value', () => {
            oPass.classList.add('sd_hint')
            oPass.innerHTML = supportDialog.required
        })
    })
    const cPassNew = Controller('c-pass-new', (cPassNew) => {

    })

    const lPassNew0 = Controller('l-pass-new-0', (lPassNew0) => {
        lPassNew0.innerHTML = "Type a new Password"
    })

    const oPassNew0 = Controller('o-pass-new-0', (oPassNew0) => {
        oPassNew0.on('empty-value', () => {
            oPassNew0.classList.add('sd_hint')
            oPassNew0.innerHTML = supportDialog.required
        })

    })

    const iPassNew0 = Controller('i-pass-new-0', (iPassNew0) => {

    })

    const oPassNew1 = Controller('o-pass-new-1', (oPassNew1) => {
        oPassNew1.on('empty-value', () => {
            oPassNew1.classList.add('sd_hint')
            oPassNew1.innerHTML = supportDialog.required
        })

    })

    const lPassNew1 = Controller('l-pass-new-1', (lPassNew1) => {
        lPassNew1.innerHTML = "Once more..."
    })

    const iPassNew1 = Controller('i-pass-new-1', (iPassNew1) => {

    })

    const cPassControl = Controller('c-pass-control', (cPassControl) => {

    })

    const oPassIo = Controller('o-pass-io', (oPassIo) => {
        oPassIo.on('error', (e) => {
            oPassIo.classList.add('sd_error')
            oPassIo.innerHTML = `Error: ${e}`
        })
        oPassIo.on('empty-value', () => {
            oPassIo.classList.add('sd_hint')
            oPassIo.innerHTML = "First, we require your old password."
        })

        oPassIo.on('password-reset', (msg) => {
            oPassIo.classList.replace('sd_hint', 'sd_error')
            oPassIo.classList.add('sd_error')
            oPassIo.innerHTML = msg
        })
    })

    const bPassSubmit = Controller('b-pass-submit', (bPassSubmit) => {
        bPassSubmit.innerHTML = "Submit Password"
        bPassSubmit.setAttribute('type', 'button')
        bPassSubmit.addEventListener('mousedown', (e) => {
            e.preventDefault()
            utilPanel.emit('password-submit', ({
                POST_C_PASS: iPass.value,
                POST_N_P_MATCH: Boolean(iPassNew0.value === iPassNew1.value),
                POST_N_PASS: iPassNew0.value
            }))
        })
    })

    const bPassCancel = Controller('b-pass-cancel', (bPassCancel) => {
        bPassCancel.setAttribute('type', 'button')
        bPassCancel.addEventListener('mousedown', (e) => {
            e.preventDefault()
            appMain.emit('set-inactive')
        })

        bPassCancel.innerHTML = "Cancel"
    })
    const bGotoLogin = Controller('b-goto-login', (bGotoLogin) => {
        bGotoLogin.setAttribute('type', 'button')
        bGotoLogin.innerHTML="Goto Login"
        bGotoLogin.addEventListener('mousedown', (e) => {
            e.preventDefault()
            appMain.emit('goto-login', appWelcomeForm.$state.username )
        })


    })

