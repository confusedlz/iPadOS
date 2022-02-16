import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Status from './status/status';
import Nav from './nav/nav';
import Notebook from './notebook/notebook';
import Setup from './setup/setup';
import Message from './message/message';
import PhotoAlbum from './photoAlbum/photoAlbum';
class Ipad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            rouse:'',
            message:'',
            backgroundUrl:'https://qcv9se.file.qingfuwucdn.com/file/2bb03faea56df0ef_1644985251802.jpg',
        };
        this.change_module=this.change_module.bind(this);
        this.newMessage=this.newMessage.bind(this);
        this.changeBackground=this.changeBackground.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
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

    //唤醒组件
    change_module(module){
        this.setState({rouse:module});
        setTimeout(()=>{this.setState({rouse:''})},100);
    }

    //消息提示
    newMessage(news){
        this.setState({message:news});
        setTimeout(()=>{this.setState({message:''});},1000);
    }

    //更换壁纸
    changeBackground(src){
        this.setState({backgroundUrl:src});
    }

    render() {
        return (
            <main style={{backgroundImage:'url('+this.state.backgroundUrl+')'}}>
                <Status date={this.state.date}/>
                <Message message={this.state.message}/>
                <PhotoAlbum message={this.newMessage} rouse={this.state.rouse} changeBackground={this.changeBackground}/>
                <Notebook date={this.state.date} rouse={this.state.rouse}/>
                <Setup rouse={this.state.rouse} message={this.newMessage}/>
                <Nav change_module={this.change_module}/>
            </main>
        )
    };
}

ReactDOM.render(
    <Ipad />,
    document.getElementById('app')
);