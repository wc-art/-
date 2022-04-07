import request from '@/utils/request'

// 查询刀片申请领用详细列表
export function listApply(query) {
  return request({
    url: '/blade/apply/list',
    method: 'get',
    params: query
  })
}

// 查询刀片申请领用详细详细
export function getApply(bladeApplyId) {
  return request({
    url: '/blade/apply/' + bladeApplyId,
    method: 'get'
  })
}

// 新增刀片申请领用详细
export function addApply(data) {
  return request({
    url: '/blade/apply',
    method: 'post',
    data: data
  })
}

// 修改刀片申请领用详细
export function updateApply(data) {
  return request({
    url: '/blade/apply',
    method: 'put',
    data: data
  })
}

// 删除刀片申请领用详细
export function delApply(bladeApplyId) {
  return request({
    url: '/blade/apply/' + bladeApplyId,
    method: 'delete'
  })
}

// 导出刀片申请领用详细
export function exportApply(query) {
  return request({
    url: '/blade/apply/export',
    method: 'get',
    params: query
  })
}