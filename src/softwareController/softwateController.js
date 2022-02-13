import './softwareController.css';
import React from 'react';

class SoftwareController extends React.Component {
    constructor(props){
        super(props);
        this.closeNoteBook=this.closeNoteBook.bind(this);
    }

    closeNoteBook(){
        this.props.close('notebook_display1');
        setTimeout(()=>{this.props.close('notebook_display2')},400);
    }

    render() {
        return (
            <div className="controller">
                <div className="comeback" title='回到主页面' onClick={this.closeNoteBook}>
                    <i className="iconfont icon-pingguo"></i>
                </div>

            </div>
        );
    };
}

export default SoftwareController;