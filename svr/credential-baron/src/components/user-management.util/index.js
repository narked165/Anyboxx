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

const userAside = Controller('user-aside', (userAside) => {
    
})

const username = Controller('user-name', (username) => {
    
})

const userFirstname = Controller('user-firstname', (userFirstname) => {

})

const userLastname = Controller('user-lastname', (userLastname) => {

})

const userEmail = Controller('user-email', (userEmail) => {

})


const userApps = Controller('user-apps', (userApps) => {

})

const userUrls = Controller('user-urls', (userUrls) => {

})

const userAdmin = Controller('user-admin', (userAdmin) => {

})

const userImage = Controller('user-image', (userImage) => {
    
})