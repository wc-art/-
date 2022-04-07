import request from '@/utils/request'

// 查询化肥申请列表
export function listApply(query) {
  return request({
    url: '/fertilizer/apply/list',
    method: 'get',
    params: query
  })
}

// 查询化肥申请详细
export function getApply(fertilizerApplyId) {
  return request({
    url: '/fertilizer/apply/' + fertilizerApplyId,
    method: 'get'
  })
}

// 新增化肥申请
export function addApply(data) {
  return request({
    url: '/fertilizer/apply',
    method: 'post',
    data: data
  })
}

// 修改化肥申请
export function updateApply(data) {
  return request({
    url: '/fertilizer/apply',
    method: 'put',
    data: data
  })
}

// 删除化肥申请
export function delApply(fertilizerApplyId) {
  return request({
    url: '/fertilizer/apply/' + fertilizerApplyId,
    method: 'delete'
  })
}

// 导出化肥申请
export function exportApply(query) {
  return request({
    url: '/fertilizer/apply/export',
    method: 'get',
    params: query
  })
}