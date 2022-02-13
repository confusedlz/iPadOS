import React from "react";
import './nav.css'
import Module from "./module";
import png from '../../public/wallpaper/notebook.png';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    };

    render(){
        return(
        <section>
            <div className="section">
                <Module img_src={png}/>
                <Module img_src={png}/>
                <Module img_src={png}/>
                <Module img_src={png}/>
                <Module img_src={png}/>
            </div>
        </section>
        )

    };
}

export default Nav;