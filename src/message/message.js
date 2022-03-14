import React from "react";
import './message.css';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.messageRef=React.createRef();
    }

    componentDidUpdate(){
        if(this.props.message!=''){
            this.messageRef.current.className='message messageDisplay';
        }
        else{
            this.messageRef.current.className='message';
        }
    }

    render(){
        return(
            <div className='message' ref={this.messageRef}>
                <i className="iconfont icon-tishi"></i> 
                <strong>提示：</strong>
                <span>{this.props.message}</span>
            </div>
        );
    }; 
}

export default Message;