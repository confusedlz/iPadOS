import React from "react";
import './photoAlbum.css';
import Display_template from '../display_template/display_template';
import '../../public/fonticon/iconfont.css';
import Photo from "./photo/photo";
const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

class PhotoAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.photos[0],
            className: 'photoItem',
        };
        this.changeView = this.changeView.bind(this);
        this.fileRef = React.createRef();
    }

    //修改预览
    changeView(view) {
        this.setState({ view: view, className: 'photoItem' });
    }

    //修改背景
    changeBackground() {
        this.props.changeBackground(this.state.view);
    }

    //上传照片
    postPhoto(formData) {
        if (!localStorage.getItem('expireAt') || new Date().getTime() > localStorage.getItem('expireAt')) {
            this.props.message('请先登录');
        } else {
            inspirecloud.run('updateUserimg', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => {
                if (res.success) {
                    this.props.updataUser(true,[res.url]);
                    // this.setState({ photos: [...this.props.photos, res.url] });
                    this.props.message('上传成功');
                    if (localStorage.getItem('photos')){
                        if(typeof localStorage.getItem('photos')=='object') localStorage.setItem('photos',JSON.stringify(...localStorage.getItem('photos'),res.url));
                        else localStorage.setItem('photos',JSON.stringify(localStorage.getItem('photos'),res.url));
                        // console.log(this.state.photos);
                    }
                    else localStorage.setItem('photos',JSON.stringify(res.url));
                    
                }
                else {
                    this.props.message('上传失败');
                }
            });
        }
    }

    //选择文件
    upload() {
        this.fileRef.current.click();
    }

    //获取文件
    getfile(ev) {
        const fileData = ev.target.files[0];
        const formData = new FormData();
        // 添加文件
        formData.append('myFile', fileData);
        this.postPhoto(formData);
    }

    render() {
        const photos = this.props.photos;
        // console.log(photos);
        return (
            <Display_template
                rouse={this.props.rouse}
                changeColor={this.props.changeColor}
                name='PhotoAlbum'
                title='相册'
                catalogue={
                    <div className="photoFile">
                        {photos.map(photo => {
                            return <Photo key={photo} src={photo} className={this.state.className} changeView={this.changeView} />
                        })}
                        <button className="postPhoto" onClick={() => this.upload()}>
                            上传图片
                            <input type='file' ref={this.fileRef} accept=".png,.svg,.jpg,.jpeg,.gif" onChange={ev => this.getfile(ev)} />
                        </button>
                    </div>
                }
                content={
                    <div className="previewMain">
                        <h3>图片预览</h3>
                        <button onClick={() => this.changeBackground()}>设置为壁纸 <i className="iconfont icon-icon"></i></button>
                        <div className="preview">
                            <img src={this.state.view}></img>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default PhotoAlbum;