import React from "react";
import request from "../../API/request/request";

class Scheduleitems extends React.Component {
    constructor(props) {
        super(props);
        this.display=this.display.bind(this);
    }

    //删除事项
    delete() {
        const id=this.props.id;
        request('deleteSchedule', {
            id
        }).then(res => {
            if (res.success) {
                this.props.changestate(id,this.props.flag,false)
            }
        });
    }

    //事件状态修改
    finishSchedule(){
        const id=this.props.id;
        const flag=!this.props.flag;
        request('changeSchedule', {
            id,
            flag
        }).then(res => {
            if (res.success) {
                this.props.changestate(id,!flag,false);
                this.props.changestate([id,this.props.value],flag,true);
            }
        });
    }

    //显示不同事项
    display() {
        if (!this.props.flag) {
            return (
                <div className="scheduleitems">
                    <input type='checkbox' onClick={() => this.finishSchedule()}></input>
                    <label></label>
                    <p>{this.props.value}</p>
                    <div onClick={() => this.delete()} className="delete"><i className="iconfont icon-shanchu"></i></div>
                </div>
            )
        }
        else return (
            <div className="todoListitems">
                <input type='checkbox' onClick={() => this.finishSchedule()} defaultChecked></input>
                <label></label>
                <p>{this.props.value}</p>
                <div onClick={() => this.delete()} className="delete"><i className="iconfont icon-shanchu"></i></div>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.display()}
            </>
        );
    }
}

export default Scheduleitems;