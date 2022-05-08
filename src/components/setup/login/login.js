import React from "react";
import './login.css';
import AlertDialog from "./AlertDialog";
import loginByEmail from "../../../API/request/user/loginByEmail";
import createUser from "../../../API/request/user/createUser";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClassName: "login",
            registerClassName: 'register',
            open: false,
            nickName: ''
        };
        this.verify = this.verify.bind(this);
    }

    //显示注册框
    registerDisplay(flag) {
        if (flag) {
            this.setState({
                registerClassName: 'register registerDisplay',
                loginClassName: 'login loginNoDisplay',
            });
        }
        else {
            this.setState({
                registerClassName: 'register',
                loginClassName: 'login',
            });
        }
    }

    //注册用户
    register(ev) {
        ev.preventDefault();
        const nickName = ev.target[0].value;
        const email = ev.target[0].value;
        const password = ev.target[1].value;
        createUser(email, password)
            .then(e => {
                if (e) {
                    this.props.message('注册失败' + e)
                }
                else {
                    this.setState({ open: true, nickName: nickName });
                    this.registerDisplay(true);
                }

            });

        /* request('createUser', {
             username,
             password,
         }).then(res => {
             if (res.success) {
                 this.props.message('注册成功');
                 this.props.changeFlag(true);
                 this.props.updateUserInfoDisplay(nickname, email, avatar);
                 localStorage.setItem('expireAt', res.expireAt);
                 request('updateUserData', { nickname, email, avatar });
             }
             else {
                 this.props.message('注册失败' + res.message);
             }
         });*/
    }

    //验证成功
    verify() {
        this.registerDisplay(false);
    }

    //登录
    login(ev) {
        ev.preventDefault();
        const email = ev.target[0].value;
        const password = ev.target[1].value;
        loginByEmail(email, password).then(loginState => {
            if (loginState.user) {
                this.props.message('登录成功');
                this.props.changeFlag(true);
                this.props.updateUserInfoDisplay(loginState.user.nickName === '' ? "notNickName" : loginState.user.nickName, loginState.user.email, loginState.user.avatarUrl);
                this.props.updataUser(true, null, null);
                this.props.closeModule('Schedule');
                this.props.closeModule('Notebook');
                this.props.closeModule('PhotoAlbum');
            } else {
                this.props.message('登录失败' + loginState);
            }
        });

        /*
        request('loginByEmail', {
            username,
            password
        }).then(res => {
            if (res.success) {
                this.props.message('登录成功');
                this.props.changeFlag(true);
                this.props.updateUserInfoDisplay(loginState.user.nickname, loginState.user.email, loginState.user.avatar);
                this.props.updataUser(true, loginState.user.backgroundimgid, res.apps);
                localStorage.setItem('expireAt', loginState.user.expireAt);
                if (loginState.user.backgroundimgid) localStorage.setItem('photos', JSON.stringify(loginState.user.backgroundimgid));
                if (res.apps) localStorage.setItem('apps', JSON.stringify(res.apps));
                this.props.closeModule('Schedule');
                this.props.closeModule('Notebook');
            }
            else {
                this.props.message('登录失败' + res.message);
            }
        });*/
    }

    render() {
        return (
            <div>
                {/* 登录 */}
                <div className={this.state.loginClassName} >
                    <div className="loginStatus">
                        <strong>登录</strong>
                    </div>
                    <form className="loginInfo" onSubmit={ev => this.login(ev)}>
                        <label>
                            <p>电子邮箱(Apple ID)</p>
                            <input type='text' name='email' pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' required />
                        </label>
                        <label>
                            <p>密码</p>
                            <input type='password' name='password' required />
                        </label>
                        <button type="submit">登录</button>
                    </form>
                    <p className="toRegister">
                        还没有账号?去<span onClick={() => this.registerDisplay(true)}>注册</span>
                    </p>
                </div>
                {/* 注册 */}
                <div className={this.state.registerClassName}>
                    <div className="registerStatus">
                        <button onClick={() => this.registerDisplay()}><i className="iconfont icon-zuojiantou"></i>  登录</button>
                        <strong>注册</strong>
                    </div>
                    <form className="registerInfo" onSubmit={ev => this.register(ev)}>
                        {/* <label>
                            <p>姓名</p>
                            <input type='text' name='username' placeholder="只能包含中文、英文、数字和下划线,长度1-10位" pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$" required />
                        </label> */}
                        <label>
                            <p>电子邮箱(Apple ID)</p>
                            <input type='text' name='email' placeholder="例:1234567890@qq.com" pattern="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" required />
                        </label>
                        <label>
                            <p>密码</p>
                            <input type='password' name='password' required />
                        </label>
                        <button type="submit">注册</button>
                        <AlertDialog open={this.state.open} verify={this.verify}></AlertDialog>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;