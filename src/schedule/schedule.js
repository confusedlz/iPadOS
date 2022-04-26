import React from "react";
import './schedule.css';
import Display_template from "../display_template/display_template";
import todoList from '../../public/img/todolist.png';
import Scheduleitems from "./scheduleItem";
import request from "../request/request";
import loginState from '../request/user/loginState';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: new Map(),
            todoList: new Map(),
            user:{}
        };
        this.addSchedule = this.addSchedule.bind(this);
        this.add = this.add.bind(this);
        this.changestate = this.changestate.bind(this);
    }

    componentDidMount() {
        //数据初始化
        loginState().then(loginState=>{
            const user=loginState.user;
            this.setState({user:user})
            if(user){
                request('getSchedule',{uid:user.uid}).then(res => {
                    if (res.success) {
                        const schedules = new Map();
                        const todoList = new Map();
                        res.res.data.map(data => {
                            if (data.todolist) todoList.set(data._id, data.title);
                            else schedules.set(data._id, data.title);
                        });
                        this.setState({ schedules: schedules, todoList: todoList });
                    }
                });
            }
        });
        /*
        if (localStorage.getItem('expireAt') || new Date().getTime() < localStorage.getItem('expireAt')) {
            
        }*/
    }

    //修改存储数据
    changestate(data, flag, add) {
        const datas = new Map();
        let olddatas;
        if (!flag) olddatas = this.state.schedules;
        else olddatas = this.state.todoList;
        if (add) {
            olddatas.forEach((val, key) => {
                datas.set(key, val);
            });
            datas.set(data[0], data[1]);
        }
        else {
            olddatas.forEach((val, key) => {
                if (key != data) datas.set(key, val);
            });
        }
        // console.log(data, flag, add, datas);
        if (!flag) this.setState({ schedules: datas });
        else this.setState({ todoList: datas });
    }

    //添加代办事项
    addSchedule(ev) {
        ev.preventDefault();
        if (!this.state.user) {
            this.props.message('请先登录');
            return;
        }
        const title = ev.target[0].value;
        request('addSchedule', {
            title,uid:this.state.user.uid
        }).then(res => {
            if (res.success) {
                this.props.message('添加成功');
                const schedules = new Map();
                this.state.schedules.forEach((val, key) => {
                    schedules.set(key, val);
                });
                schedules.set(res.res.id, title);
                this.setState({ schedules: schedules });
            }
            else {
                this.props.message('添加失败' + res.message);
            }
        });
    }

    //事项显示(数据转换)
    add(map) {
        const datas = [];
        map.forEach((val, key) => {
            datas.push([val, key]);
        });
        return datas;
    }

    //清空
    clear(){
        request('clearSchedule',{uid:this.state.user.uid}).then(res => {
            if (res.success) {
                this.props.message('清空成功');
                this.setState({schedules:new Map(),todoList:new Map()});
            }
        });
        
    }

    render() {
        return (
            <Display_template
                close={this.props.close}
                rouse={this.props.rouse}
                changeColor={this.props.changeColor}
                name='Schedule'
                title='代办事项'
                background_color='#F3F2F8'
                catalogue={
                    <div>
                        {this.state.schedules.size ?
                            <div className="scheduleMain">
                                <h3>您拥有{this.state.schedules.size}条待办事项</h3>
                                {this.add(this.state.schedules).map(val => {
                                    return <Scheduleitems changestate={this.changestate} key={val[1]} id={val[1]} value={val[0]} flag={false} />;
                                })}
                            </div>
                            : null}
                        {this.state.todoList.size > 0 ?
                            <div className="todoList">
                                <h3>已完成事项:{((this.state.todoList.size)/(this.state.schedules.size+this.state.todoList.size)*100).toFixed()}%</h3>
                                {this.add(this.state.todoList).map(val => {
                                    return <Scheduleitems changestate={this.changestate} key={val[1]} id={val[1]} value={val[0]} flag={true} />;;
                                })}
                            </div>
                            : null}
                        {this.state.todoList.size+this.state.schedules.size>0?
                            <div className="clear"><span onClick={()=>this.clear()}>清除所有</span></div>
                        :null}
                    </div>
                }
                content={
                    <div className='addSchedule' >
                        <div className="addScheduleStatus">
                            <strong>添加代办事项</strong>
                        </div>
                        <form className="addScheduleInfo" onSubmit={ev => this.addSchedule(ev)}>
                            <label>
                                <p>代办事项</p>
                                <input type='text' name='title' required />
                            </label>
                            <button type="submit">添加</button>
                        </form>
                        <div className="addScheduleTips">
                            <img src={todoList} alt="todoList"></img>
                            <p>快来添加你的代办事项吧</p>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default Schedule;