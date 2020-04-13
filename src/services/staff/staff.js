/**
 * 登录 server层
 * @author dexiang.jiang
 * @date 2019/05/08 18:25
 */

import http from '../CommonHttp'

/**
 * 店铺人员
 * @param params 参数
 * @param call 成功的回调
 * @returns {Promise<any>} 返回Promise对象
 */
export function getStaffList(params, call) {
    return http.get('/store/staff/list', params).then(call)
}

export default {
    getStaffList
}
