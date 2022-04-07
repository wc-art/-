import request from '@/utils/request'

// 查询调节剂购买申请列表
export function listRegulatorApply(query) {
  return request({
    url: '/system/regulatorApply/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂购买申请详细
export function getRegulatorApply(regulatorPurchaseApplyId) {
  return request({
    url: '/system/regulatorApply/' + regulatorPurchaseApplyId,
    method: 'get'
  })
}

// 新增调节剂购买申请
export function addRegulatorApply(data) {
  return request({
    url: '/system/regulatorApply',
    method: 'post',
    data: data
  })
}

// 修改调节剂购买申请
export function updateRegulatorApply(data) {
  return request({
    url: '/system/regulatorApply',
    method: 'put',
    data: data
  })
}

// 删除调节剂购买申请
export function delRegulatorApply(regulatorPurchaseApplyId) {
  return request({
    url: '/system/regulatorApply/' + regulatorPurchaseApplyId,
    method: 'delete'
  })
}

// 导出调节剂购买申请
export function exportRegulatorApply(query) {
  return request({
    url: '/system/regulatorApply/export',
    method: 'get',
    params: query
  })
}