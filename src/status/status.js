import React from 'react';
import './status.css'

//顶部状态栏组件
class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            30000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //更新时间
    tick() {
        this.setState({
            date: new Date()
        });
    }

    // 获取星期
    getDay(day) {
        const week = ['日', '一', '二', '三', '四', '五', '六'];
        return week[day];
    }

    //格式化分钟
    format(minute){
        if(minute<10) return '0'+minute;
        else return minute;
    }

    render() {
        return (
            <div className='status'>
                <div className='left'>
                    <div className='time'>
                        <span>{this.state.date.getHours()}:{this.format(this.state.date.getMinutes())}   </span>
                        <span>{this.state.date.getMonth()}月{this.state.date.getDate()}日</span>
                        <span>周{this.getDay(this.state.date.getDay())}</span>
                    </div>
                </div>
                <div className='right'>
                    <span className="iconfont icon-wifi"></span>
                    <span>80%</span>
                    <span className="iconfont icon-80dianliang"></span>
                </div>
            </div>
        )
    }
}

export default Status;