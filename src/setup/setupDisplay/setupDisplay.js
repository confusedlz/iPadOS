import React from "react";
import './setupDisplay.css';
import userInfoimg from '../../../public/img/setupimg/userInfo.jpg';
import defaultAvatat from '../../../public/img/avatar.png';
// import request from "../../request/request";
import cloudLoginOut from "../../request/user/loginOut";
import updateUser from "../../request/user/updateUser";
import updateUserEmail from "../../request/user/updateUserEmail";
import updateUserAvater from "../../request/user/updateUserAvater";

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
    async updateUserData(ev) {
        ev.preventDefault();
        const nickName = ev.target[0].value;
        const email = ev.target[1].value;
        console.log(nickName,email);
        if (this.props.nickName === nickName && this.props.email === eamil) {
            this.props.message('请修改信息后再提交');
        }
        else {
            try {
                if (this.props.nickName !== nickName && nickName) {
                    await updateUser({ nickName })
                    this.props.message('修改昵称成功');
                    this.props.updateUserInfoDisplay(nickName);
                }
                if (this.props.email !== email && email) {
                    await updateUserEmail({ email })
                    this.props.message('请验证新邮箱,验证完成后请重新登陆');
                    cloudLoginOut();
                    this.props.updataUser(false);
                    this.props.changeFlag(false);
                    this.props.updateUserInfoDisplay('notLogin', '1234567890@qq.com', defaultAvatat);
                    this.props.closeModule('Schedule');
                    this.props.closeModule('Notebook');
                }
            } catch (e) {
                this.props.message('修改个人信息失败' + e);
            }
            /*
            // console.log(user);
            request('updateUserData', user).then(res => {
                if (res.success) {
                    this.props.message('修改个人信息成功');
                    this.props.updateUserInfoDisplay(nickname, nickName);
                }
                else {
                    this.props.message('修改个人信息失败' + res.message);
                }
            });*/
        }

    }

    //修改头像
    updateAvator(buf,filename) {
        if (!buf) {
            this.props.message('请选择照片');
        }
        else {
            const file=buf;
            updateUserAvater({file,filename}).then(res=>{
                if (res.success) {
                    this.props.updateUserInfoDisplay(null, null, res.url);
                    this.props.message('修改头像成功');
                }
            });
            /*
            
            request('updateUserAvatar', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => {
                if (res.success) {
                    this.props.updateUserInfoDisplay(null, null, res.url);
                    // this.setState({ avatar: res.url });
                    this.props.message('修改头像成功');
                }
            });*/
        }

    }

    //选择文件
    upload() {
        this.fileRef.current.click();
    }

    //获取文件内容
    getfile(ev) {
        const fileData = ev.target.files[0];
        // const formData = new FormData();
        /*
        const fileToBuffer = (fileData, fun) => {
            const fr = new FileReader();
            const filename = fileData.name;
            fr.readAsArrayBuffer(fileData);
            fr.addEventListener('loadend', e => {
                const buf = (Buffer.from(e.target.result)).toString('base64');

                // const buf=e.target.result;
                fun(buf,filename);
            }, false)
        }*/
        // fileToBuffer(fileData, this.updateAvator)
        // 添加文件
        // formData.append('myFile', fileData);
        // console.log(formData.myFile,fileData);
        this.updateAvator(fileData,fileData.name);
    }

    //退出登录
    loginOut() {
        cloudLoginOut().then(() => {
            this.props.message('退出登录成功');
            this.props.updataUser(false);
            this.props.changeFlag(false);
            this.props.updateUserInfoDisplay('notLogin', '1234567890@qq.com', defaultAvatat);
            this.props.closeModule('Schedule');
            this.props.closeModule('Notebook');
        })/*
        request('logout', {}).then(res => {
            if (res.success) {
                this.props.message('退出登录成功');
                this.props.updataUser(false);
                localStorage.removeItem('expireAt');
                localStorage.removeItem('photos');
                localStorage.removeItem('apps');
                this.props.changeFlag(false);
                this.props.updateUserInfoDisplay('notLogin', '1234567890@qq.com', defaultAvatat);
                this.props.closeModule('Schedule');
                this.props.closeModule('Notebook');
            }
        });*/
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
                        <h2>{this.props.nickName}</h2>
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
                            <input type='text' name='nickName' defaultValue={this.props.nickName} pattern="^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$" />
                        </label>
                        <label>
                            <p>电子邮箱(Apple ID)</p>
                            <input type='text' name='email' defaultValue={this.props.email} pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' />
                        </label>
                        <button type="submit">修改个人信息</button>
                    </form>
                </div>
            </div>
        );
    };
}

export default SetupDisplay;