import React, { useEffect, useRef, useState, useReducer } from 'react'
import { generate, count } from 'random-words'
import '../TypingWindow.css'
import TypingBox from './TypingBox'
// import ButtonComponent from './ButtonComponent';
import ButtonIcon from './ButtonIcon'
import FeatureComponent from './FeatureComponent';
import ResultWindow from './ResultWindow'
import StatusComponent from './StatusComponent'

export default function TypingWindow() {

  function handleLetterStateChange(state, action) {
    if (action.type == 'INIT') {
      let init_state = phrase.map((word) => [...word].map(() => ''))
      init_state[0][0] = ' active';
      return init_state;
    }
    else if (action.type == 'INITREFRESH') {
      return state.slice(action.payload.position + 1)
    }
    else if (action.type == 'CORRECT') {
      if (action.payload.letterPos === wordLength - 1) {
        state[action.payload.wordPos][action.payload.letterPos] = ' correct activeRight';
      }
      else {
        state[action.payload.wordPos][action.payload.letterPos] = ' correct';
      }
      return state;
    }
    else if (action.type == 'INCORRECT') {
      if (action.payload.letterPos === wordLength - 1) {
        state[action.payload.wordPos][action.payload.letterPos] = ' error activeRight';
      }
      else {
        state[action.payload.wordPos][action.payload.letterPos] = ' error';
      }
      return state;
    }
    else if (action.type == 'REMOVEANDUPDATE') {
      if (action.payload.letterPos > wordLength - 1) {
        state[action.payload.wordPos][action.payload.letterPos - 1] = state[action.payload.wordPos][action.payload.letterPos - 1] + ' activeRight'
      }
      else {
        state[action.payload.wordPos][action.payload.letterPos] = ' active';
      }
      state[action.payload.wordPos][action.payload.letterPos + 1] = '';
      return state;
    }
    else if (action.type == 'REMOVE') {
      state[action.payload.wordPos][action.payload.letterPos] = ' active';
      state[action.payload.wordPos][action.payload.letterPos] = '';
      return state;
    }
    else if (action.type == 'ACTIVE') {
      if (action.payload.wordPos != 0 && action.payload.letterPos == 0) {
        for (let i = 0; i < state[action.payload.wordPos - 1].length; i++) {
          if (state[action.payload.wordPos - 1][i].includes("activeRight")) {
            state[action.payload.wordPos - 1][i] = state[action.payload.wordPos - 1][i].replace("activeRight", '')
          }
        }
      }
      state[action.payload.wordPos][action.payload.letterPos] = ' active';
      return state
    }
    else if (action.type == 'ADDEXTRALETTER') {
      state[action.payload.wordPos][action.payload.letterPos - 1] = state[action.payload.wordPos][action.payload.letterPos - 1].replace('activeRight', '')
      state[action.payload.wordPos][action.payload.letterPos] = ' extra-word activeRight'
      return state
    }
    else {
      return state;
    }
  }

  let [phrase, setPhrase] = useState([])
  const [wordPosition, setwordPosition] = useState(0)
  const [letterPosition, setletterPosition] = useState(0)
  const [wordLength, setWordLength] = useState(0)
  const [word, setWord] = useState()
  const [cursorPosition, setCursorPosition] = useState(0)
  const startTime = useRef(0)
  const [letterState, setLetterState] = useReducer(handleLetterStateChange, [])
  const [wordOption, setwordOption] = useState(() => {
    if (JSON.parse(localStorage.getItem('isUserPreferTypingBasedOnWord'))) {
      return JSON.parse(localStorage.getItem('isUserPreferTypingBasedOnWord'))
    }
    else {
      return false
    }
  })
  const [numberofWord, setNumberofWord] = useState(() => {
    if (JSON.parse(localStorage.getItem("numberOfWordPreference"))) {
      return JSON.parse(localStorage.getItem("numberOfWordPreference"))
    }
    else {
      return 25
    }
  })
  const [lineBreakIndex, setLineBreakIndex] = useState()
  const [timerValue, setTimerValue] = useState(() => {
    if (JSON.parse(localStorage.getItem("timerValue"))) {
      return JSON.parse(localStorage.getItem("timerValue"))
    }
    else {
      return 30
    }
  })
  const [timer, setTimer] = useState(false)
  const [interval, setIntervalValue] = useState(null);
  const [timeout, setTimeOut] = useState(null);
  const numberofCorrectLetter = useRef(null)
  const numberofIncorrectLetter = useRef(null)
  const numberofExtraLetter = useRef(null)
  const numberofMissedLetter = useRef(null)
  const [wpm, setWpm] = useState(0)
  const [wordCounter, setWordCounter] = useState(0)
  const [timerCounter, setTimerCounter] = useState(timerValue)
  const [displayResultWindow, setDisplayResultWindow] = useState(false)
  const [pointerPosition, setPointerPosition] = useState(0)
  const [childBtnColor, setChildBtnColor] = useState(() => {
    let index
    if(wordOption){
      index = [10, 25, 50, 100].indexOf(numberofWord)
    }
    else{
      index = [15, 30, 60, 120].indexOf(timerValue)
    }
    let childBtnColortemp = []
    for (let i=0;i<5;i++) {
      if (i == index) {
        childBtnColortemp.push("btnColorActive")
      }
      else {
        childBtnColortemp.push("btnColorInactive")
      }
    }
    return childBtnColortemp
  })
  const [timerbtnColor, setTimerBtnColor] = useState(() => {
    if (wordOption) {
      return 'btnColorInactive'
    }
    else {
      return 'btnColorActive'
    }
  })
  const [wordbtnColor, setWordBtnColor] = useState(() => {
    if (!wordOption) {
      return 'btnColorInactive'
    }
    else {
      return 'btnColorActive'
    }
  })

  //function to generate phrase
  const generatephrase = (noofWord = numberofWord) => {
    let phrase = generate({ minLength: 1, maxLength: 7, exactly: noofWord })
    console.log("timer calue: ", wordOption);
    setPhrase(phrase)
    setwordPosition(0)
    setletterPosition(0)
    setWordLength(phrase[0].length)
    setWord(phrase[0])
    setLineBreakIndex(0)
    setCursorPosition(0)
    setTimer(false)
    setWordCounter(0)
    setNumberofWord(noofWord)
    numberofCorrectLetter.current = 0
    numberofIncorrectLetter.current = 0
    setPointerPosition(0)
    clearInterval(interval)
    clearTimeout(timeout)
    setDisplayResultWindow(false)
    setLetterState({
      type: 'INIT'
    })
    // setChildBtnColor(["btnColorInactive","btnColorActive","btnColorInactive","btnColorInactive"])
    // typingWindowRef.current.children[1].style.color = "none"
    // let letterEle = document.querySelectorAll('.letter');
    // for (let l of letterEle) {
    //   l.style.color = 'gray'
    // }


    // }

  }

  useEffect(() => {
    generatephrase()
  }, [])

  useEffect(() => {
    localStorage.setItem("isUserPreferTypingBasedOnWord", JSON.stringify(wordOption))
    localStorage.setItem("numberOfWordPreference", JSON.stringify(numberofWord))
    localStorage.setItem("timerValue", JSON.stringify(timerValue))
  }, [wordOption, numberofWord, timerValue]);



  return (
    <div>
      { displayResultWindow ? <ResultWindow
        numberofCorrectLetter={numberofCorrectLetter}
        numberofIncorrectLetter={numberofIncorrectLetter} wpm={wpm} numberofExtraLetter={numberofExtraLetter}
        numberofMissedLetter={numberofMissedLetter} wordOption={wordOption}
        numberofWord={numberofWord} timerValue={timerValue}></ResultWindow> : <div><div className="typingWindow">
          <FeatureComponent generatePhrase={generatephrase} wordOption={wordOption} setwordOption={setwordOption}
            childBtnColor={childBtnColor} setChildBtnColor={setChildBtnColor} setNumberofWord={setNumberofWord}
            setTimerValue={setTimerValue} setTimerCounter={setTimerCounter} interval={interval} setIntervalValue={setIntervalValue} timeout={timeout}
            setTimeOut={setTimeOut} timerbtnColor={timerbtnColor} setTimerBtnColor={setTimerBtnColor}
            setWordBtnColor={setWordBtnColor} wordbtnColor={wordbtnColor}
          ></FeatureComponent>
        </div>
          <StatusComponent wordOption={wordOption} timer={timer} wordCounter={wordCounter}
            numberofWord={numberofWord} timerCounter={timerCounter} setIntervalValue={setIntervalValue} 
            setTimerCounter={setTimerCounter} interval={interval} phrase={phrase}></StatusComponent>
          <div id="typingBoxContainer">

            <TypingBox phrase={phrase} setPhrase={setPhrase} wordPosition={wordPosition} setwordPosition={setwordPosition}
              setletterPosition={setletterPosition} setWordLength={setWordLength} setWord={setWord}
              setCursorPosition={setCursorPosition} letterPosition={letterPosition} wordLength={wordLength} word={word}
              cursorPosition={cursorPosition} startTime={startTime} letterState={letterState} setLetterState={setLetterState}
              lineBreakIndex={lineBreakIndex} setLineBreakIndex={setLineBreakIndex} numberofWord={numberofWord}
              wordOption={wordOption} timerValue={timerValue} numberofCorrectLetter={numberofCorrectLetter}
              numberofIncorrectLetter={numberofIncorrectLetter} setTimer={setTimer} setTimerValue={setTimerValue}
              setWordCounter={setWordCounter} setDisplayResultWindow={setDisplayResultWindow} setWpm={setWpm}
              numberofExtraLetter={numberofExtraLetter} numberofMissedLetter={numberofMissedLetter}
              setTimerCounter={setTimerCounter} interval={interval} setIntervalValue={setIntervalValue} timeout={timeout}
              setTimeOut={setTimeOut} setPointerPosition={setPointerPosition} pointerPosition={pointerPosition}></TypingBox>
          </div>
        </div>
      }
      <div onKeyDown={() => generatephrase()} onClick={() => generatephrase()} tabIndex={0} style={{padding: "10px", marginInline:"auto", maxWidth:"fit-content"}}>
        <ButtonIcon></ButtonIcon>
      </div>

    </div>



  )
}
