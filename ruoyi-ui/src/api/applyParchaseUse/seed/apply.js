import request from '@/utils/request'

// 查询种子申请列表
export function listApply(query) {
  return request({
    url: '/seed/apply/list',
    method: 'get',
    params: query
  })
}

// 查询种子申请详细
export function getApply(seedApplyId) {
  return request({
    url: '/seed/apply/' + seedApplyId,
    method: 'get'
  })
}

// 新增种子申请
export function addApply(data) {
  return request({
    url: '/seed/apply',
    method: 'post',
    data: data
  })
}

// 修改种子申请
export function updateApply(data) {
  return request({
    url: '/seed/apply/edit',
    method: 'put',
    data: data
  })
}

// 删除种子申请
export function delApply(seedApplyId) {
  return request({
    url: '/seed/apply/' + seedApplyId,
    method: 'delete'
  })
}

// 导出种子申请
export function exportApply(query) {
  return request({
    url: '/seed/apply/export',
    method: 'get',
    params: query
  })
}
