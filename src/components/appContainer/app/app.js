import React from "react";
import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.choose = this.choose.bind(this);
    }

    choose() {
        if (typeof (this.props.img) != "undefined" && this.props.img != '') {
            return <img src={this.props.img}></img>;
        }
        else {
            return <span>{this.props.name.split('')[0]}</span>;
        }
    }

    render() {
        return (
            <div className="appItem">
                <a href={this.props.url} target='_blank'>
                    <div className="appIcon">
                        {this.choose()}
                    </div>
                    <p>{this.props.name}</p>
                </a>
            </div>
        );
    }
}

export default App;