import React from 'react'
import '../ResultWindow.css'

export default function ResultWindow({ numberofCorrectLetter, numberofIncorrectLetter, wpm, numberofExtraLetter, numberofMissedLetter,
  wordOption,numberofWord,timerValue }) {
  return (
    <div id='resultWindowContainer'>
      <div className="infoContainer">
        <div className="headerContainer">
          test
        </div>
        <div>
          {wordOption?"word":'time'}
        </div>
      </div>
      <div className="infoContainer">
        <div className="headerContainer">
          type
        </div>
        <div>
          {wordOption?numberofWord:timerValue}
        </div>
      </div>
      <div className="infoContainer">
        <div className="headerContainer">
          characters
        </div>
        <div className="tooltip tooltip-bottom" data-tip="correct, incorrect, extra and missed">
          {numberofCorrectLetter.current}/{numberofIncorrectLetter.current}/{numberofExtraLetter.current}/{numberofMissedLetter.current}
          {/* /{Math.round(wpm) */}
        </div>
      </div>
      <div className="infoContainer">
        <div className="headerContainer">
          wpm
        </div>
        <div className="tooltip tooltip-bottom" data-tip={wpm}>
          {Math.round(wpm)}
        </div>
      </div>
    </div>
  )
}
