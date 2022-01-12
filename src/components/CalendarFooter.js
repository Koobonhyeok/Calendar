import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";

function CalendarFooter(props){
    let [modify, changeModify] = useState(false);
    let [regist, changeRegist] = useState(false);

    function EmptyDate(props){
        let [title, changeTitle] = useState();
        let [contents, changeContents] = useState();

        return(
            <div>
                {
                    regist ?
                            <div>
                                <p>
                                    제목 : <input value={title} name="title" onChange={ (e)=>{ changeTitle(e.target.value) } } />
                                </p>
                                <p>
                                    내용 : <input value={contents} name="contents" onChange={ (e)=>{ changeContents(e.target.value) } } />
                                </p>
                                <p>
                                    <button onClick={ ()=>{ Regist(title, contents)} }>등록</button>
                                    <button onClick={ ()=>{ changeRegist(!regist)} }>취소</button>
                                </p>
                            </div>
                            : 
                            <div>
                                <b>저장된 일정이 없습니다.</b> 
                                <p><button onClick={ ()=>{ changeRegist(!regist)} }>추가</button></p>
                            </div>
                }
                
            </div>
        )
    }

    function Regist(title, contents){
        const date = moment(props.date).format("YYYYMMDD");
        let url = "http://52.79.235.2:8080/api/scheduleRegist?day="+date+"&title="+title+"&contents="+contents
        axios.get(url).then( (res)=>{
            if( res.data.retCd === "0000" ){
                props.RegistFn(res.data.idx, date, title, contents);
            }
        } )
    }

    function NotEmptyDate(){
        let [title, changeTitle] = useState(props.choose.title);
        let [contents, changeContents] = useState(props.choose.contents);

        useEffect(()=>{
            // 수정후 text띄어주기
            changeTitle(props.choose.title)
            changeContents(props.choose.contents)
        },[]);

        return(
            <div>
                {
                    modify ? 
                            <div>
                                <p>제목 : <input value={title} onChange={ (e)=>{ changeTitle(e.target.value) } } name="title" /> </p>
                                <p>내용 : <input value={contents} onChange={ (e)=>{ changeContents(e.target.value) } } name="contents" /></p>
                                <span> 
                                    <button onClick={ ()=>{ Modify(props.choose.idx, title, contents) } }>수정</button>
                                    <button onClick={ ()=>{ changeModify(!modify) } }>취소</button> 
                                    <button onClick={ ()=>{ Delete(props.choose.idx) } }>삭제</button>
                                </span>
                            </div> :
                            <div>
                                <p>제목 : {props.choose.title}</p>
                                <p>내용 : {props.choose.contents}</p>
                                <span>
                                    <button onClick={ ()=>{ changeModify(!modify) } }>수정</button>
                                    <button onClick={ ()=>{ Delete(props.choose.idx) } }>삭제</button>
                                </span>
                            </div>
                }
            
            </div>
        )
    }

    function Delete(idx){
        let url = "http://52.79.235.2:8080/api/scheduleDelete?idx="+idx
        axios.delete(url).then( (res)=>{
            if( res.data.retCd === "0000" ){
                props.DeleteFn(idx, props.date);
            }
        } )
    }

    function Modify(idx, title, contents){
        let url = "http://52.79.235.2:8080/api/scheduleUpdate?idx="+idx+"&title="+title+"&contents="+contents;
        axios.put(url).then( (res)=>{
            if( res.data.retCd === "0000" ){
                changeModify(!Modify);
                props.ModifyFn(idx, title, contents);
            }
        } )
    }

    return (
        <div>
            <h2>{props.date}</h2>
            {
                props.choose === undefined ? <EmptyDate date={props.date} /> : <NotEmptyDate />
            }
        </div>
    )
}

export default CalendarFooter;