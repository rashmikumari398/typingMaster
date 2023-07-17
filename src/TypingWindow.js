import React, { useEffect, useRef, useState } from 'react'
import { generate, count } from 'random-words'
import './TypingWindow.css'
import TypingBox from './TypingBox'
import ButtonComponent from './ButtonComponent';

export default function TypingWindow() {
  let [phrase, setPhrase] = useState([])
  const [phrasePostition, setPhrasePosition] = useState(0)
  const [wordPosition, setWordPosition] = useState(0)
  const [wordLength, setWordLength] = useState(0)
  const [word, setWord] = useState()
  const [cursorPosition, setCursorPosition] = useState(0)
  const [startTime, setStartTime] = useState()
  const typingWindowRef = useRef()
  

  //function to generate phrase
  const generatephrase = (event) => {
    let phrase = generate({ minLength: 1, maxLength: 7, exactly: 30 })
    setPhrase(phrase)
    setPhrasePosition(0)
    setWordPosition(0)
    setWordLength(phrase[0].length)
    setWord(phrase[0])
    setCursorPosition(0)
    console.log(typingWindowRef.current.children[1].childList);
    
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
    <div className="typingWindow" ref={typingWindowRef}>
      <div id='buttonContainer' onClick={generatephrase}>
        <ButtonComponent title="Generate Text"></ButtonComponent>
      </div>

      <TypingBox phrase={phrase} phrasePostition={phrasePostition} setPhrasePosition={setPhrasePosition}
        setWordPosition={setWordPosition} setWordLength={setWordLength} setWord={setWord}
        setCursorPosition={setCursorPosition} setStartTime={setStartTime}
        wordPosition={wordPosition} wordLength={wordLength} word={word} cursorPosition={cursorPosition}
        startTime={startTime} ></TypingBox>

    </div>
  )
}
