/* eslint-disable */
import React, {useState, useEffect} from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import CalendarFooter from "./components/CalendarFooter";
import axios from 'axios';
import moment from "moment";

function Calendar(){
    let [calendar, changeCalendar] = useState(moment());
    let [scedule, changeScedule] = useState([])
    let [detailScedule, changeDetailScedule] = useState([]);

    let [choose, changeChoose] = useState();

    let [footer, changeFooter] = useState(false);
    let [date, changeDate] = useState('');

    useEffect(async()=>{
        await getData();
        await getScedule();
    },[])

    const getData= async ()=>{
        let url1 = 'http://52.79.235.2:8080/api/getDate';
        await axios.get( url1 ).then( (res)=>{ changeScedule(res.data) } )
    }

    const getScedule=async()=>{
        let url2 = 'http://52.79.235.2:8080/api/getDetailSchedule';
        await axios.get( url2 ).then( (res)=>{ changeDetailScedule(res.data) } )
    }

    function moveMonthFn(month){
        var cpCalendar = moment(calendar).add(month, 'M');
        
        changeCalendar(cpCalendar );
    }
    
    function searchDate(params){
        changeDate(params);
        changeFooter(!footer);

        let data = detailScedule.find(function(res){ 
            if(res.day === moment(params).format("YYYYMMDD"))
            return res;
        }) 
        changeChoose(data);
    }
    
    function DeleteFn(idx, day){
        var deleteScedule = detailScedule.filter(data => data.idx !== idx);
        changeDetailScedule( deleteScedule );
        changeChoose();

        var deleteDate = scedule.filter(data => data.day !== moment(day).format("YYYYMMDD"))        
        changeScedule(deleteDate);
        
    }

    function ModifyFn(idx, title, contents){
        let data = detailScedule.find(function(res){ 
            if(res.idx === idx){
                res.title = title;
                res.contents = contents;
                return res
            }
        }) 
        
        changeChoose(data);
    }

    function RegistFn(idx, day, title, contents){
        let data = detailScedule;
        
        let concatData = data.concat({ contents:contents, idx:idx, title: title, day:day })
        changeDetailScedule(concatData)
        changeChoose({ contents:contents, idx:idx, title: title, day:day });

        let regDate = scedule;
        
        changeScedule(regDate.concat({day:day}))

    }

    return (
        <div>
            <CalendarHeader
                calendar={calendar}
                moveMonthFn={moveMonthFn} />
            <CalendarBody 
                YM={calendar}
                scedule={scedule}
                searchDate={searchDate} />
            {
                footer ? <CalendarFooter 
                            date={date}
                            choose={choose}
                            DeleteFn={DeleteFn}
                            ModifyFn={ModifyFn}
                            RegistFn={RegistFn} /> 
                        : null
            }
        </div>
    )
}

export default Calendar;