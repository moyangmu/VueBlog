import axios from 'axios'
import Element from 'element-ui'
import store from "element-ui/packages/cascader-panel/src/store";
import router from "@/router";

axios.defaults.baseURL = "http://47.95.13.8:8081";
// 前置拦截
axios.interceptors.request.use(config=>{

    return config

})
axios.interceptors.response.use(response=>{
    let res = response.data
    if (res.code === 200 ){
        return response
    }else{

        Element.Message.error('错了哦，这是一条错误消息',{duration: 3*1000});
        return Promise.reject(response.data.msg)
        }
    },
    error =>{
        if (error.response.data){
            error.message = error.response.data.msg
        }

        if (error.response.data.status === 401 ){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }else {
            Element.Message.error(error.message,{duration: 3*1000});
            return Promise.reject(error)

        }
    }



)