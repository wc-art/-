import request from '@/utils/request'

// 查询纸箱临时申请领用详细列表
export function listApplyTemporary(query) {
  return request({
    url: '/carton/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱临时申请领用详细详细
export function getApplyTemporary(cartonApplyTemporaryId) {
  return request({
    url: '/carton/applyTemporary/' + cartonApplyTemporaryId,
    method: 'get'
  })
}

// 新增纸箱临时申请领用详细
export function addApplyTemporary(data) {
  return request({
    url: '/carton/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改纸箱临时申请领用详细
export function updateApplyTemporary(data) {
  return request({
    url: '/carton/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除纸箱临时申请领用详细
export function delApplyTemporary(cartonApplyTemporaryId) {
  return request({
    url: '/carton/applyTemporary/' + cartonApplyTemporaryId,
    method: 'delete'
  })
}

// 导出纸箱临时申请领用详细
export function exportApplyTemporary(query) {
  return request({
    url: '/carton/applyTemporary/export',
    method: 'get',
    params: query
  })
}