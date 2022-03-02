import React from "react";
import './lockScreen.css';
import '../../public/fonticon/iconfont.css';

class LockScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.lsRef = React.createRef();
        this.display = this.display.bind(this);
    };

    componentDidMount(){
         this.lsRef.current.className = 'lockScreenMain';
         setTimeout(()=>this.lsRef.current.className = 'lockScreenMain lockScreenMainDisplay',0);
    }

    componentDidUpdate() {
    }

    display() {
        this.lsRef.current.className = 'lockScreenMain';
        setTimeout(()=>this.props.displayLockScreen(false),500);
    }

    render() {
        return (
            <div className="lockScreenMain" ref={this.lsRef} onClick={this.display} style={{ backgroundImage: 'url(' + this.props.backgroundImage + ')' }}>
                <div className='right'>
                    <span className="iconfont icon-wifi"></span>
                    <span>80%</span>
                    <span className="iconfont icon-80dianliang"></span>
                </div>
                <h1>{this.props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
                <p>{this.props.date.toLocaleDateString([], { month: 'long', day: 'numeric', weekday: 'long' })}</p>
            </div>
        );
    };
}
export default LockScreen;