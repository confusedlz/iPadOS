import React from "react";
import './setup.css';
import Display_template from '../display_template/display_template';
import defaultAvatat from '../../public/img/avatar.png';
import userInfoimg from '../../public/img/setupimg/userInfo.jpg';
import setupInfoimg from '../../public/img/setupimg/setupInfo.jpg';
const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: defaultAvatat,
            username: 'notLogin',
            email: '1234567890@qq.com',
            updateUserDataClassName: "updateUserData",
            loginOnClassName: "loginOn loginOnnotdisplay",
            loginClassName: "login loginDisplay",
            registerClassName: 'register',
        };
        this.fileRef = React.createRef();
    }

    componentDidMount() {
        inspirecloud.run('getUserInfo', {}).then(res => {
            if (res.user) {
                this.setupDisplay(true);
                this.updateUserInfoDisplay(res.user.nickname, res.user.username, res.user.avatar);
            }
            else {
                this.setupDisplay();
            }
        });
    }

    //根据用户是否登录显示个人信息栏或登录栏
    setupDisplay(flag) {
        if (flag) {
            this.setState({
                loginOnClassName: "loginOn",
                loginClassName: "login",
                updateUserDataClassName: "updateUserData",
                registerClassName: 'register',
            });
        }
        else {
            this.setState({
                loginOnClassName: "loginOn loginOnnotdisplay",
                loginClassName: "login loginDisplay",
                updateUserDataClassName: "updateUserData",
                registerClassName: 'register',
            });
        }
    }

    //更新个人信息显示
    updateUserInfoDisplay(nusername, nemail, navatar) {
        this.setState({
            username: nusername,
            email: nemail,
            avatar: navatar
        });
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

    //显示注册框
    registerDisplay(flag) {
        if (flag) {
            this.setState({
                registerClassName: 'register registerDisplay',
                loginClassName: 'login',
            });
        }
        else {
            this.setState({
                registerClassName: 'register',
                loginClassName: 'login loginDisplay',
            });
        }
    }

    //注册用户
    register(ev) {
        ev.preventDefault();
        const username = ev.target[0].value;
        const email = ev.target[1].value;
        const password = ev.target[2].value;
        const avatar = 'https://qcv9se.file.qingfuwucdn.com/file/5328c86c0a1fc874_1644925028875.png';
        inspirecloud.run('createUser', {
            username,
            email,
            password,
            avatar
        }).then(res => {
            if (res.success) {
                this.props.message('注册成功');
                this.setupDisplay(true);
                this.updateUserInfoDisplay(username, email, avatar);
            }
            else {
                this.props.message('注册失败' + res.message);
            }
        });
    }

    //登录
    login(ev) {
        ev.preventDefault();
        const email = ev.target[0].value;
        const password = ev.target[1].value;
        inspirecloud.run('loginByEmail', {
            email,
            password
        }).then(res => {
            if (res.success) {
                this.props.message('登录成功');
                this.setupDisplay(true);
                this.updateUserInfoDisplay(res.userInfo.nickname, res.userInfo.email, res.userInfo.avatar);
            }
            else {
                this.props.message('登录失败' + res.message);
            }
        });
    }

    //退出登录
    loginOut() {
        inspirecloud.run('logout', {}).then(res => {
            if (res.success) {
                this.props.message('退出登录成功');
                this.setupDisplay();
                this.setState({
                    avatar: defaultAvatat,
                    username: 'notLogin',
                    email: '1234567890@qq.com'
                });
            }
        });
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
            if(this.state.username === nickname) user={username};
            else if(this.state.email===username) user={nickname};
            else user={username,nickname};
            inspirecloud.run('updateUserData',user).then(res => {
                if (res.success) {
                    this.props.message('修改个人信息成功');
                    this.updateUserInfoDisplay(nickname, username,this.state.avatar);
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
                    this.setState({ avatar: res.url });
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

    render() {
        return (
            <Display_template
                rouse={this.props.rouse}
                name='Setup'
                title='设置'
                background_color='#F3F2F8'
                catalogue={
                    <div className="setup">
                        <div className="setupUserInfo">
                            <img src={this.state.avatar} alt='avatar' />
                            <h2>{this.state.username}</h2>
                            <p>Apple ID、iCloud、媒体与购买项目</p>
                        </div>
                        <img className="setupInfoimg" src={setupInfoimg} />
                    </div>
                }
                content={
                    <div className="setup_main">
                        {/* 个人信息展示 */}
                        <div className={this.state.loginOnClassName}>
                            <div className="loginOnInfo">
                                <h3>Apple ID</h3>
                                <div className="avatar">
                                    <img src={this.state.avatar} alt='avatar' />
                                    <div className="changeAvatar" onClick={() => this.upload()}>
                                        编辑
                                        <input type='file' onChange={ev => this.getfile(ev)} ref={this.fileRef} accept=".png,.svg,.jpg,.jpeg,.gif" />
                                    </div>
                                </div>
                                <h2>{this.state.username}</h2>
                                <p>{this.state.email}</p>
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
                        <div className={this.state.updateUserDataClassName} onSubmit={ev => this.updateUserData(ev)}>
                            <div className="updateStatus">
                                <button onClick={() => this.updateUserDataDisplay()}><i className="iconfont icon-zuojiantou"></i>  Apple ID</button>
                                <strong>姓名、电子邮件</strong>
                            </div>
                            <form className="updateInfo">
                                <label>
                                    <p>姓名</p>
                                    <input type='text' name='username' defaultValue={this.state.username} pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$"/>
                                </label>
                                <label>
                                    <p>电子邮箱(Apple ID)</p>
                                    <input type='text' name='email' defaultValue={this.state.email} pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$'/>
                                </label>
                                <button type="submit">修改个人信息</button>
                            </form>
                        </div>
                        {/* 登录 */}
                        <div className={this.state.loginClassName} >
                            <div className="loginStatus">
                                <strong>登录</strong>
                            </div>
                            <form className="loginInfo" onSubmit={ev => this.login(ev)}>
                                <label>
                                    <p>电子邮箱(Apple ID)</p>
                                    <input type='text' name='email' pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' required/>
                                </label>
                                <label>
                                    <p>密码</p>
                                    <input type='password' name='password' required/>
                                </label>
                                <button type="submit">登录</button>
                            </form>
                            <p className="toRegister">
                                还没有账号？去<span onClick={() => this.registerDisplay(true)}>注册</span>
                            </p>
                        </div>
                        {/* 注册 */}
                        <div className={this.state.registerClassName}>
                            <div className="registerStatus">
                                <button onClick={() => this.registerDisplay()}><i className="iconfont icon-zuojiantou"></i>  登录</button>
                                <strong>注册</strong>
                            </div>
                            <form className="registerInfo" onSubmit={ev => this.register(ev)}>
                                <label>
                                    <p>姓名</p>
                                    <input type='text' name='username' placeholder="只能包含中文、英文、数字和下划线,长度1-10位" pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$" required/>
                                </label>
                                <label>
                                    <p>电子邮箱(Apple ID)</p>
                                    <input type='text' name='email' placeholder="例:1234567890@qq.com" pattern="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" required/>
                                </label>
                                <label>
                                    <p>密码</p>
                                    <input type='password' name='password' required/>
                                </label>
                                <button type="submit">注册</button>
                            </form>
                        </div>
                    </div>
                }
            />
        );
    };
}

export default Setup;