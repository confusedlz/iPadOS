import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Status from './status/status';
import Nav from './nav/nav';
import Notebook from './notebook/notebook';
import Setup from './setup/setup';
import Message from './message/message';
import PhotoAlbum from './photoAlbum/photoAlbum';
import AppContainer from './appContainer/appContainer';
import LockScreen from './lockScreen/lockScreen';
import AppStore from './appStore/appStore';
import wallpaper1 from '../public/img/wallpaper/wallpaper1.jpg';
import wallpaper2 from '../public/img/wallpaper/wallpaper2.jpg';
import wallpaper3 from '../public/img/wallpaper/wallpaper3.jpg';
import Controller from './controller/controller';
class Ipad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            rouse:'',
            close:false,
            message:'',
            display:false,
            color:'#ffffff',
            backgroundUrl: wallpaper2,
            apps:[
                {name:'天猫',url:'https://www.tmall.com',img:"https://qcv9se.file.qingfuwucdn.com/file/297f1ce4bcc1b2d5_1645017201904.jpg"},
                {name:'掘金',url:'https://www.juejin.cn',img:"https://qcv9se.file.qingfuwucdn.com/file/c7021bc21078df7e_1645017190996.jpg"},
                {name:'淘宝',url:'https://www.taobao.com',img:"https://qcv9se.file.qingfuwucdn.com/file/2e043f780a8927ee_1645017197806.jpg"},
                {name:'百度',url:'https://baidu.com',img:"https://qcv9se.file.qingfuwucdn.com/file/184089bdbafab94f_1645017125115.jpg"},
                {name:'哔哩哔哩',url:'https://www.bilibili.com',img:"https://qcv9se.file.qingfuwucdn.com/file/1883b8cded0c79de_1645017176061.jpg"},
                {name:'字节跳动',url:'https://www.bytedance.com',img:"https://qcv9se.file.qingfuwucdn.com/file/a15a9f1c309a46c8_1645017181569.jpg"},
                {name:'京东',url:'https://www.jd.com',img:'https://qcv9se.file.qingfuwucdn.com/file/62fceb7759010b90_1645017186649.png'},
            ],
            photos: [
                wallpaper1,
                wallpaper2,
                wallpaper3,
            ],
        };
        this.change_module=this.change_module.bind(this);
        this.newMessage=this.newMessage.bind(this);
        this.changeBackground=this.changeBackground.bind(this);
        this.changeColor=this.changeColor.bind(this);
        this.displayLockScreen=this.displayLockScreen.bind(this);
        this.installAPP=this.installAPP.bind(this);
        this.updataUser=this.updataUser.bind(this);
        this.changeClose=this.changeClose.bind(this);
    }

    componentDidMount() {//初始化显示
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        if(localStorage.getItem('background')) this.setState({backgroundUrl:localStorage.getItem('background')});
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //添加APP
    installAPP(name,url){
        this.setState({apps:[...this.state.apps,{name:name,url:url,img:''}]});
    }

    //更新时间
    tick() {
        this.setState({
            date: new Date()
        });
    }

    //唤醒组件
    change_module(module){
        this.setState({rouse:module,color:'black'});
        setTimeout(()=>{this.setState({rouse:''})},100);
    }

    //更改状态栏颜色
    changeColor(){
        this.setState({color:'#ffffff'});
    }

    //消息提示
    newMessage(news){
        this.setState({message:news});
        setTimeout(()=>{this.setState({message:''});},1500);
    }

    //更换壁纸
    changeBackground(src){
        this.setState({backgroundUrl:src});
        localStorage.setItem('background',src);
    }

    //锁屏
    displayLockScreen(){
        this.setState({display:true});
        setTimeout(()=>{this.setState({display:false})},100);
    }

    //更新数据（图片，APP）
    updataUser(flag,photos,apps){
        if(flag){
            if(apps) this.setState({ apps: [...this.state.apps, ...apps] });
            if(photos) this.setState({photos:[...this.state.photos,...photos]});
        }
        else{
            this.setState({ apps: [...this.state.apps.slice(0,7)],photos:[...this.state.photos.slice(0,3)] });
        }
        
    }

    changeClose(){
        this.changeColor();
        this.setState({close:true});
        setTimeout(()=>{this.setState({close:false})},100);
    }

    render() {
        return (
            <main style={{backgroundImage:'url('+this.state.backgroundUrl+')'}}>
                {/* 锁屏界面 */}
                <LockScreen date={this.state.date} display={this.state.display} backgroundImage={this.state.backgroundUrl}/>
                {/* 顶部状态栏 */}
                <Status date={this.state.date} fontColor={this.state.color} displayLockScreen={this.displayLockScreen}/>
                {/* 消息提示 */}
                <Message message={this.state.message}/>
                {/* 屏幕显示App */}
                <AppContainer apps={this.state.apps}/>
                {/* 主体应用 */}
                <PhotoAlbum close={this.state.close} updataUser={this.updataUser} photos={this.state.photos} message={this.newMessage} changeColor={this.changeColor} rouse={this.state.rouse} changeBackground={this.changeBackground}/>
                <Notebook close={this.state.close} date={this.state.date} changeColor={this.changeColor} rouse={this.state.rouse}/>
                <AppStore close={this.state.close} installAPP={this.installAPP} apps={this.state.apps} rouse={this.state.rouse} changeColor={this.changeColor} message={this.newMessage}/>
                <Setup close={this.state.close} updataUser={this.updataUser} rouse={this.state.rouse} changeColor={this.changeColor} message={this.newMessage}/>
                {/* 底部导航 */}
                <Nav change_module={this.change_module}/>

                <Controller changeClose={this.changeClose} color={this.state.color}/>
            </main>
        )
    };
}

ReactDOM.render(
    <Ipad />,
    document.getElementById('root')
);