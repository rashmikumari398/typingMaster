import React, { useEffect, useRef, useState } from 'react'
import '../TypingWindow.css'

export default function TypingBox(props) {

  const typingboxStyle = useRef(null)
  const WordRef = useRef(null)
  const [isFocused, setFocused] = useState(true)
  let totalTime;
  const [topPosition, setTopPosition] = useState(0)
  const [count, setCount] = useState(0)
  // console.log(props.letterState)
  //function to highlight phrase
  const StoreText = (event) => {

    // console.log(WordRef.current);
    // console.log("hello");
    // console.log("space clicked: ", topPosition);
    // console.log("count: ",count)
    // console.log("word index: ", props.lineBreakIndex);

    if (topPosition != WordRef?.current?.offsetTop && WordRef?.current?.offsetTop != undefined) {
      setTopPosition(WordRef?.current?.offsetTop)

      props.setLineBreakIndex(props.wordPosition - 1)

    }


    if (props.wordPosition == 0 && props.letterPosition == 0) {
      props.startTime.current = Date.now()
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

        // typingboxStyle.current.children[props.wordPosition].children[props.letterPosition].classList.add('error')
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
      props.setLetterState({
        type: 'ACTIVE',
        payload: {
          'wordPos': props.wordPosition + 1,
          'letterPos': 0
        }
      })
      if (props.letterPosition !== props.wordLength) {
        let diff = (props.wordLength) - props.letterPosition
        props.setCursorPosition(props.cursorPosition + diff)
        props.setLetterState({
          type: 'REMOVE',
          payload: {
            'wordPos': props.wordPosition,
            'letterPos': props.letterPosition
          }
        })
      }
      let w = document.querySelectorAll('.word')
      console.log(props.wordPosition);
      console.log(props.letterPosition);
      console.log(props.wordLength);
      console.log(props.word);
      if (w[props.wordPosition + 1]?.offsetTop != topPosition) {;
        if (count < 1) {
          setCount(prev => prev + 1)
          props.setwordPosition(prev => prev + 1)
          props.setletterPosition(0)
          props.setWordLength(props.phrase[props.wordPosition + 1].length)
          props.setWord(props.phrase[props.wordPosition + 1])
        }
        else {
          setCount(1)
          if (props.phrase.length > 25) {
            let tempPhrase = props.phrase
            tempPhrase = tempPhrase.slice(props.lineBreakIndex + 1)
            // console.log(tempPhrase);
            props.setPhrase(tempPhrase)
            // console.log(tempPhrase);
            props.setPhrase(tempPhrase)
            props.setLetterState({
              type: 'INITREFRESH',
              payload: {
                "position":props.lineBreakIndex
              }
            })
            // props.setwordPosition(props.wordPosition-props.lineBreakIndex)
            // props.setletterPosition(0)
            // props.setWordLength(props.phrase[props.wordPosition-props.lineBreakIndex].length)
            // props.setWord(props.phrase[props.wordPosition-props.lineBreakIndex])
          }
        }
      }
      else{
        setCount(prev => prev + 1)
        props.setwordPosition(prev => prev + 1)
        props.setletterPosition(0)
        props.setWordLength(props.phrase[props.wordPosition + 1].length)
        props.setWord(props.phrase[props.wordPosition + 1])
      }
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
    typingboxStyle.current.focus()
  }, [props.phrase])

  return (
    <div ref={typingboxStyle} onfocus={() => setFocused(true)} onClick={(event) => { typingboxStyle.current.focus() }} className='typingBox' onKeyDown={(event) => StoreText(event)} tabIndex='0' autoFocus>
      {props.phrase.map((word, w) => {
        let letterEle = word.split('')
        return (<div className="word">{letterEle.map((letter, l) => <div className={`letter ${props.letterState[w][l]}`} ref={props.letterState[w][l] == "active" ? WordRef : null}>{letter}</div>)}</div>)
      })}
    </div>
  )
}
