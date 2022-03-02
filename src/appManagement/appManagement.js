import React from "react";
import AppStore from "../appStore/appStore";
import Notebook from "../notebook/notebook";
import PhotoAlbum from "../photoAlbum/photoAlbum";
import Setup from "../setup/setup";
import Application from "./application";
import './appManagement.css';
import appstoreimg from '../../public/img/module/appstore.png';
import notebookimg from '../../public/img/module/notebook.png';
import photoimg from '../../public/img/module/photo.png';
import setupimg from '../../public/img/module/setup.png';

class AppManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    close(){
        this.props.changeAppManagement(false);
    }

    render() {
        return (
            <div className="appManagement" onClick={()=>this.close()}>
                <div className="appManagementMain">
                    {this.props.load.has('Notebook') ?
                        <Application
                            title='备忘录'
                            name='Notebook'
                            body={<Notebook date={this.props.date} />}
                            closeModule={this.props.closeModule}
                            change_module={this.props.change_module}
                            changeAppManagement={this.props.changeAppManagement}
                            img={notebookimg}
                        />
                        : null}
                    {this.props.load.has('PhotoAlbum') ?
                        <Application
                            title='相册'
                            name='PhotoAlbum'
                            body={<PhotoAlbum photos={this.props.photos} />}
                            closeModule={this.props.closeModule}
                            change_module={this.props.change_module}
                            changeAppManagement={this.props.changeAppManagement}
                            img={photoimg}
                        />
                        : null}
                    {this.props.load.has('AppStore') ?
                        <Application
                            title='AppStore'
                            name='AppStore'
                            body={<AppStore apps={this.props.apps} />}
                            closeModule={this.props.closeModule}
                            change_module={this.props.change_module}
                            changeAppManagement={this.props.changeAppManagement}
                            img={appstoreimg}
                        />
                        : null}
                    {this.props.load.has('Setup') ?
                        <Application
                            title='设置'
                            name='Setup'
                            body={<Setup />}
                            closeModule={this.props.closeModule}
                            change_module={this.props.change_module}
                            changeAppManagement={this.props.changeAppManagement}
                            img={setupimg}
                        />
                        : null}
                </div>

            </div>
        )
    }
}

export default AppManagement;