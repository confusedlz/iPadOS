import './softwareController.css';
import React from 'react';

class SoftwareController extends React.Component {
    constructor(props){
        super(props);
        this.close=this.close.bind(this);
    }

    close(){
        this.props.close();
    }

    render() {
        return (
            <div className="controller">
                <div className="comeback" title='回到主页面' onClick={this.close}>
                    <i className="iconfont icon-pingguo"></i>
                </div>
            </div>
        );
    };
}

export default SoftwareController;