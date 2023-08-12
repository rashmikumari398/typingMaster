import React, { useState } from 'react'
import "../FeatureComponent.css"

// const timerOption = (props)=>{
//     return({

//     })
// }

export default function FeatureComponent(props) {
    
    const[timerbtnColor,setTimerBtnColor] = useState('btnColorActive')
    const[wordbtnColor,setWordBtnColor] = useState('btnColorInactive')

    const timerOptionElement = <div className="join">
    <button className="btn join-item btn-timer" >15</button>
    <button className="btn join-item btn-timer">30</button>
    <button className="btn join-item btn-timer">60</button>
    <button className="btn join-item btn-timer">120</button>
    </div>

    const wordOptionElement = <div className="join">
    <button className={`btn join-item btn-timer ${props.childBtnColor[0]}`} value='10' onClick={(event)=>generatePhraseBasedOnWordCount(event)} >10</button>
    <button className={`btn join-item btn-timer ${props.childBtnColor[1]}`} value='25' onClick={(event)=>generatePhraseBasedOnWordCount(event)}>25</button>
    <button className={`btn join-item btn-timer ${props.childBtnColor[2]}`} value='50' onClick={(event)=>generatePhraseBasedOnWordCount(event)}>50</button>
    <button className={`btn join-item btn-timer ${props.childBtnColor[3]}`} value='100' onClick={(event)=>generatePhraseBasedOnWordCount(event)}>100</button>
    </div>
    
    const updateTimerBtnStyle=(event)=>{
        props.setTimerOption(false)
        if(props.timerOption){
            setTimerBtnColor("btnColorActive")
            setWordBtnColor("btnColorInactive")
        }
        props.generatePhrase(30)
        props.setNumberofWord(25)
    }
    const updateWordBtnStyle=(event)=>{
        props.setTimerOption(true)
        if(!props.timerOption){
            setTimerBtnColor("btnColorInactive")
            setWordBtnColor("btnColorActive")
        }
        props.generatePhrase(25)
        props.setChildBtnColor(["btnColorInactive","btnColorActive","btnColorInactive","btnColorInactive"])
    }

    const generatePhraseBasedOnWordCount=(event)=>{
        props.generatePhrase(Number(event.target.value))
        let valueArray = [10,25,50,100]
        let index = valueArray.indexOf(Number(event.target.value))
        let childBtnColortemp=[]
        props.setNumberofWord(Number(event.target.value))
        for (let i in props.childBtnColor){
            if(i==index){
                childBtnColortemp.push("btnColorActive")
            }
            else{
                childBtnColortemp.push("btnColorInactive")
            }
        }
        props.setChildBtnColor(childBtnColortemp)
    }

    return (
        <div className="join">
            <button className={`btn join-item btn-feature ${timerbtnColor}`} onClick={(event)=>updateTimerBtnStyle(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                </svg>
                    time
            </button>
            <button className={`btn join-item btn-feature ${wordbtnColor}`} onClick={(event)=>{updateWordBtnStyle(event)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                </svg>
                words
            </button>
            {props.timerOption?wordOptionElement:timerOptionElement}
        </div>
    )
}
