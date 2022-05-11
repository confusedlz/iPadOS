import React from "react";
import './photo.css';

class Photo extends React.Component{
    constructor(props){
        super(props);
    };

    click(){
        this.props.changeView(this.props.src);
    }

    render(){
        const defaultChecked=this.props.defaultChecked;
        return(
            <label className="photo">
                <input type='radio' name="photo" defaultChecked={defaultChecked}/>
                <div className='photoItem' onClick={()=>this.click()}>
                    <img src={this.props.src}></img>
                </div>
            </label>
            
        );
    };
}

export default Photo;