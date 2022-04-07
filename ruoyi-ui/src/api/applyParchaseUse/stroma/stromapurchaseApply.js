import request from '@/utils/request'

// 查询基质购买申请信息列表
export function listStromapurchaseApply(query) {
  return request({
    url: '/stroma/stromapurchaseApply/list',
    method: 'get',
    params: query
  })
}

// 查询基质购买申请信息详细
export function getStromapurchaseApply(stromaPurchaseApplyId) {
  return request({
    url: '/stroma/stromapurchaseApply/' + stromaPurchaseApplyId,
    method: 'get'
  })
}

// 新增基质购买申请信息
export function addStromapurchaseApply(data) {
  return request({
    url: '/stroma/stromapurchaseApply',
    method: 'post',
    data: data
  })
}

// 修改基质购买申请信息
export function updateStromapurchaseApply(data) {
  return request({
    url: '/stroma/stromapurchaseApply',
    method: 'put',
    data: data
  })
}

// 删除基质购买申请信息
export function delStromapurchaseApply(stromaPurchaseApplyIds) {
  return request({
    url: '/stroma/stromapurchaseApply/' + stromaPurchaseApplyIds,
    method: 'delete'
  })
}

// 导出基质购买申请信息
export function exportStromapurchaseApply(query) {
  return request({
    url: '/stroma/stromapurchaseApply/export',
    method: 'get',
    params: query
  })
}