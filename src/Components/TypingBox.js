import React, { useEffect, useRef, useState } from 'react'
import '../TypingWindow.css'

export default function TypingBox(props) {

  const WordRef = useRef(null)
  const BoxRef = useRef(null)
  const [isFocused, setFocused] = useState(true)
  let totalTime;
  // const [topPosition, setTopPosition] = useState(0)
  const [count, setCount] = useState(0)
  // console.log(props.letterState)
  //function to highlight phrase
  const calculateWPM=()=>{
    totalTime = Date.now() - props.startTime.current
    totalTime = totalTime / 1000
    totalTime = totalTime / (60)
    let numberofcorrect = 0
    for (let i of props.letterState[props.wordPosition]){
      if(i==' correct'){
        numberofcorrect++
      }
    }
    numberofcorrect = props.numberofCorrectLetter.current + numberofcorrect
    console.log('total word: ', numberofcorrect/5);
    console.log("wpm: ", (numberofcorrect/5) / totalTime);
    props.setwordPosition(props.phrase.length)
  }


  const StoreText = (event) => {

    if (props.wordPosition == 0 && props.letterPosition == 0) {
      props.startTime.current = Date.now()
      if(!props.timerOption){
        setTimeout(calculateWPM,props.timerValue*1000)
      }
      setCount(0)
      props.numberofCorrectLetter.current = 0
      console.log(Date.now());
    }


    // let letterEle = document.querySelectorAll('.letter')
    if (props.wordPosition<=props.phrase.length-1 && props.letterPosition < props.wordLength && event.key !== ' ' && event.key !== 'Backspace' && event.key !== 'Enter') {
      props.setletterPosition(prev => prev + 1)
      props.setCursorPosition(prev => prev + 1)
      props.setLetterState({
        type: 'ACTIVE',
        payload: {
          'wordPos': props.wordPosition,
          'letterPos': props.letterPosition + 1
        }
      })
      if (props.word[props.letterPosition] == event.key) {

        // typingboxStyle.current.children[props.wordPosition].children[props.letterPosition].classList.add('correct')
        props.setLetterState({
          type: 'CORRECT',
          payload: {
            'wordPos': props.wordPosition,
            'letterPos': props.letterPosition
          }
        })

      }
      else {

        props.setLetterState({
          type: 'INCORRECT',
          payload: {
            'wordPos': props.wordPosition,
            'letterPos': props.letterPosition
          }
        })
      }
    }
    else if ((event.key == ' ' || props.letterPosition > props.wordLength) && props.wordPosition<props.phrase.length-1) {
      
      // console.log(props.wordPosition);
      let numberofcorrect = 0
      for (let i of props.letterState[props.wordPosition]){
        if(i==' correct'){
          numberofcorrect++
        }
      }
      props.numberofCorrectLetter.current=props.numberofCorrectLetter.current+numberofcorrect
      
      let w = document.querySelectorAll('.word')
      let wordPos = props.wordPosition+1;
      let wordLength = props.phrase[props.wordPosition + 1].length;
      let word = props.phrase[props.wordPosition + 1]

      if (w[props.wordPosition+1]?.offsetTop != w[props.wordPosition]?.offsetTop) {

        if (count < 1) {
          
          setCount(prev => prev + 1)
        }
        else {
          // Would not respond to dynamic screen size changes

          if (props.phrase.length > 25) {
            
            props.setPhrase(props.phrase.slice(props.lineBreakIndex + 1))
          
            props.setLetterState({
              type: 'INITREFRESH',
              payload: {
                "position":props.lineBreakIndex
              }
            })
          
            wordPos = props.wordPosition-props.lineBreakIndex
            wordLength = props.phrase[props.wordPosition+1].length
            word = props.phrase[props.wordPosition+1]
          }
        }
        props.setLineBreakIndex(wordPos-1)
      }
      props.setLetterState({
        type: 'ACTIVE',
        payload: {
          'wordPos': wordPos,
          'letterPos': 0
        }
      })
      if (props.letterPosition !== props.wordLength) {
        props.setLetterState({
          type: 'REMOVE',
          payload: {
            'wordPos': wordPos-1,
            'letterPos': props.letterPosition
          }
        })
      }

      props.setwordPosition(wordPos)
      props.setletterPosition(0)
      props.setWordLength(wordLength)
      props.setWord(word)
      
    }
    else if (props.wordPosition<=props.phrase.length-1 && event.key == 'Backspace' && props.letterPosition > 0) {
      props.setLetterState({
        type: 'REMOVEANDUPDATE',
        payload: {
          'wordPos': props.wordPosition,
          'letterPos': props.letterPosition - 1
        }
      })
      props.setletterPosition(prev => prev - 1)
      props.setCursorPosition(props.cursorPosition - 1)
    }
    else if (props.wordPosition == props.phrase.length-1 && event.key == ' ' ) {
      calculateWPM()
    }

  }



  useEffect(() => {
    BoxRef.current.focus()
  }, [props.phrase])

  return (
    <div ref={BoxRef} onFocus={() => setFocused(true)} onClick={(event) => { BoxRef.current.focus() }} className='typingBox' onKeyDown={(event) => StoreText(event)} tabIndex='0' autoFocus>
      {props.phrase.map((word, w) => {
        let letterEle = word.split('')
        return (<div className="word">{letterEle.map((letter, l) => <div className={`letter${props.letterState[w][l]}`} ref={props.letterState[w][l] == "active" ? WordRef : null}>{letter}</div>)}</div>)
      })}
    </div>
  )
}
