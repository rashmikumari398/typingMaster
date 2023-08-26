import React, { useState } from 'react'
import "../FeatureComponent.css"

// const wordOption = (props)=>{
//     return({

//     })
// }

export default function FeatureComponent(props) {

    const timerOptionElement = <div className="join">
        <button className={`btn join-item btn-timer ${props.childBtnColor[0]}`} value='15' onClick={(event) => generatePhraseBasedOnWordCount(event)} >15</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[1]}`} value='30' onClick={(event) => generatePhraseBasedOnWordCount(event)}>30</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[2]}`} value='60' onClick={(event) => generatePhraseBasedOnWordCount(event)}>60</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[3]}`} value='120' onClick={(event) => generatePhraseBasedOnWordCount(event)}>120</button>
    </div>

    const wordOptionElement = <div className="join">
        <button className={`btn join-item btn-timer ${props.childBtnColor[0]}`} value='10' onClick={(event) => generatePhraseBasedOnWordCount(event)} >10</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[1]}`} value='25' onClick={(event) => generatePhraseBasedOnWordCount(event)}>25</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[2]}`} value='50' onClick={(event) => generatePhraseBasedOnWordCount(event)}>50</button>
        <button className={`btn join-item btn-timer ${props.childBtnColor[3]}`} value='100' onClick={(event) => generatePhraseBasedOnWordCount(event)}>100</button>
    </div>

    const updateTimerBtnStyle = (event) => {
        props.setwordOption(false)
        // if (props.wordOption) {
        props.setTimerBtnColor("btnColorActive")
        props.setWordBtnColor("btnColorInactive")
        // }
        console.log("updateTimerBtnStyle");

        props.generatePhrase(100)
        props.setNumberofWord(100)
        // props.setTimerCounter(30)
        props.setTimerValue(30)
        props.setChildBtnColor(["btnColorInactive", "btnColorActive", "btnColorInactive", "btnColorInactive"])
    }
    const updateWordBtnStyle = (event) => {
        props.setwordOption(true)
        // if (!props.wordOption) {
        props.setTimerBtnColor("btnColorInactive")
        props.setWordBtnColor("btnColorActive")
        // }
        console.log("updateWordBtnStyle");

        props.generatePhrase(25)
        props.setTimerValue(30)
        props.setChildBtnColor(["btnColorInactive", "btnColorActive", "btnColorInactive", "btnColorInactive"])
        clearInterval(props.interval)
        clearTimeout(props.timeout)
    }

    const generatePhraseBasedOnWordCount = (event) => {
        console.log("generatePhraseBasedOnWordCount: ", props.wordOption);
        console.log("event.target.value: ", event.target.value);
        let numberOfWord = props.wordOption ? Number(event.target.value) : 200 * (Number(event.target.value) / 60)
        if (!props.wordOption) {
            clearInterval(props.interval)
            clearTimeout(props.timeout)
            props.setTimerValue(Number(event.target.value))
            props.setTimerCounter(Number(event.target.value))
        }
        console.log(numberOfWord);
        props.generatePhrase(numberOfWord)
        props.setNumberofWord(numberOfWord)
        let valueArray = props.wordOption ? [10, 25, 50, 100] : [15, 30, 60, 120]
        let index = valueArray.indexOf(Number(event.target.value))
        let childBtnColortemp = []
        for (let i in props.childBtnColor) {
            if (i == index) {
                childBtnColortemp.push("btnColorActive")
            }
            else {
                childBtnColortemp.push("btnColorInactive")
            }
        }
        props.setChildBtnColor(childBtnColortemp)
    }

    return (
        <div className="join">
            <button className={`btn join-item btn-feature ${props.timerbtnColor}`} onClick={(event) => updateTimerBtnStyle(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                </svg>
                    time
            </button>
            <button className={`btn join-item btn-feature ${props.wordbtnColor}`} onClick={(event) => { updateWordBtnStyle(event) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                </svg>
                words
            </button>
            {props.wordOption ? wordOptionElement : timerOptionElement}
        </div>

    )
}
