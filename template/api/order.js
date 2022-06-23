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
  }
}
