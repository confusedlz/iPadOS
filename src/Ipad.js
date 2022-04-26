import React from 'react';
import './Ipad.css';
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
import AppManagement from './appManagement/appManagement';
import Schedule from './schedule/schedule';
import request from './request/request';
import loginState from './request/user/loginState';
import { unstable_ClassNameGenerator } from '@mui/material/className';
unstable_ClassNameGenerator.configure((componentName) => componentName.replace('Mui', ''));

class Ipad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            load: new Set(),
            rouse: '',//唤醒某个应用
            close: false,//是否隐藏应用
            message: '',//消息提示
            display: false,//锁屏
            color: '#ffffff',//状态栏字体颜色
            backgroundUrl: wallpaper2,//背景图片
            appManagement: false,//管理状态栏是否显示
            //已安装的app数据
            apps: [
                { name: '天猫', url: 'https://www.tmall.com', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/tmall.com.jpg?sign=c4e582a4284f21bf2593bfebced9925e&t=1650963411" },
                { name: '掘金', url: 'https://www.juejin.cn', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/juejin.im.jpg?sign=74b1cf2e879fc2d745445c0df1c740e3&t=1650963368" },
                { name: '淘宝', url: 'https://www.taobao.com', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/taobao.com.jpg?sign=0a114f99a67ab9580629204c6e26bb22&t=1650963381" },
                { name: '百度', url: 'https://baidu.com', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/baidu.com.jpg?sign=254d3513005cb3cafd427f080c56c00b&t=1650963307" },
                { name: '哔哩哔哩', url: 'https://www.bilibili.com', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/bilibili.com.jpg?sign=d74976bd0d32f0cdf2b16be681d925b4&t=1650963326" },
                { name: '字节跳动', url: 'https://www.bytedance.com', img: "https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/bytedance.com.jpg?sign=ba23ef22b64d1af81b687197d014c0fc&t=1650963339" },
                { name: '京东', url: 'https://www.jd.com', img: 'https://6970-ipad-2gf1azug01855b03-1304065141.tcb.qcloud.la/apps/jd.png?sign=1620e4987ddaf28d26a531a64a29fb0d&t=1650963355' },
            ],
            //已存在的图片数据
            photos: [
                wallpaper1,
                wallpaper2,
                wallpaper3,
            ],
        };
        this.change_module = this.change_module.bind(this);
        this.newMessage = this.newMessage.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.displayLockScreen = this.displayLockScreen.bind(this);
        this.installAPP = this.installAPP.bind(this);
        this.updataUser = this.updataUser.bind(this);
        this.changeClose = this.changeClose.bind(this);
        this.closeModule = this.closeModule.bind(this);
        this.changeAppManagement = this.changeAppManagement.bind(this);
        this.unInstall = this.unInstall.bind(this);
    }

    componentDidMount() {//初始化显示
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        loginState().then(loginState => {
            if (loginState) {
                request('getUserPhotosApps', { uid: loginState.user.uid }).then(res => {
                    if (res.success) {
                        if (res.data) this.setState({ apps: [...this.state.apps, ...res.data] });
                        if (res.photosFile) {
                            const photos = [];
                            for (const value of res.photosFile) {
                                photos.push(value.tempFileURL);
                            }
                            this.setState({ photos: [...this.state.photos, ...photos] })
                        }
                    }
                });
            }
        });
        if (localStorage.getItem('background')) this.setState({ backgroundUrl: localStorage.getItem('background') });
        /*
    //根据用户是否登录进行初始化 
    request('getUserInfo').then(res => {
        if (res.user) {
            localStorage.setItem('expireAt', res.user.expireAt);
            if (res.user.backgroundimgid) {//如果用户有上传的照片便加载
                this.updataUser(true, res.user.backgroundimgid);
                localStorage.setItem('photos', JSON.stringify(res.user.backgroundimgid));
            }
        }
    });*/

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

    //添加APP
    installAPP(_id, name, url) {
        this.setState({ apps: [...this.state.apps, { _id: _id, name: name, url: url, img: '' }] });
    }

    //唤醒应用
    async change_module(module) {
        await this.state.load.has(module) ? null : this.setState({ load: this.state.load.add(module) });
        await this.setState({ rouse: module, color: 'black' });
        await this.setState({ rouse: '' });
    }

    //关闭应用
    closeModule(module) {
        const load = new Set();
        this.state.load.forEach((val) => {
            if (val != module) load.add(val);
        });
        this.setState({ load: load });
    }

    //卸载应用
    unInstall(id) {
        const apps = [];
        this.state.apps.forEach(v => {
            if (!v._id || v._id != id) apps.push(v);
        });
        this.setState({ apps: apps });
    }

    //隐藏应用
    async changeClose() {
        this.changeColor();
        await this.setState({ close: true });
        this.setState({ close: false })
    }

    //更改状态栏颜色
    changeColor() {
        this.setState({ color: '#ffffff' });
    }

    //消息提示
    newMessage(news) {
        this.setState({ message: news });
        setTimeout(() => { this.setState({ message: '' }); }, 1500);
    }

    //更换壁纸
    changeBackground(src) {
        this.setState({ backgroundUrl: src });
        localStorage.setItem('background', src);
    }

    //锁屏
    displayLockScreen(flag) {
        this.setState({ display: flag });
    }

    //更新数据（图片，APP）
    updataUser(flag, photos, apps) {
        if (flag) {
            if (apps) this.setState({ apps: apps });
            if (photos) this.setState({ photos: [...this.state.photos, ...photos] });
        }
        else {
            this.setState({
                apps: [...this.state.apps.slice(0, 7)], photos: [...this.state.photos.slice(0, 3)]
            });
        }

    }

    //显示或关闭应用管理栏
    changeAppManagement(flag) {
        this.setState({ appManagement: flag });
    }

    render() {
        return (
            <main style={{ backgroundImage: 'url(' + this.state.backgroundUrl + ')' }}>
                {/* 锁屏界面 */}
                {this.state.display ? <LockScreen date={this.state.date} displayLockScreen={this.displayLockScreen} backgroundImage={this.state.backgroundUrl} /> : null}

                {/* 主体 */}

                {/* 顶部状态栏 */}
                <Status date={this.state.date} fontColor={this.state.color} displayLockScreen={this.displayLockScreen} />
                {/* 消息提示 */}
                {this.state.message != '' ? <Message message={this.state.message} /> : null}
                {/* 屏幕显示App */}
                <AppContainer apps={this.state.apps} />

                {/* 应用管理栏 */}
                {this.state.appManagement ? <AppManagement change_module={this.change_module} changeAppManagement={this.changeAppManagement} closeModule={this.closeModule} load={this.state.load} apps={this.state.apps} date={this.state.date} photos={this.state.photos} /> : null}

                {/* 主体应用 */}
                {this.state.load.has('PhotoAlbum') ? <PhotoAlbum close={this.state.close} updataUser={this.updataUser} photos={this.state.photos} message={this.newMessage} changeColor={this.changeColor} rouse={this.state.rouse} changeBackground={this.changeBackground} /> : null}
                {this.state.load.has('Notebook') ? <Notebook close={this.state.close} date={this.state.date} changeColor={this.changeColor} rouse={this.state.rouse} message={this.newMessage} /> : null}
                {this.state.load.has('AppStore') ? <AppStore unInstall={this.unInstall} close={this.state.close} installAPP={this.installAPP} apps={this.state.apps} rouse={this.state.rouse} changeColor={this.changeColor} message={this.newMessage} /> : null}
                {this.state.load.has('Setup') ? <Setup closeModule={this.closeModule} close={this.state.close} updataUser={this.updataUser} rouse={this.state.rouse} changeColor={this.changeColor} message={this.newMessage} /> : null}
                {this.state.load.has('Schedule') ? <Schedule close={this.state.close} rouse={this.state.rouse} changeColor={this.changeColor} message={this.newMessage} /> : null}

                {/* 底部导航 */}
                <Nav changeAppManagement={this.changeAppManagement} change_module={this.change_module} />

                {/* 底部应用控制条 */}
                <Controller changeAppManagement={this.changeAppManagement} changeClose={this.changeClose} color={this.state.color} />
            </main>
        )
    };
}

export default Ipad;