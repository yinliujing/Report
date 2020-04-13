/**
 * 账号管理
 * @author jinchaofan
 * @date 2020/2/18
 */
import http from '../CommonHttp'

/**
 * 查询账号
 * @param params
 * @param call
 * @returns {Promise<any | never>}
 */
export function listAccountInfoApi(params, call) {
  return http.post('account/info/list', params).then(call);
}
/**
 * 删除账号
 * @param params
 * @param call
 * @returns {Promise<any | never>}
 */
export function removeAccountApi(params, call) {
  return http.post('account/remove', params).then(call);
}


export default {

  listAccountInfoApi,
  removeAccountApi,

}
