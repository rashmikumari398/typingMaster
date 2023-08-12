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
  const StoreText = (event) => {


    if (props.wordPosition == 0 && props.letterPosition == 0) {
      props.startTime.current = Date.now()
      setCount(0)
      console.log(Date.now());
    }

    if (props.wordPosition == props.phrase.length - 1 && props.letterPosition == props.wordLength - 1) {
      console.log("end ", props.startTime.current);
      totalTime = Date.now() - props.startTime.current
      console.log('totalTime: ', totalTime);
      totalTime = totalTime / 1000
      totalTime = totalTime / (60)
      console.log('totalTime: ', totalTime);
      console.log("wpm: ", props.phrase.length / totalTime);
      console.log(props.lineBreakIndex[0]);
    }




    // let letterEle = document.querySelectorAll('.letter')
    if (props.letterPosition < props.wordLength && event.key !== ' ' && event.key !== 'Backspace' && event.key !== 'Enter') {
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
    else if ((event.key == ' ' || props.letterPosition > props.wordLength)) {
      

      let w = document.querySelectorAll('.word')
      let wordPos = props.wordPosition+1;
      let wordLength = props.phrase[props.wordPosition + 1].length;
      let word = props.phrase[props.wordPosition + 1]

      console.log("top Position: "+ w[props.wordPosition]?.offsetTop);
      console.log("current Position: "+ w[props.wordPosition+1]?.offsetTop);
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
    else if (event.key == 'Backspace' && props.letterPosition > 0) {
      props.setLetterState({
        type: 'REMOVEANDUPDATE',
        payload: {
          'wordPos': props.wordPosition,
          'letterPos': props.letterPosition - 1
        }
      })
      props.setletterPosition(prev => prev - 1)

      console.log("word position: ", props.letterPosition)
      props.setCursorPosition(props.cursorPosition - 1)
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
