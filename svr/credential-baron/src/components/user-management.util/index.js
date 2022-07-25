import { default as Controller } from '../../scripts/controller.js'
import { default as buildComponent } from '../../scripts/build-component.js'
import { default as InputComponentIncButton } from '../input-component-inc-button/index.js'
import { default as queryUser } from '../../scripts/query-user.js'

const icons = {
    success: '<i class="fa-duotone fa-check fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6; --fa-secondary-color: rgba(55, 255, 55, 1);"></i>',
    failure: '<i class="fa-duotone fa-xmark-large fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6); --fa-secondary-color: rgba(255, 55, 55, 1);"></i>'
}


const userManagementForm = Controller('user-management-form', (userManagementForm) => {
   userManagementForm.on('query-user-submit', async (value) => {
        if(value === '') {
            userManagementForm.emit('feedback-failure', '-Empty-')
            userManagementIo.emit('message', `Username can not be empty`)
            return
        }
        else {
            let result = await queryUser(value)
            result
                ? userManagementForm.emit('feedback-success', value)
                : userManagementForm.emit('feedback-failure', value)
        }
    })

    userManagementForm.on('feedback-success', (value) => {
        oQueryUser.innerHTML=icons.success
        userManagementIo.emit('message', `Success! User: ${ value } was found!`)

    })

    userManagementForm.on('feedback-failure', (value) => {
        oQueryUser.innerHTML=icons.failure
       userManagementIo.emit('message', `Query failed to find User: ${ value }, in the database.`)
    })
})

const utilTitle = Controller('util-title', (utilTitle) => {
    utilTitle.innerHTML="User Management Utility"
})

const cQueryUser = buildComponent('query-user', 'query-user-component', InputComponentIncButton, (cQueryUser) => {

})

const lQueryUser = Controller('l-query-user', (lQueryUser) => {
    lQueryUser.innerHTML="Query User"
})

const iQueryUser = Controller('i-query-user', (iQueryUser) => {

})

const oQueryUser = Controller('o-query-user', (oQueryUser) => {

})

const bQueryUser = Controller('b-query-user', (bQueryUser) => {
    bQueryUser.setAttribute('type', 'button')
    bQueryUser.innerHTML='<i class="fa-duotone fa-arrows-rotate"></i>'
    bQueryUser.classList.add('fa-2x')
    bQueryUser.classList.add('inc-button')
    bQueryUser.addEventListener('click', (e) => {
        e.preventDefault()
        userManagementForm.emit('query-user-submit', iQueryUser.value)
    })

})
const userManagementIo = Controller('user-management-io', (userManagementIo) => {
    userManagementIo.on('message', (m) => userManagementIo.value=m)
})