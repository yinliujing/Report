/**
 * 添加账号
 * @author jinchaofan
 * @date 2020/2/18
 */
import http from '../CommonHttp'

/**
 * 查询所有店铺
 * @param params
 * @param call
 * @returns {Promise<any | never>}
 */
export function listShopApi(params, call) {
  return http.get('account/shop/list', params).then(call);
}

export default {
  listShopApi
}
