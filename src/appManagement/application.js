import React from "react";
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state={x:0,y:0};
        this.Ref=React.createRef();
        this.change=this.change.bind(this);
        this.close=this.close.bind(this);
    }


    //拖动设置
    change(ev){
        const x=ev.nativeEvent.pageX-this.state.x;
        const y=ev.nativeEvent.pageY-this.state.y;
        this.Ref.current.style.position='fixed';
        this.Ref.current.style.margin='0';
        this.Ref.current.style.top=y+'px';
        this.Ref.current.style.left=x+'px';
    }

    //移除组件
    close(){
        this.props.closeModule(this.props.name);
    }

    //显示组件
    change_module(){
        this.props.change_module(this.props.name);
        this.props.changeAppManagement(false);
    }

    //记录初始鼠标位置
    start(ev){
        this.setState({x:ev.nativeEvent.offsetX,y:ev.nativeEvent.offsetY}); 
    }

    render() {
        return (
            <div className="appitems" onClick={()=>this.change_module()} onDragStart={ev=>this.start(ev)} onDragEnd={()=>this.close()} onDrag={ev => this.change(ev)} ref={this.Ref} draggable='true'>
                <img className="managementIcon" src={this.props.img} alt={this.props.title}></img>
                <p className="appTitle">{this.props.title}</p>
                {this.props.body}
            </div>
        )
    }
}

export default Application;