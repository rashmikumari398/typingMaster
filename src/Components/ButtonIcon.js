import React, { useState } from 'react'
export default function ButtonIcon(props) {
    const [color, setColor] = useState('gray')

    // const ResetTooltip = styled(({ className, ...props }) => (
    //     <Tooltip {...props} arrow classes={{ popper: className }} />
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.arrow}`]: {
    //         color: theme.palette.common.black,
    //     },
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: theme.palette.common.black,
    //         fontSize: 17
    //     },
    // }));

    // const theme = createTheme({
    //     palette: {
    //         neutral: {
    //             main: "#808080"
    //         },
    //         active: {
    //             main: "#FFFFFF"
    //         }
    //     }
    // })

    return (

        <div className="tooltip tooltip-bottom" data-tip="Restart Test">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill={color} className="bi bi-arrow-clockwise" viewBox="0 0 16 16"
                onMouseOver={() => setColor("#FFFFFF")}
                onMouseOut={() => setColor("gray")}>
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>

        </div>


    )
}
