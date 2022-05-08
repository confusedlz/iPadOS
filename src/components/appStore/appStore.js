import React from "react";
import './appStore.css';
import Display_template from "../display_template/display_template";
import InstalledAppitem from "./installAppitem/installAppitem";
import request from "../../API/request/request";
import loginState from '../../API/request/user/loginState';

class AppStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:''
        };
        this.installApp = this.installApp.bind(this);
    }

    //安装App
    async installApp(ev) {
        ev.preventDefault();
        /*if (!localStorage.getItem('expireAt') || new Date().getTime() > localStorage.getItem('expireAt')) {
            this.props.message('请先登录');
            return;
        }*/
        const {user}=await loginState();
        if(!user){
            this.props.message('请先登录');
            return;
        }
        let appUrl = ev.target[0].value;
        const appName = ev.target[1].value;
        if (appUrl.split('//')[0] != 'https:' && appUrl.split('//')[0] != 'http:') appUrl = 'https://' + appUrl;
        request('addApp', {
            url:appUrl,
            name:appName,
            uid:user.uid
        }).then(res => {
            if(res.success){
                this.props.message('安装成功');
                this.props.installAPP(res.res.id,appName,appUrl);
            }
            else{
                this.props.message('安装失败'+res.message);
            }
        });
    }

    //搜索显示
    display(){
        const apps = this.props.apps;
        if(this.state.search!=''){
            const str=RegExp(this.state.search)
            return apps.map(app => {
                if(str.test(app.name))
                    return <InstalledAppitem unInstall={this.props.unInstall} key={app._id?app._id:app.url} id={app._id?app._id:null} url={app.url} name={app.name} img={app.img} />
            })
        }else{
            return apps.map(app => {
                return <InstalledAppitem unInstall={this.props.unInstall} key={app._id?app._id:app.url} id={app._id?app._id:null} url={app.url} name={app.name} img={app.img}/>
            })
        }
    }

    render() {
        return (
            <Display_template
                close={this.props.close}
                rouse={this.props.rouse}
                changeColor={this.props.changeColor}
                name='AppStore'
                title='AppStore'
                background_color='#F3F2F8'
                search={value=>this.setState({search:value})}
                catalogue={
                    <div className="installedApp">
                        <h3>已安装应用</h3>
                        {this.display()}
                    </div>
                }
                content={
                    <div className='installApp' >
                        <div className="installAppStatus">
                            <strong>安装应用</strong>
                        </div>
                        <form className="installAppInfo" onSubmit={ev => this.installApp(ev)}>
                            <label>
                                <p>网址</p>
                                <input type='text' name='AppUrl' required />
                            </label>
                            <label>
                                <p>名称</p>
                                <input type='text' name='AppName' required />
                            </label>
                            <button type="submit">安装</button>
                        </form>
                    </div>
                }
            />
        );
    }
}

export default AppStore;