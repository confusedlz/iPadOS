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
            photos: [
                'https://qcv9se.file.qingfuwucdn.com/file/56b887c4607a2527_1644985256304.jpg',
                'https://qcv9se.file.qingfuwucdn.com/file/2bb03faea56df0ef_1644985251802.jpg',
                'https://qcv9se.file.qingfuwucdn.com/file/f0c27d8b1a55856f_1644985240680.jpg',
            ],
            view:'https://qcv9se.file.qingfuwucdn.com/file/56b887c4607a2527_1644985256304.jpg',
            className:'photoItem',
        };
        this.changeView=this.changeView.bind(this);
        this.fileRef=React.createRef();
    }

    componentDidMount(){
        console.log(localStorage.getItem('photos'));
        if(localStorage.getItem('photos')){
            this.setState({photos:[...this.state.photos,...localStorage.getItem('photos')]});
        }
    }

    //修改预览
    changeView(view){
        this.setState({view:view,className:'photoItem'});
    }

    //修改背景
    changeBackground(){
        this.props.changeBackground(this.state.view);
    }

    //上传照片
    postPhoto(formData){
        if(!localStorage.getItem('expireAt')||new Date().getTime()>localStorage.getItem('expireAt')){
            this.props.message('请先登录');
        }else{
            inspirecloud.run('updateUserimg', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => {
                if (res.success) {
                    this.setState({photos:[...this.state.photos,res.url]});
                    this.props.message('上传成功');
                    localStorage.setItem('photos',this.state.photos);
                }
                else{
                    this.props.message('上传失败');
                }
            });
        }
    }

    //选择文件
    upload(){
        this.fileRef.current.click();
    }

    //获取文件
    getfile(ev){
        const fileData = ev.target.files[0];
        const formData = new FormData();
        // 添加文件
        formData.append('myFile', fileData);
        this.postPhoto(formData);
    }

    render() {
        const photos = this.state.photos;
        return (
            <Display_template
                rouse={this.props.rouse}
                name='PhotoAlbum'
                title='相册'
                catalogue={
                    <div className="photoFile">
                        {photos.map(photo => {
                            return <Photo key={photo} src={photo} className={this.state.className} changeView={this.changeView}/>
                        })}
                        <button className="postPhoto" onClick={()=>this.upload()}>
                            上传图片
                            <input type='file' ref={this.fileRef} accept=".png,.svg,.jpg,.jpeg,.gif" onChange={ev=>this.getfile(ev)}/>
                        </button>
                    </div>
                }
                content={
                    <div className="previewMain">
                        <h3>图片预览</h3>
                        <button onClick={()=>this.changeBackground()}>更改壁纸 <i className="iconfont icon-icon"></i></button>
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