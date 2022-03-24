import React from "react";
import './installAppitem.css';
import request from '../../request/request';

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

    delete(){
        const id=this.props.id;
        request('deleteApp',id).then(res=>{
            if(res.success){
                this.props.unInstall(id);
            }
        });
    }

    render() {
        return (
            <div className="installedAppitem">
                {this.choose()}
                <h2>{this.props.name}</h2>
                <p>{this.props.url}</p>
                {(typeof(this.props.img)!="undefined"&&this.props.img!='')?null
                :<div onClick={() => this.delete()} className="delete"><i className="iconfont icon-shanchu"></i></div>}
            </div>
        );
    };
}

export default InstalledAppitem;