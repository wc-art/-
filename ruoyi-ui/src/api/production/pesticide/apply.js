import request from '@/utils/request'

// 查询农药申请列表
export function listApply(query) {
  return request({
    url: '/pesticide/apply/list',
    method: 'get',
    params: query
  })
}

// 查询农药申请详细
export function getApply(pesticideApplyId) {
  return request({
    url: '/pesticide/apply/' + pesticideApplyId,
    method: 'get'
  })
}

// 新增农药申请
export function addApply(data) {
  return request({
    url: '/pesticide/apply',
    method: 'post',
    data: data
  })
}

// 修改农药申请
export function updateApply(data) {
  return request({
    url: '/pesticide/apply',
    method: 'put',
    data: data
  })
}

// 删除农药申请
export function delApply(pesticideApplyId) {
  return request({
    url: '/pesticide/apply/' + pesticideApplyId,
    method: 'delete'
  })
}

// 导出农药申请
export function exportApply(query) {
  return request({
    url: '/pesticide/apply/export',
    method: 'get',
    params: query
  })
}