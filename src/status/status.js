import React from 'react';
import './status.css'
import '../../public/fonticon/iconfont.css'

//顶部状态栏组件
class Status extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dateOptions:{month: 'long', day: 'numeric' },
            timeOptions:{hour:'2-digit',minute:'2-digit'}
        };
    }

    getWeekday(){
        const str=['日','一','二','三','四','五','六'];
        return '周'+str[this.props.date.getDay()];
    }

    render() {
        return (
            <div className='status'>
                <div className='left'>
                    <div className='time'>
                        <span>{this.props.date.toLocaleTimeString([],this.state.timeOptions)}   </span>
                        <span>{this.props.date.toLocaleDateString([],this.state.dateOptions)+this.getWeekday()}</span>
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