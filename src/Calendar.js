import React, {useState} from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import moment from "moment";

function Calendar(){
    let [calendar, changeCalendar] = useState(moment());

    function moveMonthFn(month){
        var cpCalendar = moment(calendar).add(month, 'M');
        changeCalendar(cpCalendar );
    }

    return (
        <div>
            <CalendarHeader
                calendar={calendar}
                moveMonthFn={moveMonthFn} />
            <CalendarBody 
                YM={calendar} />
        </div>
    )
}

export default Calendar;