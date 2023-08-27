import React, { useEffect, useRef, useState } from 'react'
import '../TypingWindow.css'
import PointerComponent from './PointerComponent'
import '../Utils/AllowedLettersWords'
import AllowedLettersWords from '../Utils/AllowedLettersWords'
import AllowedLetterList from '../Utils/AllowedLettersWords'

export default function TypingBox(props) {

  const WordRef = useRef(null)
  const BoxRef = useRef(null)
  const [isFocused, setFocused] = useState(true)
  let totalTime;
  const [count, setCount] = useState(0)
  const [wordRefState, setWordRefState] = useState(WordRef)

  const calculateWPM = () => {
    clearInterval(props.interval)
    clearTimeout(props.timeout)
    totalTime = Date.now() - props.startTime.current
    totalTime = totalTime / 1000
    totalTime = totalTime / (60)
    let numberofcorrect = 0
    let numberofIncorrect = 0
    // let numberofMissedLetter = 0
    for (let i of props.letterState[props.wordPosition]) {
      if (i == ' correct') {
        numberofcorrect++
      }
      else if (i == ' error') {
        numberofIncorrect++
      }
    }
    numberofcorrect = props.numberofCorrectLetter.current + numberofcorrect
    numberofIncorrect = props.numberofIncorrectLetter.current + numberofIncorrect
    console.log("total incorrect Word: ", numberofIncorrect);
    console.log("total correct word: ", numberofcorrect);

    console.log('total word: ', numberofcorrect / 5);
    console.log("wpm: ", (numberofcorrect / 5) / totalTime);
    props.numberofCorrectLetter.current = numberofcorrect
    props.numberofIncorrectLetter.current = numberofIncorrect
    // props.numberofMissedLetter.current = numberofMissedLetter
    props.setWpm(((numberofcorrect / 5) / totalTime).toFixed(2))
    props.setDisplayResultWindow(true)
    props.setwordPosition(props.phrase.length)
  }


  const StoreText = (event) => {

    if (props.wordPosition == 0 && props.letterPosition == 0) {
      props.startTime.current = Date.now()
      props.setTimerCounter(props.timerValue)
      if (!props.wordOption) {
        props.setTimeOut(setTimeout(calculateWPM, (props.timerValue + 1) * 1000))
        props.setIntervalValue(setInterval(() => {
          props.setTimerCounter(prev => prev - 1)
        }, 1000));
      }
      props.setTimer(true)
      setCount(0)
      props.numberofCorrectLetter.current = 0
      props.numberofIncorrectLetter.current = 0
      props.numberofExtraLetter.current = 0
      props.numberofMissedLetter.current = 0
      console.log(Date.now());
    }


    // let letterEle = document.querySelectorAll('.letter')
    if ((props.wordPosition <= props.phrase.length - 1) && props.letterPosition < props.wordLength && AllowedLetterList.has(event.which)) {
      props.setletterPosition(prev => prev + 1)
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

        if (props.wordPosition == props.phrase.length - 1 && props.letterPosition == props.wordLength - 1) {
          calculateWPM()
        }

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
    else if ((event.key == ' ') && props.wordPosition < props.phrase.length - 1) {
      console.log(props.letterState[props.wordPosition]);
      if (props.wordOption) {
        props.setWordCounter(prev => prev + 1)
      }

      let numberofcorrect = 0
      let numberofIncorrect = 0
      let numberofMissedLetter = 0
      for (let i of props.letterState[props.wordPosition]) {
        if (i == ' correct') {
          numberofcorrect++
        }
        else if (i.includes('error')) {
          numberofIncorrect++
        }
        else if (i === '') {
          numberofMissedLetter++
        }
      }
      props.numberofCorrectLetter.current = props.numberofCorrectLetter.current + numberofcorrect
      props.numberofIncorrectLetter.current = props.numberofIncorrectLetter.current + numberofIncorrect
      if (props.letterState[props.wordPosition].length == props.wordLength) {
        props.numberofMissedLetter.current = props.numberofMissedLetter.current + numberofMissedLetter + 1
      }
      let w = document.querySelectorAll('.word')
      let wordPos = props.wordPosition + 1;
      let wordLength = props.phrase[props.wordPosition + 1].length;
      let word = props.phrase[props.wordPosition + 1]

      if (w[props.wordPosition + 1]?.offsetTop != w[props.wordPosition]?.offsetTop) {

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
                "position": props.lineBreakIndex
              }
            })

            wordPos = props.wordPosition - props.lineBreakIndex
            wordLength = props.phrase[props.wordPosition + 1].length
            word = props.phrase[props.wordPosition + 1]
          }
        }
        props.setLineBreakIndex(wordPos - 1)
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
            'wordPos': wordPos - 1,
            'letterPos': props.letterPosition
          }
        })
      }

      props.setwordPosition(wordPos)
      props.setletterPosition(0)
      props.setWordLength(wordLength)
      props.setWord(word)

    }
    else if (props.wordPosition <= props.phrase.length - 1 && event.key == 'Backspace' && props.letterPosition > 0) {
      let w = document.querySelectorAll('.word')
      // console.log("extra error class");
      // console.log("letter position: ",props.letterPosition - 2);
      console.log(w[props.wordPosition].childNodes[props.letterPosition - 1].className);
      if (w[props.wordPosition].childNodes[props.letterPosition - 1].className.includes('extra-word')) {
        // console.log('extra word is present');
        let tempPhrase = props.phrase
        tempPhrase[props.wordPosition] = tempPhrase[props.wordPosition].slice(0, props.letterPosition - 1)
        props.numberofExtraLetter.current = props.numberofExtraLetter.current - 1
      }
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
    else if ((props.wordPosition <= props.phrase.length - 1) && props.letterPosition >= props.wordLength && AllowedLetterList.has(event.which)) {
      let tempPhrase = props.phrase
      tempPhrase[props.wordPosition] = tempPhrase[props.wordPosition] + event.key
      props.setPhrase(tempPhrase)
      props.setletterPosition(prev => prev + 1)

      console.log('word index: ', props.letterPosition);
      props.setLetterState({
        type: 'ADDEXTRALETTER',
        payload: {
          'wordPos': props.wordPosition,
          'letterPos': props.letterPosition
        }
      })
      props.numberofExtraLetter.current = props.numberofExtraLetter.current + 1
    }


  }

  const [, setForceUpdate] = useState(Date.now());

  // Force UI regresh to get latest changes in WordRef

  useEffect(()=>{

    setForceUpdate(Date.now())
  })


  useEffect(() => {
    BoxRef.current.focus()
  }, [props.phrase])

  return (<>
    <div ref={BoxRef} onFocus={() => setFocused(true)} onClick={(event) => { BoxRef.current.focus() }} onKeyDown={(event) => StoreText(event)} className='typingBox' tabIndex={0} autoFocus>
    <PointerComponent WordRef = {WordRef}></PointerComponent>
    {props.phrase.map((word, w) => {
        let letterEle = word.split('')
        return (
        <div className="word">{letterEle.map((letter, l) => {
          return (
          
            <div className={`letter${props.letterState[w][l]}`} ref={(props.letterState[w][l].includes("active") || props.letterState[w][l].includes("activeRight")) ? WordRef : null}>{letter}</div>
        )})
        }</div>)
      })}
    </div>
  </>
  )
}
