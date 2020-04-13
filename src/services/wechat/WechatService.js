/**
 * 微信相关 server层
 * @author dexiang.jiang
 * @date 2020/03/12 14:14
 */

import http from '../CommonHttp'

/**
 * 微信页面权限验证
 * @param params 参数
 * @param call 成功的回调
 * @returns {Promise<any>} 返回Promise对象
 */
export function postWechatOauth(params, call) {
    return http.post('/qy/wechat/oauth', params).then(call)
}

export function getExternalContactList(params, call) {
    return http.get('/qy/externalcontact/list', params).then(call)
}

export function getExternalContactWay(params, call) {
    return http.get('/qy/externalcontact/contactway', params).then(call)
}

export function postExternalcontactAddContactWay(params, call) {
    return http.post('/qy/externalcontact/add/contactway', params).then(call)
}

export default {
    postWechatOauth,
    getExternalContactList,
    getExternalContactWay,
    postExternalcontactAddContactWay
}
