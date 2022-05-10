import React from "react";
import './photoAlbum.css';
import Display_template from '../display_template/display_template';
import '../../../public/fonticon/iconfont.css';
import Photo from "./photo/photo";
import request from "../../API/request/request";
import loginState from "../../API/request/user/loginState";

class PhotoAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.photos[0],
            className: 'photoItem',
        };
        this.changeView = this.changeView.bind(this);
        this.fileRef = React.createRef();
        this.postPhoto=this.postPhoto.bind(this);
    }

    componentDidMount(){
        //数据初始化
        loginState().then(loginState => {
            if (loginState) {
                request('getPhotos', { uid: loginState.user.uid }).then(res => {
                    if (res.success) {
                        if (res.photosFile) {
                            const photos = [];
                            for (const value of res.photosFile) {
                                if(value.code==="SUCCESS") photos.push(value.tempFileURL);
                            }
                            if(photos.length>0)this.props.updataUser(true,photos);
                        }
                    }
                });
            }
        });
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
    async postPhoto(file,filename) {
        const loginState1 =await loginState();
        if (!loginState1) {
            this.props.message('请先登录');
        } else {
            const user=loginState1.user;
            filename=encodeURI(filename);
            request('uploadPhoto',{file,uid:user.uid,filename},true).then(res=>{
                if (res.success) {
                    this.props.message('上传成功');
                    this.props.updataUser(true,[res.url]);
                }
                else {
                    this.props.message('上传失败');
                }
            });/*
            request('updateUserimg', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => {
                if (res.success) {
                    this.props.updataUser(true,[res.url]);
                    this.props.message('上传成功');
                    if (localStorage.getItem('photos')){
                        if(typeof localStorage.getItem('photos')=='object') localStorage.setItem('photos',JSON.stringify(...localStorage.getItem('photos'),res.url));
                        else localStorage.setItem('photos',JSON.stringify(localStorage.getItem('photos'),res.url));
                    }
                    else localStorage.setItem('photos',JSON.stringify(res.url));
                    
                }
                else {
                    this.props.message('上传失败');
                }
            });*/
        }
    }

    //选择文件
    upload() {
        this.fileRef.current.click();
    }

    //获取文件
    getfile(ev) {
        const fileData = ev.target.files[0];
        /*const formData = new FormData();
        // 添加文件
        formData.append('myFile', fileData);
        this.postPhoto(formData);*/
        const fileToBuffer = (fileData, fun) => {
            const fr = new FileReader();
            const filename = fileData.name;
            // fr.readAsDataURL(fileData);
            fr.readAsArrayBuffer(fileData);
            fr.onload=ev=>{
                const buf=Buffer.from(ev.target.result);
                fun(buf,filename);
            };
        }
        fileToBuffer(fileData,this.postPhoto);
    }

    render() {
        const photos = this.props.photos;
        return (
            <Display_template
                close={this.props.close}
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