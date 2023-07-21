import React, { useEffect, useRef, useState, useReducer } from 'react'
import { generate, count } from 'random-words'
import './TypingWindow.css'
import TypingBox from './TypingBox'
import ButtonComponent from './ButtonComponent';

export default function TypingWindow() {

  function handleLetterStateChange(state, action){
      if (action.type == 'INIT'){
        return phrase.map((word) => [[...word].map(()=>'')])
      }
      else if (action.type == 'CORRECT'){
        state[action.payload.wordPos][action.payload.letterPos] = 'correct';
        return state;
      }
      else if (action.type == 'INCORRECT'){
        state[action.payload.wordPos][action.payload.letterPos] = 'error';
        return state;
      }
      else if (action.type == 'REMOVE'){
        state[action.payload.wordPos][action.payload.letterPos] = 'active';
        state[action.payload.wordPos][action.payload.letterPos+1] = '';
        return state;
      }
      else if(action.type=='ACTIVE'){
        state[action.payload.wordPos][action.payload.letterPos] = 'active';
        return state
      }
      else{
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
  const typingWindowRef = useRef(null)
  const [letterState, setLetterState] = useReducer(handleLetterStateChange, [])

  //function to generate phrase
  const generatephrase = (event) => {
    let phrase = generate({ minLength: 1, maxLength: 7, exactly: 30 })
    setPhrase(phrase)
    setwordPosition(0)
    setletterPosition(0)
    setWordLength(phrase[0].length)
    setWord(phrase[0])
    setCursorPosition(0)
    setLetterState({
      type:'INIT'
    })
    // typingWindowRef.current.children[1].style.color = "none"
    // let letterEle = document.querySelectorAll('.letter');
    // for (let l of letterEle) {
    //   l.style.color = 'gray'
    // }


    // }

  }

  useEffect(() => {
    generatephrase()
    console.log('phrase generated')

  }, [])


  return (
    <div className="typingWindow" ref={typingWindowRef}>
      <div id='buttonContainer' onClick={generatephrase}>
        <ButtonComponent title="Generate Text"></ButtonComponent>
      </div>
      <TypingBox phrase={phrase} wordPosition={wordPosition} setwordPosition={setwordPosition}
        setletterPosition={setletterPosition} setWordLength={setWordLength} setWord={setWord}
        setCursorPosition={setCursorPosition} letterPosition={letterPosition} wordLength={wordLength} word={word} 
        cursorPosition={cursorPosition} startTime={startTime} letterState = {letterState} setLetterState = {setLetterState}></TypingBox>

    </div>
  )
}
