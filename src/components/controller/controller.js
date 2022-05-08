import React from "react";
import './controller.css';

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.hiddenModule=this.hiddenModule.bind(this);
    }

    mouseView(ev){
        // ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    hiddenModule(ev){
        if(ev.pageY<window.innerHeight*0.7){
            this.props.changeAppManagement(true);
        }
        if(ev.pageY<window.innerHeight*0.95){
            this.props.changeClose();
        }
    }

    render(){
        return(
            <div className="controller" style={{backgroundColor:this.props.color}} onDragStart={ev=>this.mouseView(ev)} onDragEnd={ev=>this.hiddenModule(ev)} draggable="true"></div>
        );
    }
}

export default Controller;