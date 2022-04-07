import request from '@/utils/request'

// 查询刀片临时l申请领用详细列表
export function listApplyTemporary(query) {
  return request({
    url: '/blade/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询刀片临时l申请领用详细详细
export function getApplyTemporary(bladeApplyTemporaryId) {
  return request({
    url: '/blade/applyTemporary/' + bladeApplyTemporaryId,
    method: 'get'
  })
}

// 新增刀片临时l申请领用详细
export function addApplyTemporary(data) {
  return request({
    url: '/blade/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改刀片临时l申请领用详细
export function updateApplyTemporary(data) {
  return request({
    url: '/blade/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除刀片临时l申请领用详细
export function delApplyTemporary(bladeApplyTemporaryId) {
  return request({
    url: '/blade/applyTemporary/' + bladeApplyTemporaryId,
    method: 'delete'
  })
}

// 导出刀片临时l申请领用详细
export function exportApplyTemporary(query) {
  return request({
    url: '/blade/applyTemporary/export',
    method: 'get',
    params: query
  })
}