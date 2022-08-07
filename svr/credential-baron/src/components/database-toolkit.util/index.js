import { default as Controller } from '../../scripts/controller.js'
import { default as buildComponent } from '../../scripts/build-component.js'
import { default as ViewComponent } from '../components/view-component/index.js'
import { default as queryUser } from '../../scripts/query-user.js'
import { default as dbViewEngine } from '../../scripts/database-view-engine.js'
import { default as ElementGroup } from '../../scripts/create-element-group.js'
import { default as tableView } from '../../scripts/table-view.js'
import { default as camelCase } from '../../scripts/camel-case.js'
import { default as ClassController } from '../../scripts/class-controller.js'
import { default as purgeDatabase } from '../../scripts/purge-database.js'


const icons = {
    success: '<i class="fa-duotone fa-check fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6); --fa-secondary-color: rgba(55, 255, 55, 1);"></i>',
    failure: '<i class="fa-duotone fa-xmark-large fa-5x" style="--fa-primary-color: rgba(55, 55, 55, .6); --fa-secondary-color: rgba(255, 55, 55, 1);"></i>'
}

const dbTkForm = Controller('database-toolkit-form', (dbTkForm) => {


})


dbTkForm.on('message', (m) => databaseToolkitIo.emit('start-message'))







const grid = {
    gridRole: 'task-grid',
    gridTitle: 'Database Tools',
    buttons: {
        b0: {
            role: 'b-exit',
            label: 'exit viewer',
            icon: 'square-xmark',
            size: 1,
            p_color: 'rgba(255,55,55,1)',
            s_color: 'rgba(255, 255, 55, 1)',
            b_class: 'grid-button'
        },
        b1: {
            role: 'b-purge',
            label: 'purge database',
            icon: 'empty-set',
            size: 1,
            p_color: 'rgba(55, 55, 255,1)',
            s_color: 'rgba(255, 255, 55, 1)',
            b_class: 'grid-button'
        },
        b2: {
            role: 'b-reload',
            label: 'reload database',
            icon: 'arrows-rotate',
            size: 1,
            p_color: 'rgba(55, 55, 255,1)',
            s_color: 'rgba(255, 255, 55, 1)',
            b_class: 'grid-button'
        },
        b3: {
            role: 'b-load-test-users',
            label: 'load test users',
            icon: 'users-medical',
            size: 1,
            p_color: 'rgba(55, 55, 255,1)',
            s_color: 'rgba(255, 255, 55, 1)',
            b_class: 'grid-button'
        },
        b4: {
            role: 'b-pause',
            label: 'pause database',
            icon: 'circle-pause',
            size: 1,
            p_color: 'rgba(55, 55, 255,1)',
            s_color: 'rgba(255, 255, 55, 1)',
            b_class: 'grid-button'
        },
        b5: {
            role: 'b-health',
            label: 'health check',
            icon: 'wave-pulse',
            size: 1,
            p_color: 'rgba(255, 255, 55,1)',
            s_color: 'rgba(255, 165, 55, 1)',
            b_class: 'grid-button'
        },

    }
}

const dbView = buildComponent('database-view', 'database-view-component',{ title: 'Database Viewer', grid}, ViewComponent, (cQueryUser) => {

})

const utilTitle = Controller('util-title', (utilTitle) => {
    utilTitle.innerHTML="Database Toolkit Utility"
})



