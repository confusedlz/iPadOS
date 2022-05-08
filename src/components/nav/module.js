import React from 'react';
import './module.css';

class Module extends React.Component{
    constructor(props){
        super(props);
    };

    click(){
        this.props.changeAppManagement(false);
        this.props.display(this.props.module);
    }

    render(){
        return(
            <div className='nav_moudule' onClick={()=>this.click()}>
                <img src={this.props.img_src} alt='this.props.module'></img>
            </div>
        );
    };
}

export default Module;