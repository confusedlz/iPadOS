import React from "react";
import './setup.css';
import Display_template from '../display_template/display_template';
import SetupDisplay from "./setupDisplay/setupDisplay";
import Login from "./login/login";
import defaultAvatat from  '../../../public/img/avatar.png';
import setupInfoimg from '../../../public/img/setupimg/setupInfo.jpg';
import loginState from '../../API/request/user/loginState';

class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: defaultAvatat,
            nickName: 'notLogin',
            email: '1234567890@qq.com',
            flag: false,
        };
        this.setupDisplay = this.setupDisplay.bind(this);
        this.updataUserInfoDisplay = this.updateUserInfoDisplay.bind(this);
        this.changeFlag = this.changeFlag.bind(this);
    }

    componentDidMount() {
        //根据用户是否登录进行初始化
        loginState().then(loginState => {
            if (loginState) {
                this.setState({ flag: true });
                this.updateUserInfoDisplay(loginState.user.nickName === '' ? "notNickName" : loginState.user.nickName, loginState.user.email, loginState.user.avatarUrl);
            }
        })
        /*
        request('getUserInfo', {}).then(res => {
            if (res.user) {
                this.setState({flag:true});
                this.updateUserInfoDisplay(res.user.nickname, res.user.nickName, res.user.avatar);
            }
        });*/
    }

    //更新个人信息显示
    updateUserInfoDisplay(nnickName, nemail, navatar) {
        if (nnickName) this.setState({ nickName: nnickName });
        if (nemail) this.setState({ email: nemail, });
        if (navatar) this.setState({ avatar: navatar });
    }

    //根据用户是否登录显示个人信息栏或登录栏
    setupDisplay(flag) {
        if (flag) return <SetupDisplay closeModule={this.props.closeModule} email={this.state.email} nickName={this.state.nickName} changeFlag={this.changeFlag} updataUser={this.props.updataUser} message={this.props.message} avatar={this.state.avatar} updateUserInfoDisplay={this.updataUserInfoDisplay} />
        else return <Login closeModule={this.props.closeModule} changeFlag={this.changeFlag} updataUser={this.props.updataUser} message={this.props.message} updateUserInfoDisplay={this.updataUserInfoDisplay} />
    }

    //修改显示
    changeFlag(flag) {
        this.setState({ flag: flag });
    }

    render() {
        return (
            <Display_template
                close={this.props.close}
                rouse={this.props.rouse}
                name='Setup'
                title='设置'
                background_color='#F3F2F8'
                changeColor={this.props.changeColor}
                catalogue={
                    <div className="setup">
                        <div className="setupUserInfo">
                            <img src={this.state.avatar} alt='avatar' />
                            <h2>{this.state.nickName}</h2>
                            <p>Apple ID、iCloud、媒体与购买项目</p>
                        </div>
                        <img className="setupInfoimg" src={setupInfoimg} />
                    </div>
                }
                content={
                    <div className="setup_main">
                        {this.setupDisplay(this.state.flag)}
                    </div>
                }
            />
        );
    };
}

export default Setup;