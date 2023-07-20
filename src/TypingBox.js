import React, { useEffect, useRef, useState } from 'react'
import './TypingWindow.css'

export default function TypingBox(props) {

  const typingboxStyle = useRef(null)
  const letterRef = useRef(0)
  const [isFocused, setFocused] = useState(true)
  let totalTime;
  // console.log(props.letterState)
  //function to highlight phrase
  const StoreText = (event) => {
   
  
    if (props.wordPosition==0 && props.letterPosition==0){
      props.startTime.current = Date.now()
    }

    if (props.wordPosition == props.phrase.length - 1 && props.letterPosition == props.wordLength - 1) {
      console.log("end ", props.startTime);
      totalTime = Date.now() - props.startTime
      console.log('totalTime: ', totalTime);
      totalTime = totalTime / 1000
      totalTime = totalTime / (60)
      console.log('totalTime: ', totalTime);
      console.log("wpm: ", props.phrase.length / totalTime);
    }

    // let letterEle = document.querySelectorAll('.letter')
    if (props.letterPosition < props.wordLength && event.key !== ' ' && event.key !== 'Backspace' && event.key !== 'Enter') {
      props.setletterPosition(prev => prev + 1)
      props.setCursorPosition(prev => prev + 1)
      if (props.word[props.letterPosition] == event.key) {
        
        // typingboxStyle.current.children[props.wordPosition].children[props.letterPosition].classList.add('correct')
        props.setLetterState({
          type:'CORRECT', 
          payload: {
            'wordPos': props.wordPosition,
            'letterPos': props.letterPosition
          }
        })

      }
      else {

        // typingboxStyle.current.children[props.wordPosition].children[props.letterPosition].classList.add('error')
        props.setLetterState({
          type:'INCORRECT', 
          payload: {
            'wordPos': props.wordPosition,
            'letterPos': props.letterPosition
          }
        })
      }
    }
    else if (event.key == ' ' || props.letterPosition > props.wordLength) {
      props.setwordPosition(prev => prev + 1)
      props.setletterPosition(0)
      props.setWordLength(props.phrase[props.wordPosition + 1].length)
      props.setWord(props.phrase[props.wordPosition + 1])
      if (props.letterPosition !== props.wordLength) {
        let diff = (props.wordLength) - props.letterPosition
        props.setCursorPosition(props.cursorPosition + diff)
      }
    }
    else if (event.key == 'Backspace' && props.letterPosition>0) {
      props.setLetterState({
        type:'REMOVE', 
        payload: {
          'wordPos': props.wordPosition,
          'letterPos': props.letterPosition-1
        }
      })
      props.setletterPosition(prev => prev - 1)

      console.log("word position: ",props.letterPosition)
      props.setCursorPosition(props.cursorPosition - 1)
    }

  }

  useEffect(()=>{
    typingboxStyle.current.focus()
  },[props.phrase])  

  return (
    <div ref={typingboxStyle} onfocus = {()=> setFocused(true)} onClick={(event)=>{typingboxStyle.current.focus()}} className='typingBox' onKeyDown={(event) => StoreText(event)} tabIndex='0' autoFocus>
      {props.phrase.map((word, w) => {
        let letterEle = word.split('')
        return (<div className="word">{letterEle.map((letter,l) => <div className={`letter ${props.letterState[w][l]}`}>{letter}</div>)}</div>)
      })}
    </div>
  )
}
