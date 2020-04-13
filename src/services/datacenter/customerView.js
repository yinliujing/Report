/**
 * 客户数据概览
 * @author wangyinjia
 * @date 2020/4/9
 */

import http from '../CommonHttp'


export function getMainRequest(params, call) {
  return http.get('/customer/view/main', params).then(call)
}


export default {
  //mainList
  getMainRequest,

}
