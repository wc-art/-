import request from '@/utils/request'

// 查询订单参数管理列表
export function listOrder(query) {
  return request({
    url: '/system/order/list',
    method: 'get',
    params: query
  })
}

// 查询订单参数管理详细
export function getOrder(parameterOrderId) {
  return request({
    url: '/system/order/' + parameterOrderId,
    method: 'get'
  })
}

// 新增订单参数管理
export function addOrder(data) {
  return request({
    url: '/system/order',
    method: 'post',
    data: data
  })
}

// 修改订单参数管理
export function updateOrder(data) {
  return request({
    url: '/system/order',
    method: 'put',
    data: data
  })
}

// 删除订单参数管理
export function delOrder(parameterOrderId) {
  return request({
    url: '/system/order/' + parameterOrderId,
    method: 'delete'
  })
}

// 导出订单参数管理
export function exportOrder(query) {
  return request({
    url: '/system/order/export',
    method: 'get',
    params: query
  })
}