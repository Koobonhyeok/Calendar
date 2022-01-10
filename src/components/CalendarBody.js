/* eslint-disable */
import React from "react";
import moment from 'moment';

function CalendarBody(props){

    function Week( monthYear ){
        const firstDayOfMonth = moment(monthYear).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');
        const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
        
        const _Weeks = [];
        let days = "";

        if( props.scedule.length !== 0 ){
            
            props.scedule.map((data, index)=>(console.log(data.title ) ))
        }
        
        console.log(days)
        for( let i = 0; i<6; i++){
            _Weeks.push((
                <Draw 
                    key={`RCA-calendar-week-${i}`}
                    ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")} 
                    DayOfThisWeekformat={firstDayOfWeek.clone().add('d', i *7).format("YYYY-MM-DD")}
                    days={days}
                />
            ))
        }
        return _Weeks;
    }

    return (
        <div className="RCA-calendar-container">
            <DateHeader />
            {Week(moment(props.YM).format("YYYY MM"))}
        </div>
    );
}

function DateHeader( props ){
    function dateToArray(dates){
        
        if(Array.isArray(dates)){
            return dates
        }else if(typeof dates === "string"){
            return dates.split(',')
        }else{
            return ["일", "월","화","수","목","금","토"]
        }
    }

    function mapArrayToDate(dateArray){
        try{
            if(dateArray.length !== 7){
              console.log(new Error("dates props must be had 7 date"))
              dateArray = ["일", "월", "화", "수", "목", "금", "토"]
            }
            
            return dateArray.map((date, index) => {
              const className = ()=>{
                let className = "RCA-calendar-date-component";
                if(index === 0){
                  return className + " date-sun"
                }else if(index === 6){
                  return className + " date-sat"
                }else{
                  return className + " date-weekday"
                }
              }
              return (
                <div className={className()} key={"RCA-header-"+date}>
                  {date}
                </div>
              )
            })
          }catch{
            throw new Error ("date must be string or component")
          }
    }

    return (
        <div className="RCA-calendar-date-header">
            { mapArrayToDate(dateToArray(props.week)) }
        </div>
    )
}

function Draw(props){
    
    function Days( firstDayFormat ){
      
      const _days = [];
      
    //   console.log(props.days.indexOf('202111228'))

      for (let i = 0; i < 7; i++) {
        
        const Day = moment(firstDayFormat).add('d', i);
        let include = 0;
        if( props.days.indexOf(Day.format("YYYYMMDD")) != -1 ){
            include = 1;
        }
        _days.push({
          yearMonthDayFormat: Day.format("YYYY-MM-DD"),
          getDay: Day.format('D'),
          isHolyDay: false,
          include:include
        });
      }

      return _days;
    }
    
    function mapDaysToComponents( Days, calendarMonthYear ){
        const thisMonth = moment(calendarMonthYear);
        
        return Days.map((dayInfo, i) => {
        
          let className = "date-weekday-label";
          
          if(!thisMonth.isSame(dayInfo.yearMonthDayFormat,'month')){
              className = "date-notThisMonth";
          }else if (i === 0) {
            className = "date-sun";
          } else if (i === 6) {
            className = "date-sat"
          }

          let include = "notInclude";
          if( dayInfo.include === 1 ){
            include = "include";
          }
          
          return (
              // onClick={() => fn(dayInfo.yearMonthDayFormat) }
              // ()=>{this.props.moveMonth(-1)}
            <div className={"RCA-calendar-day " + className} key={i}>
              <label className={"RCA-calendar-day " + include}>
                {dayInfo.getDay}
              </label>
            </div>
          )
        })
    }
    
    return(
        <div className={"RCA-calendar-week"} >
            {mapDaysToComponents(Days( props.DayOfThisWeekformat),props.ymOfThisCalendar )}
        </div>
    )
}

export default CalendarBody;