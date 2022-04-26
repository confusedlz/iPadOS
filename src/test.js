// import createUser from "../src/request/user/createUser";
import loginOut from "./request/user/loginOut";
import loginState from "./request/user/loginState";
import loginByEmail from "./request/user/loginByEmail";
import addApp from "./request/apps/addApp";
import deleteApp from "../src/request/apps/deleteApp";
import getApp from "./request/apps/getApp";
import addNote from "./request/note/addNote";
import updateUser from "./request/user/updateUser";


export default async () => {
    const email = "1159811802@qq.com", password = "aa123456789";
    const data = {
        params:{
            "appUrl": "https://baidu.com",
            "appName": "百度",
            "email": "1159811802@qq.com"
        },
        functionName: "addApp",
    }
    
    fetch("https://ipad-2gf1azug01855b03-1304065141.ap-guangzhou.app.tcloudbase.com/server", {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => console.log(res.json()))
}

