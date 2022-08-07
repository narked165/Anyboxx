export { tableView as default }
import { default as getDatabaseData } from './get-database-data.js'
import { default as TableView } from '../components/table-view/index.js'

async function tableView() {
    try {
        let { name, type, tables }  = await getDatabaseData()
        TableView.build(tables)
        return TableView.template()

     }
    catch(e) {

    }
}