import React from "react";
import './notebook.css';
import '../../public/fonticon/iconfont.css'
import SoftwareController from "../softwareController/softwateController";

class Notebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
            className:[],
        };
        this.textRef = React.createRef();
        this.nodebookRef=React.createRef();
        this.display_notebook=this.display_notebook.bind(this);
    }

    componentDidMount() {
        this.textRef.current.value = localStorage.getItem('notebookText');
    }

    //写入浏览器存储用户编辑的内容
    setText(ev) {
        // console.log('set');
        localStorage.setItem('notebookText', ev.target.value);
    }

    //获取浏览器本地中存储的用户上次编辑的内容
    getText() {
        // console.log('get');
        return localStorage.getItem('notebookText');
    }

    //删除备忘录中的内容
    deleteText() {
        // console.log('delete');
        this.setState({ textValue: '' });
        this.textRef.current.value = '';
        localStorage.removeItem('notebookText');
    }

    display_notebook(className){
        this.setState({className:[className+' '+[...this.state.className]]});
    }

    render() {
        return (
            <div className={"notebook"+' '+[...this.state.className]} ref={this.nodebookRef}>
                <SoftwareController close={this.display_notebook}/>
                <div className="notebook_main">
                    <div className="catalogue">
                        <h1>备忘录</h1>
                        <label>
                            <i className="iconfont icon-sousuo"></i>
                            <input type='text' placeholder='搜索'/>
                        </label>
                        <div className="notefile">
                            <div className="notefile_item">
                                <h4>React</h4>
                                <span>下午5:41</span>
                                <span>无附加文本</span>
                            </div>
                            <div className="notefile_item notefile_foucs">
                                <h4>Webpack</h4>
                                <span>下午5:41</span>
                                <span>无附加文本</span>
                            </div>
                            <div className="notefile_item">
                                <h4>aaaaa</h4>
                                <span>下午5:41</span>
                                <span>无附加文本</span>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content_main">
                            <div className="delete" onClick={() => this.deleteText()}><i className="iconfont icon-shanchu"></i></div>
                            <p>{this.props.date.toLocaleString([], this.state.options)}</p>
                            <label><textarea ref={this.textRef} spellCheck='false' onChange={ev => this.setText(ev)}></textarea></label>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Notebook;