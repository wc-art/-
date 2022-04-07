import request from '@/utils/request'

// 查询化肥购买申请列表
export function listFertilizerApply(query) {
  return request({
    url: '/system/fertilizerApply/list',
    method: 'get',
    params: query
  })
}

// 查询化肥购买申请详细
export function getFertilizerApply(fertilizerPurchaseApplyId) {
  return request({
    url: '/system/fertilizerApply/' + fertilizerPurchaseApplyId,
    method: 'get'
  })
}

// 新增化肥购买申请
export function addFertilizerApply(data) {
  return request({
    url: '/system/fertilizerApply',
    method: 'post',
    data: data
  })
}

// 修改化肥购买申请
export function updateFertilizerApply(data) {
  return request({
    url: '/system/fertilizerApply',
    method: 'put',
    data: data
  })
}

// 删除化肥购买申请
export function delFertilizerApply(fertilizerPurchaseApplyId) {
  return request({
    url: '/system/fertilizerApply/' + fertilizerPurchaseApplyId,
    method: 'delete'
  })
}

// 导出化肥购买申请
export function exportFertilizerApply(query) {
  return request({
    url: '/system/fertilizerApply/export',
    method: 'get',
    params: query
  })
}