import { default as Controller } from '../../scripts/controller.js'
const icons = {
    exclaim: "<span class='icon-exclaim'>&#10071;</span>",
    error: "<span class='icon-error'>&#10060;</span>",
    ok: "<span class='icon-ok'>&#9989;</span>"
}

const supportDialog = {
    required: `${ icons.exclaim } <span class="required">Required!</span>`
}
const appLogin = Controller('app-login', appLogin => {
    appLogin.setAttribute('formmethod', 'post')
    appLogin.setAttribute('action', '/a/verifyUser')
})

const tLoginTitle = Controller('t-login-title', tLoginTitle => {
    tLoginTitle.innerHTML="Login To Anyboxx"
})
const cLoginUsername = Controller('c-login-username', cLoginUsername => {

})

const lLoginUsername = Controller('l-login-username', lLoginUsername => {
    lLoginUsername.innerHTML = "Email Address"
})

const iLoginUsername = Controller('i-login-username', iLoginUsername => {
    iLoginUsername.setAttribute('placeholder', 'email address')
    iLoginUsername.setAttribute('type', 'email')
})

const oLoginUsername = Controller('o-login-username', oLoginUsername => {
    oLoginUsername.on('empty-field', () => {
        oLoginUsername.innerHTML=supportDialog.required

    })
})

const cLoginPassword = Controller('c-login-password', cLoginPassword => {

})

const lLoginPassword = Controller('l-login-password', lLoginPassword => {
    lLoginPassword.innerHTML="Password"
})

const iLoginPassword = Controller('i-login-password', iLoginPassword => {
    iLoginPassword.setAttribute('placeholder', 'Enter your Anyboxx password')
    iLoginPassword.setAttribute('type', 'password')
})

const oLoginPassword = Controller('o-login-password', oLoginPassword => {
    oLoginPassword.on('empty-field', () => {
        oLoginPassword.innerHTML=supportDialog.required
    })
})

const cLoginControl = Controller('c-login-control', cLoginControl => {

})

const bLoginSubmit = Controller('b-login-submit', bLoginSubmit => {
    bLoginSubmit.innerHTML="Log in"
    bLoginSubmit.setAttribute('type', 'submit')

})

const bLoginClear = Controller('b-login-clear', bLoginClear => {
    bLoginClear.innerHTML="Clear Form"
    bLoginClear.setAttribute('type', 'reset')
})

const cLoginSupport = Controller('c-login-support', cLoginSupport => {

})

const aLoginNewAccount = Controller('a-login-new-account', aLoginNewAccount => {
    aLoginNewAccount.setAttribute('href', '#createAccount')
    aLoginNewAccount.innerHTML= "Create a new account"
})

const aLoginForgot = Controller('a-login-forgot', aLoginForgot => {
    aLoginForgot.setAttribute('href', '#forgotLoginInfo')
    aLoginForgot.innerHTML= "Forgot login credentials"
})

oLoginPassword.emit('empty-field')
oLoginUsername.emit('empty-field')