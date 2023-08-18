import React from 'react'
import '../ResultWindow.css'

export default function ResultWindow({numberofCorrectLetter,numberofIncorrectLetter,wpm,numberofExtraLetter,numberofMissedLetter}) {
  return (
    <div id='resultWindowContainer'>
      <div>
          number of correct character = {numberofCorrectLetter.current}<br></br>
          number of incorrect character = {numberofIncorrectLetter.current}<br></br>
          number of Extra character = {numberofExtraLetter.current}<br></br>
          number of character Missed = {numberofMissedLetter.current}<br></br>
          WPM = {Math.round(wpm)}
      </div>
    </div>
  )
}
