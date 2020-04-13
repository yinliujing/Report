/**
 * 客户数据明细
 */

import http from '../CommonHttp'

/**
 * 查询客户数据明细
 */
export function dataDetail(params, call) {
    return http.post('/customer/info',params).then(call)
}

/**
 * 下拉框数据导购
 */
export function downSellerData(params, call) {
    return http.post('/poi/seller/user/seller',params).then(call)
}

/**
 * 下拉框数据店铺
 */
export function downShopData(params, call) {
    return http.post('/poi/store/user/shop',params).then(call)
}

/**
 * 修改用户名称
 */
export function editCustomerData(params, call) {
    return http.post('/customer/edit/info',params).then(call)
}

/**
 * 下拉框数据区域
 */
export function downRegionData(params, call) {
    return http.post('/region/user/only/region',params).then(call)
}

export default {
    dataDetail: dataDetail,
    downSellerData: downSellerData,
    downShopData,
    downRegionData,
    editCustomerData
}
