import request from '@/utils/request'

// 查询订单任务执行列表
export function listFulfillment(query) {
  return request({
    url: '/system/fulfillment/list',
    method: 'get',
    params: query
  })
}

// 查询订单任务执行详细
export function getFulfillment(orderFulfillmentId) {
  return request({
    url: '/system/fulfillment/' + orderFulfillmentId,
    method: 'get'
  })
}

// 新增订单任务执行
export function addFulfillment(data) {
  return request({
    url: '/system/fulfillment',
    method: 'post',
    data: data
  })
}

// 修改订单任务执行
export function updateFulfillment(data) {
  return request({
    url: '/system/fulfillment',
    method: 'put',
    data: data
  })
}

// 删除订单任务执行
export function delFulfillment(orderFulfillmentId) {
  return request({
    url: '/system/fulfillment/' + orderFulfillmentId,
    method: 'delete'
  })
}

// 导出订单任务执行
export function exportFulfillment(query) {
  return request({
    url: '/system/fulfillment/export',
    method: 'get',
    params: query
  })
}