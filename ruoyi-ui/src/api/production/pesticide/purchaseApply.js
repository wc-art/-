import request from '@/utils/request'

// 查询农药购买申请列表
export function listPesticidePurchaseApply(query) {
  return request({
    url: '/system/pesticideApply/list',
    method: 'get',
    params: query
  })
}

// 查询农药购买申请详细
export function getPesticidePurchaseApply(pesticidePurchaseApplyId) {
  return request({
    url: '/system/pesticideApply/' + pesticidePurchaseApplyId,
    method: 'get'
  })
}

// 新增农药购买申请
export function addPesticidePurchaseApply(data) {
  return request({
    url: '/system/pesticideApply',
    method: 'post',
    data: data
  })
}

// 修改农药购买申请
export function updatePesticidePurchaseApply(data) {
  return request({
    url: '/system/pesticideApply',
    method: 'put',
    data: data
  })
}

// 删除农药购买申请
export function delPesticidePurchaseApply(pesticidePurchaseApplyId) {
  return request({
    url: '/system/pesticideApply/' + pesticidePurchaseApplyId,
    method: 'delete'
  })
}

// 导出农药购买申请
export function exportPesticidePurchaseApply(query) {
  return request({
    url: '/system/pesticideApply/export',
    method: 'get',
    params: query
  })
}
