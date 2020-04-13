/**
 * 公共的JS类
 * @author dexiang.jiang
 * @date 2019/04/18 11:15
 * @company kiisoo
 */

import roter from '../router'
// import store from '../store'

/**
 * 跳转到登录页面
 * @author dexiang.jiang
 * @date 2019/04/18 11:19
 */
export function goToLogin(){
  // store.commit("LOGOUT");
  roter.push('/login');
}

export default {
  goToLogin
}
