import request from '@/utils/request'

// 查询种子购买信息列表
export function listPurchase(query) {
  return request({
    url: '/seed/purchase/list',
    method: 'get',
    params: query
  })
}

// 查询种子购买信息详细
export function getPurchase(seedPurchaseId) {
  return request({
    url: '/seed/purchase/' + seedPurchaseId,
    method: 'get'
  })
}

// 新增种子购买信息
export function addPurchase(data) {
  return request({
    url: '/seed/purchase',
    method: 'post',
    data: data
  })
}

// 修改种子购买信息
export function updatePurchase(data) {
  return request({
    url: '/seed/purchase',
    method: 'put',
    data: data
  })
}

// 删除种子购买信息
export function delPurchase(seedPurchaseId) {
  return request({
    url: '/seed/purchase/' + seedPurchaseId,
    method: 'delete'
  })
}

// 导出种子购买信息
export function exportPurchase(query) {
  return request({
    url: '/seed/purchase/export',
    method: 'get',
    params: query
  })
}