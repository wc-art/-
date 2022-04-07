import request from '@/utils/request'

// 查询基质申请列表
export function listApply(query) {
  return request({
    url: '/stroma/apply/list',
    method: 'get',
    params: query
  })
}

// 查询基质申请详细
export function getApply(stromaApplyId) {
  return request({
    url: '/stroma/apply/' + stromaApplyId,
    method: 'get'
  })
}

// 新增基质申请
export function addApply(data) {
  return request({
    url: '/stroma/apply',
    method: 'post',
    data: data
  })
}

// 修改基质申请
export function updateApply(data) {
  return request({
    url: '/stroma/apply',
    method: 'put',
    data: data
  })
}

// 删除基质申请
export function delApply(stromaApplyId) {
  return request({
    url: '/stroma/apply/' + stromaApplyId,
    method: 'delete'
  })
}

// 导出基质申请
export function exportApply(query) {
  return request({
    url: '/stroma/apply/export',
    method: 'get',
    params: query
  })
}