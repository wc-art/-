import request from '@/utils/request'

// 查询刀片购买详细列表
export function listBladeApply(query) {
  return request({
    url: '/system/bladeApply/list',
    method: 'get',
    params: query
  })
}

// 查询刀片购买详细详细
export function getBladeApply(bladePurchaseApplyId) {
  return request({
    url: '/system/bladeApply/' + bladePurchaseApplyId,
    method: 'get'
  })
}

// 新增刀片购买详细
export function addBladeApply(data) {
  return request({
    url: '/system/bladeApply',
    method: 'post',
    data: data
  })
}

// 修改刀片购买详细
export function updateBladeApply(data) {
  return request({
    url: '/system/bladeApply',
    method: 'put',
    data: data
  })
}

// 删除刀片购买详细
export function delBladeApply(bladePurchaseApplyId) {
  return request({
    url: '/system/bladeApply/' + bladePurchaseApplyId,
    method: 'delete'
  })
}

// 导出刀片购买详细
export function exportBladeApply(query) {
  return request({
    url: '/system/bladeApply/export',
    method: 'get',
    params: query
  })
}