import request from '@/utils/request'
export default {
  //生成订单接口
  createOrder(courseId) {
    return request({
      url: `/eduorder/order/createOrder/${courseId}`,
      method: 'post'
    })
  },
  //查询订单接口
  getOrderInfo(orderId) {
    return request({
      url: `/eduorder/order/getOrderInfo/${orderId}`,
      method: 'get'
    })
  },
  //生成2微码的方法
  createNativeQRCode(orderNo) {
    return request({
      url: `/eduorder/paylog/createNativeQRCode/${orderNo}`,
      method: 'get'
    })
  },
  //查询订单状态
  queryPayStatus(orderNo) {
    return request({
      url: `/eduorder/paylog/queryPayStatus/${orderNo}`,
      method: 'get'
    })
  },
}
