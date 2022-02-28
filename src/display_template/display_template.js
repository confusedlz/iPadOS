import React from "react";
import './display_template.css';
import '../../public/fonticon/iconfont.css';
// import SoftwareController from '../softwareController/softwateController';

 class Display_template extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             style:{},
         };
         this.dtRef=React.createRef();
         this.notdisplay=this.notdisplay.bind(this);
     }

    componentDidMount(){
        if(this.props.background_color){
            this.setState({style:{backgroundColor:this.props.background_color}});
        }
    }

    componentDidUpdate(){
        if(this.props.rouse===this.props.name){//显示组件
            this.dtRef.current.className='display_template display_template_display3 display_template_display2';
        }
        if(this.props.close&&this.dtRef.current.className!='display_template'){
            this.notdisplay()
        }
    }

    //关闭组件
    notdisplay(){
        // this.props.changeColor();
        this.dtRef.current.className='display_template display_template_display3 display_template_display1';
        setTimeout(()=>{this.dtRef.current.className='display_template'},200);
    }

    render() {
        return (
            //显示模板
            <div className="display_template" ref={this.dtRef}>
                {/* <SoftwareController close={this.notdisplay}/> */}
                <div className="display_template_main">
                    <div className="catalogue">
                        <h1>{this.props.title}</h1>
                        <label>
                            <i className="iconfont icon-sousuo"></i>
                            <input type='text' placeholder='搜索'/>
                        </label>
                        {this.props.catalogue}
                    </div>
                    <div className="after"> </div>
                    <div className="content" style={this.state.style}>   
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    };
 }

 export default Display_template;