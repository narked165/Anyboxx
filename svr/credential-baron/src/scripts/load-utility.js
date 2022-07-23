export { loadUtility as default }



async function loadUtility(app) {
   let location = `/components/${ app }.util/index.html`
   let options  = {
       method: 'get',
       headers: {
           'Content-Type': 'text/html',
           'Access-Control-Allow-Origin': '*'
       }
   }


   try {
       let response = await fetch(location, options)
       if(response.ok) {
           let body = await response.text()
            return await body
       }
   }

   catch(e) {
       await Promise.reject(e)
   }
}