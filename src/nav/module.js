import React from 'react';
import './module.css';

class Module extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div className='nav_moudule' onClick={()=>{this.props.display(this.props.module)}}>
                <img src={this.props.img_src} alt='this.props.module'></img>
            </div>
        );
    };
}

export default Module;