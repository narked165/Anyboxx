import { default as Controller } from '../../scripts/controller.js'
import { default as khanRemoteEvents } from '../../scripts/khan-remote-web-events.js'

const khanRemote = Controller('khan-remote', (khanRemote) => {

    khanRemote.on('submit-key', async (request) => {
        khanRemote.emit('clear-prompt')
        try {
            let [ DIRECTIVE, ARGUMENTS, FLAGS ] = request.split(' ').filter(k => k)

            if (DIRECTIVE === 'exit') {
                khanRemote.emit('exit')
                return
            }

            else if (DIRECTIVE === 'cls') {
                khanRemote.emit('cls')
                return
            }
           let body = await khanRemoteEvents(request)

            khanOutput.innerHTML+=`<li>${ body }</li>`

        }

        catch(e) {
            await Promise.reject(e)
        }

    })

    khanRemote.on('exit', () => {
        appMain.emit('deactivate-utility')
    })

    khanRemote.on('cls', () => {
        khanOutput.emit('clear')
    })

    khanRemote.on('clear-prompt', () => {
        khanOutput.emit('stash-command', khanInput.innerHTML.trim())
        khanInput.emit('clear-prompt')
    })

    khanRemote.on('return-command', (cmdString) => khanInput.innerHTML=cmdString)
})

const cKhanInput = Controller('c-khan-input', (cKhanInput) => {
    cKhanInput.archive = []
    cKhanInput.queryLength = () => cKhanInput.archive.length
    cKhanInput.addCommand = (command) => {
        cKhanInput.archive.push(command)
        khanInput.emit('update-cri', cKhanInput.archive.length)
    }
    cKhanInput.returnCommand = (n) => cKhanInput.archive[n] || ''

    cKhanInput.on('stash-command', (command) => cKhanInput.addCommand(command))
    cKhanInput.on('return-command', (n) => {
       khanInput.innerHTML=(n > cKhanInput.archive.length -1)
            ? ''
            : (cKhanInput.archive.length < 1)
                ? ''
                : cKhanInput.returnCommand(n)
    })

})

const cKhanPrompt = Controller('c-khan-prompt', (cKhanPrompt) => {

})
const khanPrompt = Controller('khan-prompt', (khanPrompt) => {
    khanPrompt.createPrompt = () => {
       khanPrompt.prompt = `${ appUtil.$state.username }@khan # `
        khanPrompt.innerHTML=khanPrompt.prompt
    }

    khanPrompt.prompt = {

        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    }


})

const appTitle = Controller('app-title', (appTitle) => {
    appTitle.innerHTML='Khan Remote CLI'
})

const khanOutput = Controller('khan-output', (khanOutput) => {
    khanOutput.on('stash-command', (cmdString) => {
        khanOutput.innerHTML += `<li> ${ cmdString }</li>`
    })
    khanOutput.on('clear', () => {
        khanOutput.innerHTML=""
    })
})

const khanInput = Controller('khan-input', (khanInput) => {
    khanInput.on('clear-prompt', () => khanInput.innerHTML="")
    khanInput.setAttribute('contenteditable', 'true')

    khanInput.commandRangeIterator={
        set(value){
            this.value=value
        },
        get(){
            return this.value
        }
    }
    khanInput.commandIterator= {
        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    }
    khanInput.cycleCommandIterator = () => {
        let n = cKhanInput.queryLength()
        if (khanInput.commandIterator <= n-1){
            khanInput.commandIterator++
        }
        else if(khanInput.commandIterator >= n ){
            khanInput.commandIterator = 0
        }
    }

    khanInput.r_cycleCommandIterator = () => {
        let n = cKhanInput.queryLength()
        if (khanInput.commandIterator <= 0){
            khanInput.commandIterator= n-1
        }
        else if(khanInput.commandIterator >= 0 ){
            khanInput.commandIterator--
        }
    }
    khanInput.on('cycle-command-iterator', () => khanInput.cycleCommandIterator())
    khanInput.on('r-cycle-command-iterator', () => khanInput.r_cycleCommandIterator())
    khanInput.on('update-cri', (v) => khanInput.commandRangeIterator=v)
    khanInput.addEventListener('keydown', (e) => {

        if(e.code === 'Enter') {
            e.preventDefault()

            cKhanInput.emit('stash-command', khanInput.innerHTML)
            console.log( khanInput.commandRangeIterator)
            khanRemote.emit('submit-key', khanInput.innerText)



        }
        if(e.code === 'ArrowDown') {
            e.preventDefault()
            cKhanInput.emit('return-command',   khanInput.commandIterator)
            khanInput.emit('r-cycle-command-iterator')

        }
        if(e.code === 'ArrowUp') {
            e.preventDefault()
            cKhanInput.emit('return-command', khanInput.commandIterator)
            khanInput.emit('cycle-command-iterator')


        }
    })
    khanPrompt.createPrompt()
    khanInput.commandIterator=0
    khanInput.commandRangeIterator=0
})