const oDbView = Controller('o-database-view', (oDbView) => {
    oDbView.on('main-view',() => {
        taskGrid.style.display="grid"
        databaseToolkitIo.style.display="block"
        oDbView.innerHTML=oDbView.$state.main
    })

    oDbView.on('table-view', async () => {

        let users_table_view = await tableView()
        oDbView.$state.main = oDbView.innerHTML
        oDbView.innerHTML = users_table_view

        taskGrid.style.display="none"
        databaseToolkitIo.style.display="none"


        const tableMain = Controller('table-main', (tableMain) => {})

        const tableHeader = Controller('table-header', (tableHeader) => {})


        const head0 = Controller('head-0', (head0) => {})
        const head1 = Controller('head-1', (head1) => {})
        const head2 = Controller('head-2', (head2) => {})
        const head3 = Controller('head-3', (head3) => {})
        const head4 = Controller('head-4', (head4) => {})
        const head5 = Controller('head-5', (head5) => {})
        const head6 = Controller('head-6', (head6) => {})
        const head7 = Controller('head-7', (head7) => {})
        const head8 = Controller('head-8', (head8) => {})
        const head9 = Controller('head-9', (head9) => {})

        const detail0 = Controller('details-0', (detail0) => {})
        const detail1 = Controller('details-1', (detail1) => {})
        const detail2 = Controller('details-2', (detail2) => {})
        const detail3 = Controller('details-3', (detail3) => {})
        const detail4 = Controller('details-4', (detail4) => {})
        const detail5 = Controller('details-5', (detail5) => {})
        const detail6 = Controller('details-6', (detail6) => {})
        const detail7 = Controller('details-7', (detail7) => {})
        const detail8 = Controller('details-8', (detail8) => {})
        const detail9 = Controller('details-9', (detail9) => {})

        const callout0 = Controller('callout-0', (callout0) => {})
        const callout1 = Controller('callout-1', (callout1) => {})
        const callout2 = Controller('callout-2', (callout2) => {

        })
        const callout3 = Controller('callout-3', (callout3) => {})
        const callout4 = Controller('callout-4', (callout4) => {})

        const aHead0 = Controller('a-head-0', (aHead0) => {
            aHead0.addEventListener('mouseenter', (e) => {
                callout0.classList.add('app-selected')
                detail0.classList.add('details-active')
            })
            aHead0.addEventListener('mouseleave', (e) => {
                callout0.classList.remove('app-selected')
                detail0.classList.remove('details-active')
            })
        })

        const aHead1 = Controller('a-head-1', (aHead1) => {
            aHead1.addEventListener('mouseenter', (e) => {
                callout1.classList.add('cfg-selected')
                detail1.classList.add('details-active')
            })
            aHead1.addEventListener('mouseleave', (e) => {
                callout1.classList.remove('cfg-selected')
                detail1.classList.remove('details-active')
            })
        })

        const aHead2 = Controller('a-head-2', (aHead2) => {
            aHead2.addEventListener('mouseenter', (e) => {
                callout2.classList.add('email-selected')
                detail2.classList.add('details-active')
            })
            aHead2.addEventListener('mouseleave', (e) => {
                callout2.classList.remove('email-selected')
                detail2.classList.remove('details-active')
            })
        })
        const aHead3 = Controller('a-head-3', (aHead3) => {
            aHead3.addEventListener('mouseenter', (e) => {
                callout3.classList.add('firstname-selected')
                detail3.classList.add('details-active')
            })
            aHead3.addEventListener('mouseleave', (e) => {
                callout3.classList.remove('firstname-selected')
                detail3.classList.remove('details-active')
            })
        })
        const aHead4 = Controller('a-head-4', (aHead4) => {
            aHead4.addEventListener('mouseenter', (e) => {
                callout4.classList.add('lastname-selected')
                detail4.classList.add('details-active')
            })
            aHead4.addEventListener('mouseleave', (e) => {
                callout4.classList.remove('lastname-selected')
                detail4.classList.remove('details-active')
            })
        })
        const aHead5 = Controller('a-head-5', (aHead5) => {
            aHead5.addEventListener('mouseenter', (e) => {
                callout4.classList.add('key-selected')
                detail5.classList.add('details-active')
            })
            aHead5.addEventListener('mouseleave', (e) => {
                callout4.classList.remove('key-selected')
                detail5.classList.remove('details-active')
            })
        })

        const aHead6 = Controller('a-head-6', (aHead6) => {
            aHead6.addEventListener('mouseenter', (e) => {
                callout3.classList.add('password-selected')
                detail6.classList.add('details-active')
            })
            aHead6.addEventListener('mouseleave', (e) => {
                callout3.classList.remove('password-selected')
                detail6.classList.remove('details-active')
            })
        })

        const aHead7 = Controller('a-head-7', (aHead7) => {
            aHead7.addEventListener('mouseenter', (e) => {
                callout2.classList.add('path-selected')
                detail7.classList.add('details-active')
            })
            aHead7.addEventListener('mouseleave', (e) => {
                callout2.classList.remove('path-selected')
                detail7.classList.remove('details-active')
            })
        })

        const aHead8 = Controller('a-head-8', (aHead8) => {
            aHead8.addEventListener('mouseenter', (e) => {
                callout1.classList.add('url-selected')
                detail8.classList.add('details-active')
            })
            aHead8.addEventListener('mouseleave', (e) => {
                callout1.classList.remove('url-selected')
                detail8.classList.remove('details-active')
            })
        })

        const aHead9 = Controller('a-head-9', (aHead9) => {
            aHead9.addEventListener('mouseenter', (e) => {
                callout0.classList.add('username-selected')
                detail9.classList.add('details-active')
            })
            aHead9.addEventListener('mouseleave', (e) => {
                callout0.classList.remove('username-selected')
                detail9.classList.remove('details-active')
            })
        })

        const backButton = Controller('back-button', (backButton) => {
            backButton.setAttribute('type', 'button')
            backButton.addEventListener('click', (e) => {
                e.preventDefault()
                oDbView.emit('main-view')
            })
        })

    })

})


