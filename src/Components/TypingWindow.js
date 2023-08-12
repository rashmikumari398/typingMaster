import React, { useEffect, useRef, useState, useReducer } from 'react'
import { generate, count } from 'random-words'
import '../TypingWindow.css'
import TypingBox from './TypingBox'
// import ButtonComponent from './ButtonComponent';
import ButtonIcon from './ButtonIcon'
import FeatureComponent from './FeatureComponent';

export default function TypingWindow() {

  function handleLetterStateChange(state, action) {
    if (action.type == 'INIT') {
      return phrase.map((word) => [[...word].map(() => '')])
    }
    else if(action.type=='INITREFRESH'){
      return state.slice(action.payload.position+1)
    }
    else if (action.type == 'CORRECT') {
      state[action.payload.wordPos][action.payload.letterPos] = 'correct';
      return state;
    }
    else if (action.type == 'INCORRECT') {
      state[action.payload.wordPos][action.payload.letterPos] = 'error';
      return state;
    }
    else if (action.type == 'REMOVEANDUPDATE') {
      state[action.payload.wordPos][action.payload.letterPos] = 'active';
      state[action.payload.wordPos][action.payload.letterPos + 1] = '';
      return state;
    }
    else if (action.type == 'REMOVE') {
      // state[action.payload.wordPos][action.payload.letterPos] = 'active';
      state[action.payload.wordPos][action.payload.letterPos] = '';
      return state;
    }
    else if (action.type == 'ACTIVE') {
      state[action.payload.wordPos][action.payload.letterPos] = 'active';
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
  const[childBtnColor,setChildBtnColor] = useState(["btnColorInactive","btnColorActive","btnColorInactive","btnColorInactive"])
  const[numberofWord,setNumberofWord] = useState(25)
  const[lineBreakIndex,setLineBreakIndex] = useState()

  //function to generate phrase
  const generatephrase = (noofWord=numberofWord) => {
    let phrase = generate({ minLength: 1, maxLength: 7, exactly: noofWord })
    setPhrase(phrase)
    setwordPosition(0)
    setletterPosition(0)
    setWordLength(phrase[0].length)
    setWord(phrase[0])
    setCursorPosition(0)
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


  return (
    <div className="typingWindow">
      <div>
        <FeatureComponent generatePhrase = {generatephrase} timerOption={timerOption} setTimerOption={setTimerOption}
        childBtnColor={childBtnColor} setChildBtnColor={setChildBtnColor} setNumberofWord={setNumberofWord}></FeatureComponent>
      </div>
      <div id="typingBoxContainer">
        <TypingBox phrase={phrase} setPhrase={setPhrase} wordPosition={wordPosition} setwordPosition={setwordPosition}
          setletterPosition={setletterPosition} setWordLength={setWordLength} setWord={setWord}
          setCursorPosition={setCursorPosition} letterPosition={letterPosition} wordLength={wordLength} word={word}
          cursorPosition={cursorPosition} startTime={startTime} letterState={letterState} setLetterState={setLetterState}
          lineBreakIndex={lineBreakIndex} setLineBreakIndex={setLineBreakIndex}></TypingBox>
      </div>
      <div onClick={()=>generatephrase()}>
        <ButtonIcon></ButtonIcon>
      </div>

    </div>
  )
}
