import React, { useEffect, useRef, useState } from "react";
import './notebook.css';
import Display_template from "../display_template/display_template";
import Notefile from "./notefile/notefile";
import InspireCloud from '@byteinspire/js-sdk';
const serviceId = 'qcv9se';
const inspirecloud = new InspireCloud({ serviceId });

function Notebook(props) {
    const [options] = useState({ year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const [notebook, setNotebook] = useState(new Map());
    const [id, setId] = useState('');
    const [datas, setDatas] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        inspirecloud.run('getUserNote').then(res => {
            if (res.success) {
                const newn = new Map();
                res.noteBookItemList.map(data => {
                    newn.set(data._id,[data.title,data.datas,new Date(data.updatedAt)]);
                });
                changFoucs(newn.entries().next().value[0],newn.entries().next().value[1][0],newn.entries().next().value[1][1]);
                setNotebook(newn);
            }
        });
    },[]);

    //更新对应的notefile的内容
    function setText(ev) {
        setDatas(ev.target.value);
        const data = [notebook.get(id)[0], ev.target.value, new Date()];
        setNotebook(new Map(
            [...notebook.entries()].map(val => val[0] === id ? [id, data] : val)
        ));
    }

    //更新对应notefile的标题
    function updateTitle(ev) {
        setTitle(ev.target.value);
        const data = [ev.target.value, notebook.get(id)[1], new Date()];
        setNotebook(new Map(
            [...notebook.entries()].map(val => val[0] === id ? [id, data] : val)
        ));
    }

    //删除备忘录中的内容
    function deleteText() {
        setDatas('');
        const data = [notebook.get(id)[0], '', new Date()];
        setNotebook(new Map(
            [...notebook.entries()].map(val => val[0] === id ? [id, data] : val)
        ));
    }

    //新建文件
    function newNoteFile() {
        if (!notebook.has('1')) {
            const newn = new Map().set('1', ['', '', new Date()]);
            notebook.forEach((v, k) => newn.set(k, v));
            changFoucs('1','','');
            setNotebook(newn);
        }
        else {
            props.message('请先写入新备忘录的文本');
        }
    }

    //修改选中文件
    function changFoucs(id, title, datas) {
        setId(id);
        setTitle(title);
        setDatas(datas);
        if (id != '1' && notebook.has('1')) {
            const notenew = new Map();
            notebook.forEach((v, k) => { k !== '1' ? notenew.set(k, v) : null });
            setNotebook(notenew);
        }
    }

    //数据类型转换(Map=>Array)
    function convert() {
        const notebookArray = [];
        notebook.forEach((val, key) => {
            notebookArray.push([key, val])
        });
        return notebookArray;
    }

    //保存文件
    function save(flag) {
        console.log(flag,id,title);
        if (!localStorage.getItem('expireAt') || new Date().getTime() > localStorage.getItem('expireAt')) {
            this.props.message('请先登录');
            return;
        }
        if (id === '1') {
            inspirecloud.run('addNote', {
                title, datas
            }).then(res => {
                if(flag) return;
                if (res.success) {
                    props.message('保存成功');
                    setId(res.id);
                    const newn = new Map().set(res.id, [title, datas, new Date()]);
                    notebook.forEach((v, k) => newn.set(k, v));
                    newn.delete('1');
                    setNotebook(newn);
                }
                else {
                    props.message('保存失败' + res.message);
                }
            });
        }
        else {
            inspirecloud.run('updateNote', {
                id, title, datas
            }).then(res => {
                if(flag) return;
                if (res.success) {
                    props.message('保存成功');
                }
                else {
                    props.message('保存失败' + res.message);
                }
            });
        }
    }

    //删除文件
    function deleteNotefile() {
        inspirecloud.run('deleteNote', {
            id
        }).then(res => {
            if (res.success) {
                props.message('删除成功');
                const newn = new Map();
                notebook.forEach((v, k) => newn.set(k, v));
                newn.delete(id);
                setNotebook(newn);
            }
            else {
                props.message('删除失败' + res.message);
            }
        });
    }

    return (
        <Display_template
            close={props.close}
            rouse={props.rouse}
            changeColor={props.changeColor}
            name='Notebook'
            title='备忘录'
            catalogue={
                <div className="notefile">
                    {convert().map(val => {
                        return <Notefile now={id} id={val[0]} key={val[0]} title={val[1][0]} datas={val[1][1]} date={val[1][2]} deleteNotefile={deleteNotefile} changFoucs={changFoucs} />
                    })}
                </div>
            }
            content={
                <div className="content_main">
                    <div title="新建文件" className="new button" onClick={newNoteFile}><i className="iconfont icon-xinjianbianji"></i></div>
                    <div title="保存" className="save button" onClick={()=>save(false)}><i className="iconfont icon-baocun"></i></div>
                    <div title="清空文本" className="delete button" onClick={() => deleteText()}><i className="iconfont icon-shanchu"></i></div>
                    {id===''?null:<div>
                        <p>{props.date.toLocaleString([], options)}</p>
                        <label><input className="title" value={title} onChange={ev => updateTitle(ev)} /></label>
                        <label><textarea value={datas} spellCheck='false' onChange={ev => setText(ev)} /></label>
                    </div>}
                </div>
            }
        />
    );
}

export default Notebook;