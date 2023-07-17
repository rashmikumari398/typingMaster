import React, { useEffect, useRef } from 'react'
import './TypingWindow.css'

export default function TypingBox(props) {

  const typingboxStyle = useRef(null)
  const letterRef = useRef(0)
  //function to highlight phrase
  const StoreText = (event) => {
    // console.log(event);
    // typingboxStyle.current.className.backgroundColor = "white"
    
    // // typingboxStyle.current.focus()
    // console.log(props.cursorPosition);
    // console.log(props.phrasePostition);
    // console.log(props.wordPosition);
    // console.log(props.wordLength);
    // console.log(props.word[props.wordPosition]);
    // console.log(event.key);

    let endTime, totalTime
    if (props.phrasePostition == 0 && props.wordPosition == 0) {
      props.setStartTime(Date.now())
    }

    if (props.phrasePostition == props.phrase.length - 1 && props.wordPosition == props.wordLength - 1) {
      endTime = Date.now()
      console.log("end ", props.startTime);
      totalTime = Date.now() - props.startTime
      console.log('totalTime: ', totalTime);
      totalTime = totalTime / 1000
      totalTime = totalTime / (60)
      console.log('totalTime: ', totalTime);
      console.log("wpm: ", props.phrase.length / totalTime);
    }

    // let letterEle = document.querySelectorAll('.letter')
    if (props.wordPosition < props.wordLength && event.key !== ' ' && event.key !== 'Backspace' && event.key !== 'Enter') {
      props.setWordPosition(prev => prev + 1)
      props.setCursorPosition(prev => prev + 1)
      if (props.word[props.wordPosition] == event.key) {
        // letterEle[props.cursorPosition].style.color = "black"
        // typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition].style.color="black"
        typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition].classList.add('correct')

      }
      else {
        // letterEle[props.cursorPosition].style.color = "red"
        // typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition].style.color="red"
        typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition].classList.add('error')
      }
    }
    else if (event.key == ' ' || props.wordPosition > props.wordLength) {
      props.setPhrasePosition(prev => prev + 1)
      props.setWordPosition(0)
      props.setWordLength(props.phrase[props.phrasePostition + 1].length)
      props.setWord(props.phrase[props.phrasePostition + 1])
      if (props.wordPosition !== props.wordLength) {
        let diff = (props.wordLength) - props.wordPosition
        props.setCursorPosition(props.cursorPosition + diff)
      }
    }
    else if (event.key == 'Backspace' && props.wordPosition>0) {
      props.setWordPosition(prev => prev - 1)
      // letterEle[props.cursorPosition - 1].style.color = "gray"
      console.log("word position: ",props.wordPosition)
      // typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition-1].style.color="gray"
      let classname = typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition-1].classList[1]
      typingboxStyle.current.children[props.phrasePostition].children[props.wordPosition-1].classList.remove(classname)

      props.setCursorPosition(props.cursorPosition - 1)
    }



  }

  useEffect(()=>{
    typingboxStyle.current.focus()
  })

  

  return (
    <div ref={typingboxStyle} onClick={()=>typingboxStyle.current.focus()} className='typingBox' onKeyDown={(event) => StoreText(event)} tabIndex='0'>
      {props.phrase.map((word) => {
        let letterEle = word.split('')
        return (<div className="word">{letterEle.map(letter => <div className="letter">{letter}</div>)}</div>)
      })}
    </div>
  )
}
