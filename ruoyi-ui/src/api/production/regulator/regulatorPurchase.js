import request from '@/utils/request'

// 查询调节剂名称列表
export function listRegulatorName(query) {
  return request({
    url: '/production/regulatorName/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂类型列表
export function listRegulatorType(query) {
  return request({
    url: '/production/regulatorType/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂购买信息列表
export function listRegulatorPurchase(query) {
  return request({
    url: '/production/regulatorPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂购买信息详细
export function getRegulatorPurchase(regulatorPurchaseId) {
  return request({
    url: '/production/regulatorPurchase/' + regulatorPurchaseId,
    method: 'get'
  })
}

// 新增调节剂购买信息
export function addRegulatorPurchase(data) {
  return request({
    url: '/production/regulatorPurchase',
    method: 'post',
    data: data
  })
}

// 修改调节剂购买信息
export function updateRegulatorPurchase(data) {
  return request({
    url: '/production/regulatorPurchase',
    method: 'put',
    data: data
  })
}

// 删除调节剂购买信息
export function delRegulatorPurchase(regulatorPurchaseId) {
  return request({
    url: '/production/regulatorPurchase/' + regulatorPurchaseId,
    method: 'delete'
  })
}

// 导出调节剂购买信息
export function exportRegulatorPurchase(query) {
  return request({
    url: '/production/regulatorPurchase/export',
    method: 'get',
    params: query
  })
}
