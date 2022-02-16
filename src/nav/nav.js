import React from "react";
import './nav.css'
import Module from "./module";
import notebookPng from '../../public/img/module/notebook.png';
import setupPng from '../../public/img/module/setup.png';
import photoPng from '../../public/img/module/photo.png'

class Nav extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="section">
                <Module img_src={notebookPng} />
                <Module img_src={photoPng} display={this.props.change_module} module='PhotoAlbum'/>
                <Module img_src={notebookPng} display={this.props.change_module} module='Notebook' />
                <Module img_src={notebookPng} />
                <Module img_src={setupPng} display={this.props.change_module} module='Setup' />
            </div>
        )

    };
}

export default Nav;