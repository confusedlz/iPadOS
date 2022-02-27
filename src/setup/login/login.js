import React from "react";
import './login.css';
const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClassName: "login",
            registerClassName: 'register',
        };
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
                this.props.changeFlag(true);
                this.props.updateUserInfoDisplay(username, email, avatar);
                // console.log(res.userInfo);
                localStorage.setItem('expireAt', res.expireAt);
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
                this.props.changeFlag(true);
                this.props.updateUserInfoDisplay(res.userInfo.nickname, res.userInfo.email, res.userInfo.avatar);
                this.props.updataUser(true, res.userInfo.backgroundimgid, res.userInfo.apps);
                localStorage.setItem('expireAt', res.userInfo.expireAt);
                if (res.userInfo.backgroundimgid) localStorage.setItem('photos', JSON.stringify(res.userInfo.backgroundimgid));
                if (res.userInfo.apps) localStorage.setItem('apps', JSON.stringify(res.userInfo.apps));
            }
            else {
                this.props.message('登录失败' + res.message);
            }
        });
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
                            <input type='text' name='username' placeholder="只能包含中文、英文、数字和下划线,长度1-10位" pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$" required />
                        </label>
                        <label>
                            <p>电子邮箱(Apple ID)</p>
                            <input type='text' name='email' placeholder="例:1234567890@qq.com" pattern="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" required />
                        </label>
                        <label>
                            <p>密码</p>
                            <input type='password' name='password' required />
                        </label>
                        <button type="submit">注册</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;