import React, {useState} from "react";
import './notefile.css';

function Notefile(props){

    function getTime(){
        if(props.date.toLocaleDateString()===new Date().toLocaleDateString())
            if(props.date.getHours()>12) return '下午'+(props.date.getHours()-12)+':'+props.date.getMinutes();
            else return '上午'+props.date.getHours()+':'+props.date.getMinutes();
        else return props.date.toLocaleDateString();
    }

    //选中文件更新显示
    function foucs(){
        props.changFoucs(props.id,props.title,props.datas)
    }

    const deleteNotefile=()=>{
        props.deleteNotefile();
    }

    return(
        <label onClick={foucs}>
            <input type='radio' name="notefile_item" defaultChecked={props.id===props.now}/>
            <div className="notefile_item">
                <h3>{props.title!==''?props.title:'新备忘录'}</h3>
                <span className="notefile_itemData">{getTime()} {props.datas!==''?props.datas:'无附加文本'}</span>
                <div className="delete" title="删除文件" onClick={deleteNotefile}><i className="iconfont icon-shanchu"></i></div>
            </div>
        </label>
    );
}

export default Notefile;