import React from "react";
import './nav.css'
import Module from "./module";
import notebookPng from '../../../public/img/module/notebook.png';
import setupPng from '../../../public/img/module/setup.png';
import photoPng from '../../../public/img/module/photo.png';
import appStorePng from '../../../public/img/module/appstore.png';
import schedulePng from '../../../public/img/module/schedule.png';

class Nav extends React.Component {//底部导航栏
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="section">
                <Module img_src={schedulePng} changeAppManagement={this.props.changeAppManagement} display={this.props.change_module} module='Schedule'/>
                <Module img_src={photoPng} changeAppManagement={this.props.changeAppManagement} display={this.props.change_module} module='PhotoAlbum'/>
                <Module img_src={notebookPng} changeAppManagement={this.props.changeAppManagement} display={this.props.change_module} module='Notebook'/>
                <Module img_src={appStorePng} changeAppManagement={this.props.changeAppManagement} display={this.props.change_module} module='AppStore'/>
                <Module img_src={setupPng} changeAppManagement={this.props.changeAppManagement} display={this.props.change_module} module='Setup'/>
            </div>
        )

    };
}

export default Nav;