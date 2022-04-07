import request from '@/utils/request'


// 查询刀片类型列表
export function listBladeType(query) {
  return request({
    url: '/production/bladeType/list',
    method: 'get',
    params: query
  })
}

// 查询刀片购买信息列表
export function listBaldePurchase(query) {
  return request({
    url: '/production/baldePurchase/list',
    method: 'get',
    params: query
  })
}

// 查询刀片购买信息详细
export function getBaldePurchase(bladePurchaseId) {
  return request({
    url: '/production/baldePurchase/' + bladePurchaseId,
    method: 'get'
  })
}

// 新增刀片购买信息
export function addBaldePurchase(data) {
  return request({
    url: '/production/baldePurchase',
    method: 'post',
    data: data
  })
}

// 修改刀片购买信息
export function updateBaldePurchase(data) {
  return request({
    url: '/production/baldePurchase',
    method: 'put',
    data: data
  })
}

// 删除刀片购买信息
export function delBaldePurchase(bladePurchaseId) {
  return request({
    url: '/production/baldePurchase/' + bladePurchaseId,
    method: 'delete'
  })
}

// 导出刀片购买信息
export function exportBaldePurchase(query) {
  return request({
    url: '/production/baldePurchase/export',
    method: 'get',
    params: query
  })
}
