import React from 'react';
import './module.css';

class Module extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    };

    render(){
        return(
            <div className='nav_moudule'>
                <img src={this.props.img_src} alt='记事本'></img>
            </div>
        );
    };
}

export default Module;