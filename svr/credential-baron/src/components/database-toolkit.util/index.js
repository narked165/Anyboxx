import { default as Controller } from '../../scripts/controller.js'
import { default as buildComponent } from '../../scripts/build-component.js'
import { default as ViewComponent } from '../components/view-component/index.js'
import { default as queryUser } from '../../scripts/query-user.js'
import { default as dbViewEngine } from '../../scripts/database-view-engine.js'
import { default as ElementGroup } from '../../scripts/create-element-group.js'
const icons = {
    success: '<i class="fa-duotone fa-check fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6); --fa-secondary-color: rgba(55, 255, 55, 1);"></i>',
    failure: '<i class="fa-duotone fa-xmark-large fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6); --fa-secondary-color: rgba(255, 55, 55, 1);"></i>'
}

const dbTkForm = Controller('database-toolkit-form', (dbTkForm) => {
        dbTkForm.on('show-table', () => {
            dataTable.emit('show-table')
        })

        

})

const utilTitle = Controller('util-title', (utilTitle) => {
    utilTitle.innerHTML="Database Toolkit Utility"
})


const dbView = buildComponent('database-view', 'database-view-component',{ title: 'Database Viewer'}, ViewComponent, (cQueryUser) => {

})

const oDbView = Controller('o-database-view', (oDbView) => {

})

const titleHead = Controller('title-head', (titleHead) => {
    
})

const  tDbView= Controller('t-database-view', (tDbView) => {

})

const viewControl = Controller('view-control', (viewControl) => {
    
})

const dataTable = Controller('data-table',  (dataTable) => {

        dataTable.classList.add('show-data-table')


})

const dataTitle = Controller('data-title', (dataTitle) => {
    dataTitle.innerHTML="Database Users"
    
})

const dataList = Controller('data-list', (dataList) => {
    
    
})


const dKIo = Controller('database-toolkit-io', (dKIo) => {
    dKIo.on('message', (m) => dKIo.value=m)
})

let init = dbViewEngine({ dataList, oDbView })
init

    .catch(console.error)



