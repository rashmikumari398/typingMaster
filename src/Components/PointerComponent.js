import React, { useEffect } from 'react'
import '../pointerComponent.css'
// import { ThemeProvider } from 'styled-components';

export default function PointerComponent({ WordRef }) {
    
    let cursorTopPosition = (WordRef.current != null ? WordRef.current.offsetTop : "-100px");
    let cursorLeftPosition= (WordRef.current != null ? ( WordRef.current.className.includes("activeRight") ? (WordRef.current.offsetLeft + WordRef.current.offsetWidth) : WordRef.current.offsetLeft) : "-100px");
    
    return (
        // <ThemeProvider>
        // style={{ position: "relative", left: pointerPosition }}
        <div className="pointer" style={{top:cursorTopPosition, left: cursorLeftPosition}}>
        </div>
        // </ThemeProvider>

    )
}
