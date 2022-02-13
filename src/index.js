import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Status from './status/status';
import Nav from './nav/nav';
import Notebook from './notebook/notebook';
class Ipad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //更新时间
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <main>
                <Status date={this.state.date}/>
                <Notebook date={this.state.date}></Notebook>
                <Nav/>
            </main>
        )
    };
}

ReactDOM.render(
    <Ipad />,
    document.getElementById('app')
);