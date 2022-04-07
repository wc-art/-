import request from '@/utils/request'

// 查询种子购买申请列表
export function listApply(query) {
  return request({
    url: '/seed/purchaseApply/list',
    method: 'get',
    params: query
  })
}

// 查询种子购买申请详细
export function getApply(seedPurchaseApplyId) {
  return request({
    url: '/seed/purchaseApply/' + seedPurchaseApplyId,
    method: 'get'
  })
}

// 新增种子购买申请
export function addApply(data) {
  return request({
    url: '/seed/purchaseApply',
    method: 'post',
    data: data
  })
}

// 修改种子购买申请
export function updateApply(data) {
  return request({
    url: '/seed/purchaseApply',
    method: 'put',
    data: data
  })
}

// 删除种子购买申请
export function delApply(seedPurchaseApplyId) {
  return request({
    url: '/seed/purchaseApply/' + seedPurchaseApplyId,
    method: 'delete'
  })
}

// 导出种子购买申请
export function exportApply(query) {
  return request({
    url: '/seed/purchaseApply/export',
    method: 'get',
    params: query
  })
}