/* eslint-disable */
import React, {useState, useEffect} from 'react'
import moment from 'moment'

function CalendarHeader(props){
    let [YM, changeYM] = useState(moment(props.calendar).format("YYYY MM"));
    let [today, changeToday] = useState(moment().format("YYYY-MM-DD"))
    useEffect(()=>{
        changeYM( moment(props.calendar).format("YYYY MM") )
    })

    return (
        <div className="RCA-header-container">
            <h2 className="RCA-header-calendarYM RCA-header-middle">
                {YM}
            </h2>
            <h3 className="RCA-header-today RCA-header-middle">
                {today}
            </h3>
            <ul className="RCA-header-buttons RCA-header-middle">
                <li>
                    
                    <li>
                        <i className="move-button left-img icon" onClick={()=>{ props.moveMonthFn(-1) }} >

                        </i>
                    </li>
                    <li>
                        이동
                    </li>
                    <li>
                        <i className="move-button right-img icon" onClick={ ()=>{ props.moveMonthFn(1) } } >
                        </i>
                    </li>
                </li>
            </ul>

        </div>
    )
}

export default CalendarHeader;