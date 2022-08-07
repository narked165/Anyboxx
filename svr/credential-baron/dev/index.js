
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
    authOut.on('message', (m) => { authOut.firstElementChild.innerHTML+="<li>" + m +"</li>" })
    authOut.emit('message', `You must authenticate with administrator credentials to use this feature!`)
})
const authSubmitVerify = Controller('auth-submit-verify', (authSubmitVerify) => {
    authSubmitVerify.innerHTML='Authenticate!'
    authSubmitVerify.setAttribute('type', 'button')
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


