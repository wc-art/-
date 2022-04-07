import request from '@/utils/request'

// 查询化肥名称列表
export function listFertilizerName(query) {
  return request({
    url: '/production/fertilizerName/list',
    method: 'get',
    params: query
  })
}

// 查询化肥类型列表
export function listFertilizerType(query) {
  return request({
    url: '/production/fertilizerType/list',
    method: 'get',
    params: query
  })
}

// 查询化肥购买信息列表
export function listFertilizerPurchase(query) {
  return request({
    url: '/production/fertilizerPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询化肥购买信息详细
export function getFertilizerPurchase(fertilizerPurchaseId) {
  return request({
    url: '/production/fertilizerPurchase/' + fertilizerPurchaseId,
    method: 'get'
  })
}

// 新增化肥购买信息
export function addFertilizerPurchase(data) {
  return request({
    url: '/production/fertilizerPurchase',
    method: 'post',
    data: data
  })
}

// 修改化肥购买信息
export function updateFertilizerPurchase(data) {
  return request({
    url: '/production/fertilizerPurchase',
    method: 'put',
    data: data
  })
}

// 删除化肥购买信息
export function delFertilizerPurchase(fertilizerPurchaseId) {
  return request({
    url: '/production/fertilizerPurchase/' + fertilizerPurchaseId,
    method: 'delete'
  })
}

// 导出化肥购买信息
export function exportFertilizerPurchase(query) {
  return request({
    url: '/production/fertilizerPurchase/export',
    method: 'get',
    params: query
  })
}
