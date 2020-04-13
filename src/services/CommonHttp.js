
import axios from 'axios'
import qs from 'qs'
// import store from '../store'
import commonUtils from '../utils/Common'
//base url

// http://mf.kiisoo.com:58080/
// axios.defaults.baseURL = 'http://mf.kiisoo.com:58080/gds/api';
axios.defaults.baseURL = '/kiisoo-ic';
//响应时间
axios.defaults.timeout = 120000;
axios.defaults.withCredentials=true;

//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * POST传参序列化(添加请求拦截器)
 */
axios.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;';
    // config.headers['Authorization'] = sessionStorage.getItem("sessionId");

    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

        var str = qs.stringify(config.data);
        config.data = str;
    }
    return config;
},(error) =>{
    // console.log('错误的传参')
    return Promise.reject(error);
});

/**
 * 返回状态判断(添加响应拦截器)
 */
axios.interceptors.response.use((res) =>{
    let data = res.data.results;

    if(res.data.code == '9999' && sessionStorage.getItem("logout")){
        // iView.Message.error('会话超时，请重新登录');
        // store.commit('LOGOUT');
        commonUtils.goToLogin();
        return Promise.resolve(res);
    }

    //对响应数据做些事
    if(!data){
        return Promise.resolve(res);
    }

    if(data.code == "1001"){
        // iView.Message.error("账号不存在");
        return Promise.resolve(res);
    }

    if(data.code == "1002"){
        // iView.Message.error("账号已停用");
        return Promise.resolve(res);
    }

    if(data.code == "1003"){
        // iView.Message.error("密码错误");
        return Promise.resolve(res);
    }

    if(data.code == "1004"){
        // iView.Message.error("账号已注销");
        return Promise.resolve(res);
    }

    if(data.code == "1005"){
        // iView.Message.error("账号未绑定品牌");
        return Promise.resolve(res);
    }

    if(data.code == "1006"){
        // iView.Message.error("账号未绑定店铺");
        return Promise.resolve(res);
    }

    if(data.code == "1007"){
        // iView.Message.error("账号无权限");
        return Promise.resolve(res);
    }
    if(data.code == "1009"){
        // iView.Message.error("账号已过时");
        return Promise.resolve(res);
    }

    if(data.code == "0001"){
        // this.$Message.error("系统繁忙，请重试");
        return Promise.resolve(res);
    }

    if(data.code != "0000") {
        // this.$Message.error(data.errorMsg);
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    // iView.Message.error('网络异常');
    return Promise.reject(error);
});

/**
 * 返回一个Promise(发送get请求)
 * @param url
 * @param param
 * @returns {Promise<any>}
 */
export function get(url, param) {
    return new Promise((resolve, reject) => {
        // iView.LoadingBar.start();
        axios.get(url, {params: param})
            .then(response => {
                // iView.LoadingBar.finish();
                resolve(response)
            }, err => {
                // iView.LoadingBar.finish();
                reject(err)
            })
            .catch((error) => {
                // iView.LoadingBar.finish();
                reject(error)
            })
    })
}

/**
 * 返回一个Promise(发送post请求)
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        // iView.LoadingBar.start();
        axios.post(url, params)
            .then(response => {
                // iView.LoadingBar.finish();
                resolve(response);
            }, err => {
                // iView.LoadingBar.finish();
                reject(err);
            })
            .catch((error) => {
                // iView.LoadingBar.finish();
                reject(error)
            })
    })
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        // iView.LoadingBar.start();
        axios.put(url, params)
            .then(response => {
                // iView.LoadingBar.finish();
                resolve(response);
            }, err => {
                // iView.LoadingBar.finish();
                reject(err);
            })
            .catch((error) => {
                // iView.LoadingBar.finish();
                reject(error)
            })
    })
}

export function fetchDelete(url, params) {
    return new Promise((resolve, reject) => {
        // iView.LoadingBar.start();
        axios.delete(url, params)
            .then(response => {
                // iView.LoadingBar.finish();
                resolve(response);
            }, err => {
                // iView.LoadingBar.finish();
                reject(err);
            })
            .catch((error) => {
                // iView.LoadingBar.finish();
                reject(error)
            })
    })
}

export function getBaseUrl() {
    return axios.defaults.baseURL;
}

export default {
    get,
    post,
    put,
    fetchDelete,
    getBaseUrl
}
