import React, {useState, useEffect} from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import axios from 'axios';
import moment from "moment";

function Calendar(){
    let [calendar, changeCalendar] = useState(moment());
    let [scedule, changeScedule] = useState([])

    useEffect(()=>{
        getData();
    },[])

    const getData=()=>{
        let url = 'http://52.79.235.2:8080/api/getDate'
        axios.get( url ).then( (res)=>{ changeScedule(res.data) } )
    }

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
                YM={calendar}
                scedule={scedule} />
        </div>
    )
}

export default Calendar;