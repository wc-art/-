import request from '@/utils/request'

// 查询农药名称列表
export function listPesticideName(query) {
  return request({
    url: '/production/pesticideName/list',
    method: 'get',
    params: query
  })
}

// 查询农药类型列表
export function listPesticideType(query) {
  return request({
    url: '/production/pesticideType/list',
    method: 'get',
    params: query
  })
}

// 查询农药购买信息列表
export function listPesticidePurchase(query) {
  return request({
    url: '/production/pesticidePurchase/list',
    method: 'get',
    params: query
  })
}

// 查询农药购买信息详细
export function getPesticidePurchase(pesticidePurchaseId) {
  return request({
    url: '/production/pesticidePurchase/' + pesticidePurchaseId,
    method: 'get'
  })
}

// 新增农药购买信息
export function addPesticidePurchase(data) {
  return request({
    url: '/production/pesticidePurchase',
    method: 'post',
    data: data
  })
}

// 修改农药购买信息
export function updatePesticidePurchase(data) {
  return request({
    url: '/production/pesticidePurchase',
    method: 'put',
    data: data
  })
}

// 删除农药购买信息
export function delPesticidePurchase(pesticidePurchaseId) {
  return request({
    url: '/production/pesticidePurchase/' + pesticidePurchaseId,
    method: 'delete'
  })
}

// 导出农药购买信息
export function exportPesticidePurchase(query) {
  return request({
    url: '/production/pesticidePurchase/export',
    method: 'get',
    params: query
  })
}
