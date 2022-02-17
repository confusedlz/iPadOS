import React from "react";
import './notebook.css';
import Display_template from "../display_template/display_template";

class Notebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
            value:' ',
        };
    }

    componentDidMount() {
        this.setState({value:this.getText()});
        // this.textRef.current.value = localStorage.getItem('notebookText');
    }

    //写入浏览器存储用户编辑的内容
    setText(ev) {
        // console.log('set');
        this.setState({value:ev.target.value});
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
        this.setState({ value: '' });
        localStorage.removeItem('notebookText');
    }

    render() {
        return (
            <Display_template
                rouse={this.props.rouse}
                changeColor={this.props.changeColor}
                name='Notebook'
                title='备忘录'
                catalogue={
                    <div className="notefile">
                        <div className="notefile_item">
                            <h3>React</h3>
                            <span>下午5:41</span>
                            <span>无附加文本</span>
                        </div>
                        <div className="notefile_item notefile_foucs">
                            <h3>Webpack</h3>
                            <span>下午5:41</span>
                            <span>无附加文本</span>
                        </div>
                        <div className="notefile_item">
                            <h3>aaaaa</h3>
                            <span>下午5:41</span>
                            <span>无附加文本</span>
                        </div>
                    </div>
                }
                content={
                    <div className="content_main">
                        <div className="delete" onClick={() => this.deleteText()}><i className="iconfont icon-shanchu"></i></div>
                        <p>{this.props.date.toLocaleString([], this.state.options)}</p>
                        <label><textarea value={this.state.value} spellCheck='false' onChange={ev => this.setText(ev)} /></label>
                    </div>
                }
            />
        );
    };
}

export default Notebook;