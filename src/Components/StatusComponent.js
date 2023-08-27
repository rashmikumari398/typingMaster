import React, { useEffect } from 'react'
import '../TypingWindow.css'

export default function StatusComponent({ wordOption, timer, wordCounter, numberofWord, timerCounter,setIntervalValue,
    setTimerCounter}) {
    useEffect(() => {
        if (!wordOption) {
            setIntervalValue(setInterval(() => {
                setTimerCounter(prev => prev - 1)
            }, 1000));
        }
    }, [wordOption])
    return (
        <div id='displayProgressContainer'>
            {wordOption ? (timer ? `${wordCounter}/${numberofWord}` : '') : (timer ? timerCounter : '')}
        </div>
    )
}
