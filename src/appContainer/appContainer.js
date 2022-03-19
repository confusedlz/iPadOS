import React from "react";
import './appContainer.css';
import App from './app/app';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const apps = this.props.apps;
        return (
            <div className="appContainer">
                {apps.map(data => {
                    return <App key={data._id?data._id:data.url} name={data.name} url={data.url} img={data.img} />
                })
                }
            </div>
        );
    }
}

export default AppContainer;