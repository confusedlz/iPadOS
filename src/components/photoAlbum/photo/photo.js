import React from "react";
import './photo.css';

class Photo extends React.Component{
    constructor(props){
        super(props);
    };

    clik(){
        this.props.changeView(this.props.src);
    }

    render(){
        return(
            <label className="photo">
                <input type='radio' name="photo"/>
                <div className='photoItem' onClick={()=>this.clik()}>
                    <img src={this.props.src}></img>
                </div>
            </label>
            
        );
    };
}

export default Photo;