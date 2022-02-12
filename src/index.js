import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Status from './status/status';
class Ipad extends React.Component {
    render() {
        return (
            <main>
                <Status />
            </main>
        )
    }
}

ReactDOM.render(
    <Ipad />,
    document.getElementById('app')
)