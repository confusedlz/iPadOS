import React from "react";
import './appStore.css';
import Display_template from "../display_template/display_template";
import InstalledAppitem from "./installAppitem/installAppitem";
const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

class AppStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.installApp = this.installApp.bind(this);
    }

    //安装App
    installApp(ev) {
        if (!localStorage.getItem('expireAt') || new Date().getTime() > localStorage.getItem('expireAt')) {
            this.props.message('请先登录');
            return;
        }
        ev.preventDefault();
        let appUrl = ev.target[0].value;
        const appName = ev.target[1].value;
        if (appUrl.split('//')[0] != 'https:' && appUrl.split('//')[0] != 'http:') appUrl = 'https://' + appUrl;
        inspirecloud.run('updateUserApp', {
            appUrl,
            appName
        }).then(res => {
            if(res.success){
                this.props.message('安装成功');
                this.props.installAPP(appName,appUrl);
            }
            else{
                this.props.message('安装失败'+res.message);
            }
        });
    }

    render() {
        const apps = this.props.apps;
        return (
            <Display_template
                close={this.props.close}
                rouse={this.props.rouse}
                changeColor={this.props.changeColor}
                name='AppStore'
                title='AppStore'
                background_color='#F3F2F8'
                catalogue={
                    <div className="installedApp">
                        <h3>已安装应用</h3>
                        {apps.map(app => {
                            return <InstalledAppitem key={app.url} url={app.url} name={app.name} img={app.img} />
                        })}
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