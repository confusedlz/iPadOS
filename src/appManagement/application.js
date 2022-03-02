import React from "react";
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.Ref=React.createRef();
        this.change=this.change.bind(this);
        this.close=this.close.bind(this);
    }

    change(ev){
        const x=ev.nativeEvent.pageX;
        const y=ev.nativeEvent.pageY;
        this.Ref.current.style.position='fixed';
        this.Ref.current.style.margin='0';
        this.Ref.current.style.top=y+'px';
        this.Ref.current.style.left=x+'px';
    }

    close(){
        this.props.closeModule(this.props.name);
    }

    change_module(){
        this.props.change_module(this.props.name);
        this.props.changeAppManagement(false);
    }

    render() {
        return (
            <div><div className="appitems" onClick={()=>this.change_module()} onDragEnd={()=>this.close()} onDrag={ev => this.change(ev)} ref={this.Ref} draggable='true'>
                <img className="managementIcon" src={this.props.img} alt={this.props.title}></img>
                <p className="appTitle">{this.props.title}</p>
                {this.props.body}
            </div></div>
        )
    }
}

export default Application;