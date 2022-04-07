import request from '@/utils/request'

// 查询棚膜申请列表
export function listApply(query) {
  return request({
    url: '/greenhousefile/apply/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜申请详细
export function getApply(greenhousefilmApplyId) {
  return request({
    url: '/greenhousefile/apply/' + greenhousefilmApplyId,
    method: 'get'
  })
}

// 新增棚膜申请
export function addApply(data) {
  return request({
    url: '/greenhousefile/apply',
    method: 'post',
    data: data
  })
}

// 修改棚膜申请
export function updateApply(data) {
  return request({
    url: '/greenhousefile/apply',
    method: 'put',
    data: data
  })
}

// 删除棚膜申请
export function delApply(greenhousefilmApplyId) {
  return request({
    url: '/greenhousefile/apply/' + greenhousefilmApplyId,
    method: 'delete'
  })
}

// 导出棚膜申请
export function exportApply(query) {
  return request({
    url: '/greenhousefile/apply/export',
    method: 'get',
    params: query
  })
}