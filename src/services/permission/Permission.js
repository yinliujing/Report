/**
 * 权限管理
 * @author jinchaofan
 * @date 2020/2/18
 */
import http from '../CommonHttp'

/**
 * 保存角色权限
 * @param params
 * @param call
 * @returns {Promise<any | never>}
 */
export function saveRolePermissionApi(params, call) {
  return http.post('/permission/role/save', params).then(call);
}

export default {
}
