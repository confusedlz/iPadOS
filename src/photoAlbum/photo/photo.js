import React from "react";
import './photo.css';

class Photo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            className:'photoItem'
        }
        this.radioRef=React.createRef();
        this.divRef=React.createRef();
    };

    componentDidUpdate(){
        if(this.radioRef.current.checked){
            this.divRef.current.className='photoItem photoItemFoucs';
        }
        else{
            this.divRef.current.className='photoItem';
        }
    }

    clik(){
        this.props.changeView(this.props.src);
    }

    render(){
        return(
            <label className="photo">
                <div className={this.state.className} ref={this.divRef} onClick={()=>this.clik()}>
                    <img src={this.props.src}></img>
                </div>
                <input type='radio' name="photo" ref={this.radioRef}/>
            </label>
            
        );
    };
}

export default Photo;