const taskGrid = Controller('task-grid', (taskGrid) => {


})
taskGrid.on('message', (m) => databaseToolkitIo.emit('message', m))
const gridTitle = Controller('grid-title', (gridTitle) => {
    gridTitle.innerHTML="Database Tools"

})

const exitButton = Controller('exit-button', (exitButton) => {
    exitButton.innerHTML="Exit Database"

},'grid-button')
const purgeButton = Controller('purge-button', (purgeButton) => {
    purgeButton.innerHTML="Purge Database"

}, 'grid-button')

const pauseButton = Controller('pause-button', (pauseButton) => {
    pauseButton.innerHTML="pauseButton"

}, 'grid-button')

const addTestUsersButton = Controller('add-test-users-button', (addTestUsersButton) => {
    addTestUsersButton.innerHTML="Add Test Users"

}, 'grid-button')

const restoreButton = Controller('restore-button', (restoreButton) => {
    restoreButton.innerHTML="Restore Database"

}, 'grid-button')


const healthButton = Controller('health-button', (healthButton) => {
    healthButton.innerHTML="Database Health"

}, 'grid-button')

exitButton.addEventListener('mouseup', (e) => {
    appUtilityPanel.classList.remove('activate-utility-panel')
    appUtilityPanel.classList.add('deactivate-utility-panel')

}, true)
exitButton.addEventListener('mouseenter', (e) => {
  databaseToolkitIo.infoMessages.Exit(e)

}, true)
exitButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
})



purgeButton.addEventListener('mousedown', (e) => {
    e.preventDefault()
    appMain.emit('require-credentials', 'PURGE', e)
})
purgeButton.addEventListener('mouseenter', (e) => {

    databaseToolkitIo.infoMessages.Purge(e)
}, true)
purgeButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
}, true)



pauseButton.addEventListener('mousedown', (e) => {
    e.preventDefault()
    appMain.emit('require-credentials', 'PAUSE', e)
})
pauseButton.addEventListener('mouseenter', (e) => {
    databaseToolkitIo.infoMessages.Pause(e)
}, true)
pauseButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
}, true)


addTestUsersButton.addEventListener('mousedown', (e) => {
    e.preventDefault()
      appMain.emit('require-credentials', 'ADD_TEST_USERS', e)

})
addTestUsersButton.addEventListener('mouseenter', (e) => {
    databaseToolkitIo.infoMessages.Add_Test_User(e)
}, true)
addTestUsersButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
}, true)

