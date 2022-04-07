import request from '@/utils/request'

// 查询穴盘类型列表
export function listPlugType(query) {
  return request({
    url: '/production/plugType/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘购买信息列表
export function listPlugPurchase(query) {
  return request({
    url: '/production/plugPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘购买信息详细
export function getPlugPurchase(plugPurchaseId) {
  return request({
    url: '/production/plugPurchase/' + plugPurchaseId,
    method: 'get'
  })
}

// 新增穴盘购买信息
export function addPlugPurchase(data) {
  return request({
    url: '/production/plugPurchase',
    method: 'post',
    data: data
  })
}

// 修改穴盘购买信息
export function updatePlugPurchase(data) {
  return request({
    url: '/production/plugPurchase',
    method: 'put',
    data: data
  })
}

// 删除穴盘购买信息
export function delPlugPurchase(plugPurchaseId) {
  return request({
    url: '/production/plugPurchase/' + plugPurchaseId,
    method: 'delete'
  })
}

// 导出穴盘购买信息
export function exportPlugPurchase(query) {
  return request({
    url: '/production/plugPurchase/export',
    method: 'get',
    params: query
  })
}
