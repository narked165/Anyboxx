export { utilPass as default }

function utilPass() {
    return document.querySelector('[data-role="util-panel"]').innerHTML=`
        <style>
            .util-pass {
                display: grid;
                grid-template-rows: repeat(5, 15vh);
                grid-template-columns: 100vw;
                background-color: rgba(255, 255, 255, 1);
                padding: 1%;
            }
            .t-pass {
                grid-row-start: 1;
                grid-row-end: 2;
                font-family: "Roboto", sans-serif;
                text-align: center;
                font-variant: titling-caps;
            }
            .s-pass{
              font-variant: all-small-caps;
              grid-row-start: 2;
              grid-row-end: 3;
              font-family: "Roboto", sans-serif;
              text-align: center;
            }
            .c-pass {
                grid-row-start: 3;
                grid-row-end: 4;
            }
            .c-pass-new {
                grid-row-start: 4;
                grid-row-end: 5;
                display: grid;
                grid-template-columns: 48vw 48vw;
                grid-template-rows: 1fr;
            }
            label {
                color: rgba(255, 155, 55. .1);             
                font-family: "Roboto", sans-serif;
                font-variant: all-petite-caps;
                text-align: center;
            }
            input {
                background-color: rgba(225, 225, 225. .1);
                border: 3px double rgba(255, 155, 55, 1);
                font-family: "Roboto", sans-serif;
                text-align: center;
            }
            .i-pass-new0 {
                grid-column-start: 1;
                grid-column-end: 2;
            
        
            }
            .i-pass-new1 {
                grid-column-start: 1;
                grid-column-end: 2;
            }
            .c-pass-control {
                grid-row-start: 6;
                grid-row-end: 7;
            }
            .bPassControl {
                width: 200px;
                padding: 1.5%;
                font-family: "Roboto", sans-serif;
                text-align: center;
                background-color: rgba(55, 55, 255, 1);
                color: rgba(255, 255, 255, 1);
            }
        </style>
        <form data-role="util-pass">
            
            <h1 data-role="t-pass"></h1>
            
            <h2 data-role="s-pass"></h2>
            
            <div data-role="c-pass">
                <label data-role="l-pass"
                <input data-role="i-pass" />
            </div>
            
            <div data-role="c-pass-new">
                <label data-role="l-pass-new0"
                <input data-role="i-pass-new-0" />
                <label data-role="l-pass-new1"
                <input data-role="i-pass-new-1" />
            </div>
            <div data-role="c-pass-control">
                <output data-role="o-pass-io"></output>
                <button data-role="b-pass-submit"></button>
            </div>
            
            <script type="module">
                import { default as Controller } from './controller.js'
                const utilPass = Controller('util-pass', (utilPass) => {
    
                })
                
                const tPass = Controller('t-pass', (tPass) => {
                    tPass.innerHTML="Change Your Password"
                })
                
                const sPass = Controller('s-pass', (sPass) => {
                    sPass.innerHTML="It's Probably better this way."
                })
                
                const cPass = Controller('c-pass', (cPass) => {
                    
                })
                
                const lPass = Controller('l-pass', (lPass) => {
                    lPass.innerHTML="Type your old password"
                })
                
                const cPassNew = Controller('c-pass-new', (cPassNew) => {
                    
                })
                
                const lPassNew0 = Controller('l-pass-new-0', (lPassNew0) => {
                    lPassNew0.innerHTML="Type a new Password"
                })
                
                const iPassNew0 = Controller('i-pass-new-0', (iPassNew0) => {
                    
                })
                
                const lPassNew1 = Controller('l-pass-new-1', (lPassNew1) => {
                    
                    lPassNew1.innerHTML="Once more..."
                })
                
                const iPassNew1 = Controller('i-pass-new-1', (iPassNew1) => {
                    
                })
                
                const cPassControl = Controller('c-pass-control', (cPassControl) => {
                    
                })
                
                const oPassControl = Control('o-pass-ccontrol', (oPassControl) => {
                    
                })
                
                const bPassSubmit = Control('b-pass-submit', (bPassSubmit) => {
                    bPassSubmit.innerHTML="Submit Password"
                })
                
                </script>   
            
            
        </form>
    `
}

