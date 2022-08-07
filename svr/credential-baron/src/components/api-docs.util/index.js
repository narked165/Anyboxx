import { default as Controller } from '../../scripts/controller.js'

const DOCS = {
    controller: {
        title: 'Controlller',
        description: 'function imported from controller.js in the scripts directory, used to dynamically control an element.',
        example: [
            "const elementRole = Controller('element-role', (elementRole) => {",
            " // some initialization parameters ",
            "})"]
    },

}


const apiDocsForm = Controller('api-docs-form', (apiDocsForm) => {
    
})

const utilTitle = Controller('util-title', (utilTitle) => {
    utilTitle.innerHTML="API Docs Utility"
})

const contentAside = Controller('content-aside', (contentAside) => {

})

const legendTitle = Controller('legend-title', (legendTitle) => {
    legendTitle.innerHTML='Contents'
})

const contentLegend = Controller('content-legend', (contentLegend) => {
    for(let doc in DOCS) {
        contentLegend.innerHTML+=`<li><a class="doc-link" data-key="${ doc }">${ DOCS[doc].title }</a></li>`
    }
})

const contentTitle = Controller('content-title', (contentTitle) => {
    contentTitle.on('show-title', (title) => {
        contentTitle.innerHTML=title
    })
    contentTitle.on('erase-content', () => contentTitle.innerHTML='')
})

const contentDescription = Controller('content-description', (contentDescription) => {
    contentDescription.on('show-description', (description) => {
        contentDescription.innerHTML+=`<content>${ description }</content>`
    })
    contentDescription.on('erase-content', () => {
        contentDescription.innerHTML='<h3>Content Description</h3>'
    })
})

const contentExample = Controller('content-example', (contentExample) => {
    
})

const exampleCode = Controller('example-code', (exampleCode) => {
  
})
const codeLines = Controller('code-lines', (codeLines) => {
    codeLines.on('show-example', (example) => {
        example.forEach((line, i) => codeLines.innerHTML+=`<li><h2>${ i }</h2><p>${ line }</p></li>`)
    })
    codeLines.on('erase-content', () => {
        codeLines.innerHTML=''
    })
})
function createDocView({ title, description, example }) {
    contentTitle.emit('show-title', title)
    contentDescription.emit('show-description', description)
    codeLines.emit('show-example', example)
}

function eraseDocContent() {
    contentTitle.emit('erase-content')
    contentDescription.emit('erase-content')
    codeLines.emit('erase-content')
}

let _docLinks = document.querySelectorAll('.doc-link')
let docLinks = Object.values(_docLinks)
for (let l of docLinks){
    console.log(l.dataset.key)
    l.addEventListener('mousedown', (e) => {
        e.preventDefault()
        eraseDocContent()
        createDocView(DOCS[l.dataset.key])
    })
}