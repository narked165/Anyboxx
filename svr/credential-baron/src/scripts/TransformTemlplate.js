import { default as TransformComponent } from './transform-component.js'
export { transformTemplate as default }

async function transformTemplate({ app0, app1, username }) {
    let options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(await getUserOptions(username))

    }
    let location = `/${ app1 }`

    try {

        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.text()
            return await data


        }
    }
    catch(e) {
        await Promise.reject(e)
    }

}

async function getUserOptions(username) {
    let options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ username })

    }
    let location = "/get-user-info"

    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.json()
            return await data
        }
    }
    catch(e) {
       await Promise.reject(e)
    }
}