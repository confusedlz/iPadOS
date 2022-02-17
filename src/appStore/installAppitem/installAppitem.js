import React from "react";
import './installAppitem.css';

class InstalledAppitem extends React.Component {
    constructor(props) {
        super(props);
        this.choose=this.choose.bind(this);
    };

    //根据App是否有图片添加元素
    choose(){
        if(typeof(this.props.img)!="undefined"&&this.props.img!=''){
            return <img src={this.props.img}></img>;
        }
        else{
            return <span>{this.props.name.split('')[0]}</span>;
        }
    }

    render() {
        return (
            <div className="installedAppitem">
                {this.choose()}
                <h2>{this.props.name}</h2>
                <p>{this.props.url}</p>
            </div>
        );
    };
}

export default InstalledAppitem;