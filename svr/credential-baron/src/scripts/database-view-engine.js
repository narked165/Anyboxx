export { dbViewEngine as default }
import { default as getDatabaseView } from './get-database-view.js'
import { default as getDatabaseData } from './get-database-data.js'

async function dbViewEngine({ dataList, oDbView }) {
    try {
        let { name, type, tables } = await getDatabaseData()

        tables.map((v, i) => {
            dataList.innerHTML+=`<li>${ v.name}</li>`
        })

        let view = await getDatabaseView()
        oDbView.innerHTML += await view





    }
    catch(e) {
        console.error(e)
    }
}