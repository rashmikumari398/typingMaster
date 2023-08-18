import React, { useEffect, useRef, useState, useReducer } from 'react'
import { generate, count } from 'random-words'
import '../TypingWindow.css'
import TypingBox from './TypingBox'
// import ButtonComponent from './ButtonComponent';
import ButtonIcon from './ButtonIcon'
import FeatureComponent from './FeatureComponent';
import ResultWindow from './ResultWindow'

export default function TypingWindow() {

  function handleLetterStateChange(state, action) {
    if (action.type == 'INIT') {
      return phrase.map((word) => [...word].map(() => ''))
    }
    else if (action.type == 'INITREFRESH') {
      return state.slice(action.payload.position + 1)
    }
    else if (action.type == 'CORRECT') {
      state[action.payload.wordPos][action.payload.letterPos] = ' correct';
      return state;
    }
    else if (action.type == 'INCORRECT') {
      state[action.payload.wordPos][action.payload.letterPos] = ' error';
      return state;
    }
    else if (action.type == 'REMOVEANDUPDATE') {
      state[action.payload.wordPos][action.payload.letterPos] = ' active';
      state[action.payload.wordPos][action.payload.letterPos + 1] = '';
      return state;
    }
    else if (action.type == 'REMOVE') {
      // state[action.payload.wordPos][action.payload.letterPos] = 'active';
      state[action.payload.wordPos][action.payload.letterPos] = '';
      return state;
    }
    else if (action.type == 'ACTIVE') {
      state[action.payload.wordPos][action.payload.letterPos] = ' active';
      return state
    }
    else if(action.type=='ADDEXTRALETTER'){
      state[action.payload.wordPos][action.payload.letterPos] =' extra-error'
      state[action.payload.wordPos][action.payload.letterPos+1]=' active'
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
  const [timerOption, setTimerOption] = useState(false)
  const [childBtnColor, setChildBtnColor] = useState(["btnColorInactive", "btnColorActive", "btnColorInactive", "btnColorInactive"])
  const [numberofWord, setNumberofWord] = useState(25)
  const [lineBreakIndex, setLineBreakIndex] = useState()
  const [timerValue, setTimerValue] = useState(30)
  const [timer, setTimer] = useState(false)
  const numberofCorrectLetter = useRef(null)
  const numberofIncorrectLetter = useRef(null)
  const numberofExtraLetter = useRef(null)
  const numberofMissedLetter = useRef(null)
  const [wpm,setWpm] = useState(0)
  const [wordCounter, setWordCounter] = useState(0)
  const [displayResultWindow, setDisplayResultWindow] = useState(false)

  //function to generate phrase
  const generatephrase = (noofWord = numberofWord) => {
    let phrase = generate({ minLength: 1, maxLength: 7, exactly: noofWord })
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
    numberofCorrectLetter.current=0
    numberofIncorrectLetter.current=0
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

  const typingWindow = ''


  return (
    <div>
      { displayResultWindow ? <ResultWindow
      numberofCorrectLetter={numberofCorrectLetter}
      numberofIncorrectLetter={numberofIncorrectLetter} wpm={wpm} numberofExtraLetter={numberofExtraLetter}
      numberofMissedLetter={numberofMissedLetter}></ResultWindow> : <div className="typingWindow"><div>
        <FeatureComponent generatePhrase={generatephrase} timerOption={timerOption} setTimerOption={setTimerOption}
          childBtnColor={childBtnColor} setChildBtnColor={setChildBtnColor} setNumberofWord={setNumberofWord}
          setTimerValue={setTimerValue}
        ></FeatureComponent>
      </div>
        <div id='displayProgressContainer'>
          {timerOption ? (timer ? `${wordCounter}/${numberofWord}` : '') : (timer ? timerValue : '')}
        </div>
        <div id="typingBoxContainer">
          <TypingBox phrase={phrase} setPhrase={setPhrase} wordPosition={wordPosition} setwordPosition={setwordPosition}
            setletterPosition={setletterPosition} setWordLength={setWordLength} setWord={setWord}
            setCursorPosition={setCursorPosition} letterPosition={letterPosition} wordLength={wordLength} word={word}
            cursorPosition={cursorPosition} startTime={startTime} letterState={letterState} setLetterState={setLetterState}
            lineBreakIndex={lineBreakIndex} setLineBreakIndex={setLineBreakIndex} numberofWord={numberofWord}
            timerOption={timerOption} timerValue={timerValue} numberofCorrectLetter={numberofCorrectLetter}
            numberofIncorrectLetter={numberofIncorrectLetter} setTimer={setTimer} setTimerValue={setTimerValue}
            setWordCounter={setWordCounter} setDisplayResultWindow={setDisplayResultWindow} setWpm={setWpm}
            numberofExtraLetter={numberofExtraLetter} numberofMissedLetter={numberofMissedLetter}></TypingBox>
        </div>
        <div onClick={() => generatephrase()}>
          <ButtonIcon></ButtonIcon>
        </div>
      </div>
      }
    </div>



  )
}
