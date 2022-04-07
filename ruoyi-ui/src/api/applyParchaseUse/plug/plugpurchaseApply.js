import request from '@/utils/request'

// 查询穴盘购买申请列表
export function listPlugpurchaseApply(query) {
  return request({
    url: '/system/plugpurchaseApply/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘购买申请详细
export function getPlugpurchaseApply(plugPurchaseApplyId) {
  return request({
    url: '/system/plugpurchaseApply/' + plugPurchaseApplyId,
    method: 'get'
  })
}

// 新增穴盘购买申请
export function addPlugpurchaseApply(data) {
  return request({
    url: '/system/plugpurchaseApply',
    method: 'post',
    data: data
  })
}

// 修改穴盘购买申请
export function updatePlugpurchaseApply(data) {
  return request({
    url: '/system/plugpurchaseApply',
    method: 'put',
    data: data
  })
}

// 删除穴盘购买申请
export function delPlugpurchaseApply(plugPurchaseApplyId) {
  return request({
    url: '/system/plugpurchaseApply/' + plugPurchaseApplyId,
    method: 'delete'
  })
}

// 导出穴盘购买申请
export function exportPlugpurchaseApply(query) {
  return request({
    url: '/system/plugpurchaseApply/export',
    method: 'get',
    params: query
  })
}