restoreButton.addEventListener('mouseenter', (e) => {
    databaseToolkitIo.infoMessages.Restore(e)
}, true)
restoreButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
}, true)
restoreButton.addEventListener('mousedown', (e) => {
    e.preventDefault()
    appMain.emit('require-credentials', 'RESTORE', e)
})

healthButton.addEventListener('mouseenter', (e) => {
    databaseToolkitIo.infoMessages.Data_Base_Health(e)
}, true)
healthButton.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        databaseToolkitIo.infoMessages.Default(e)
    }, 10000)
}, true)
healthButton.addEventListener('mousedown', (e) => {
    e.preventDefault()
    appMain.emit('require-credentials', 'HEALTH', e)
})

const databaseToolkitIo = Controller('database-toolkit-io', (databaseToolkitIo) => {
    databaseToolkitIo.on('message', (m) => {
        databaseToolkitIo.innerHTML=m
    })
})
databaseToolkitIo.infoMessages= {
    Exit: (e) =>  databaseToolkitIo.innerHTML='Exit the database viewer.',
    Purge: (e) =>   databaseToolkitIo.value='Purge all data from the database.',
    Restore: (e) =>  databaseToolkitIo.value='Restore in memory data from storage.',
    Add_Test_User: (e) =>  databaseToolkitIo.value='Add test users from file for testing.',
    Pause: (e) =>  databaseToolkitIo.value='Pause database service',
    Data_Base_Health: (e) =>  databaseToolkitIo.value='Check the health of the database',
    Default: (e) =>  databaseToolkitIo.value='Hover over a database to view it\'s properties. Click on the database to view table properties. Choose a task from Database tools.'
}





const  tDbView= Controller('t-database-view', (tDbView) => {

})

const dataCallOut = Controller('data-callout', (dataCallOut) => {
    dataCallOut.classList.add('hide-callout')
})
const dataTable = Controller('data-table',  (dataTable) => {
        dataTable.classList.add('hide-data-table')





})

const dataTitle = Controller('data-title', (dataTitle) => {
    dataTitle.innerHTML="Database Users"
    
})

const dataList = Controller('data-list', (dataList) => {
    
    
})



const options = { dataList, oDbView, dataTable, dataCallOut }
const _dat_users = dbViewEngine({ dataList, oDbView }, async (_dat_users) => {
    let dataTab = document.getElementById('dataTable')
    let data_callout = document.querySelector('.data-callout')

    await _dat_users.addEventListener('click', (e) => {
        oDbView.emit('table-view')
    })

    await _dat_users.addEventListener('mouseover', (e) => {
        if(dataTab.classList.contains('hide-table-data')) {

            dataTab.classList.remove('hide-table-data')
            dataTab.classList.add('show-table-data')

       }
        else {
            dataTab.classList.add('show-table-data')


        }
    }, false)

   await _dat_users.addEventListener('mouseleave', (e) => {
       if (dataTab.classList.contains('show-table-data')) {
           dataTab.classList.remove('show-table-data')
           dataTab.classList.add('hide-table-data')

       } else {
           dataTab.classList.add('hide-table-data')
       }

   }, false)

    await _dat_users.addEventListener('mouseover', (e) => {
           if (data_callout.classList.contains('hide-callout')) {
               data_callout.classList.remove('hide-callout')
               data_callout.classList.add('show-callout')
           } else {
               data_callout.classList.add('show-callout')
           }
       }, false)

    await _dat_users.addEventListener('mouseleave', (e) => {
           if(data_callout.classList.contains('show-callout')) {
               data_callout.classList.remove('show-callout')
               data_callout.classList.add('hide-callout')
           }
           else {
               data_callout.classList.add('hide-callout')
           }

        }, false)

    const appHead = Controller('app-head', (appHead) => {

    })


})

