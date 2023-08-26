import React from 'react'
import '../TypingWindow.css'

export default function StatusComponent({wordOption,timer,wordCounter,numberofWord,timerCounter}) {
    return (
        <div id='displayProgressContainer'>
            {wordOption ? (timer ? `${wordCounter}/${numberofWord}` : '') : (timer ? timerCounter : '')}
        </div>
    )
}
