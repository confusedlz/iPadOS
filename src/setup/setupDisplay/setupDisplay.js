import React from "react";
import './setupDisplay.css';
import userInfoimg from '../../../public/img/setupimg/userInfo.jpg';
import defaultAvatat from '../../../public/img/avatar.png';
const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

class SetupDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateUserDataClassName: "updateUserData",
            loginOnClassName: "loginOn",
        };
        this.fileRef = React.createRef();
    }

    //显示修改个人信息框
    updateUserDataDisplay(flag) {
        if (flag) {
            this.setState({
                updateUserDataClassName: 'updateUserData updateUserDataDisplay',
                loginOnClassName: 'loginOn loginOnnotdisplay',
            });
        }
        else {
            this.setState({
                updateUserDataClassName: 'updateUserData',
                loginOnClassName: 'loginOn',
            });
        }
    }

    //修改个人信息
    updateUserData(ev) {
        ev.preventDefault();
        const nickname = ev.target[0].value;
        const username = ev.target[1].value;
        if (this.state.username === nickname && this.state.email === username) {
            this.props.message('请修改信息后再提交');
        }
        else {
            let user;
            if (this.state.username === nickname || !nickname) user = { username };
            else if (this.state.email === username || !username) user = { nickname };
            else user = { username, nickname };
            // console.log(user);
            inspirecloud.run('updateUserData', user).then(res => {
                if (res.success) {
                    this.props.message('修改个人信息成功');
                    this.props.updateUserInfoDisplay(nickname, username);
                }
                else {
                    this.props.message('修改个人信息失败' + res.message);
                }
            });
        }

    }

    //修改头像
    updateAvator(formData) {
        if (!formData) {
            this.props.message('请选择照片');
        }
        else {
            inspirecloud.run('updateUserAvatar', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => {
                if (res.success) {
                    this.props.updateUserInfoDisplay(null,null,res.url);
                    // this.setState({ avatar: res.url });
                    this.props.message('修改头像成功');
                }
            });
        }

    }

    //选择文件
    upload() {
        this.fileRef.current.click();
    }

    //获取文件内容
    getfile(ev) {
        const fileData = ev.target.files[0];
        const formData = new FormData();
        // 添加文件
        formData.append('myFile', fileData);
        this.updateAvator(formData);
    }

    //退出登录
    loginOut() {
        inspirecloud.run('logout', {}).then(res => {
            if (res.success) {
                this.props.message('退出登录成功');
                this.props.updataUser(false);
                localStorage.removeItem('expireAt');
                localStorage.removeItem('photos');
                localStorage.removeItem('apps');
                this.props.changeFlag(false);
                this.props.updateUserInfoDisplay('notLogin','1234567890@qq.com',defaultAvatat);
                this.props.closeModule('Schedule');
                this.props.closeModule('Notebook');
            }
        });
    }

    render() {
        return (
            <div>
                {/* 个人信息展示 */}
                <div className={this.state.loginOnClassName}>
                    <div className="loginOnInfo">
                        <h3>Apple ID</h3>
                        <div className="avatar">
                            <img src={this.props.avatar} alt='avatar' />
                            <div className="changeAvatar" onClick={() => this.upload()}>
                                编辑
                                <input type='file' onChange={ev => this.getfile(ev)} ref={this.fileRef} accept=".png,.svg,.jpg,.jpeg,.gif" />
                            </div>
                        </div>
                        <h2>{this.props.username}</h2>
                        <p>{this.props.email}</p>
                    </div>
                    <div className="userInfo">
                        <div className="userInfoItem" onClick={() => this.updateUserDataDisplay(true)}>姓名、电子邮件<i className="iconfont icon-youjiantou"></i></div>
                        <div className="userInfoItem">密码与安全<i className="iconfont icon-youjiantou"></i></div>
                        <div className="userInfoItem">付费与配送<i className="iconfont icon-youjiantou"></i><span>微信支付</span></div>
                        <div className="userInfoItem">订阅<i className="iconfont icon-youjiantou"></i></div>
                    </div>
                    <img className="userInfoimg" src={userInfoimg} alt='userInfoimg' />
                    <button className="loginOut" onClick={() => this.loginOut()}>退出登录</button>
                </div>
                {/*修改个人信息 */}
                <div className={this.state.updateUserDataClassName}>
                    <div className="updateStatus">
                        <button onClick={() => this.updateUserDataDisplay()}><i className="iconfont icon-zuojiantou"></i>  Apple ID</button>
                        <strong>姓名、电子邮件</strong>
                    </div>
                    <form className="updateInfo" onSubmit={ev => this.updateUserData(ev)}>
                        <label>
                            <p>姓名</p>
                            <input type='text' name='username' defaultValue={this.state.username} pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$" />
                        </label>
                        <label>
                            <p>电子邮箱(Apple ID)</p>
                            <input type='text' name='email' defaultValue={this.state.email} pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' />
                        </label>
                        <button type="submit">修改个人信息</button>
                    </form>
                </div>
            </div>
        );
    };
}

export default SetupDisplay;