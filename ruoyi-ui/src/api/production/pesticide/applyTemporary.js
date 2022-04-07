import request from '@/utils/request'

// 查询农药临时申请列表
export function listApplyTemporary(query) {
  return request({
    url: '/pesticide/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询农药临时申请详细
export function getApplyTemporary(pesticideApplyTemporaryId) {
  return request({
    url: '/pesticide/applyTemporary/' + pesticideApplyTemporaryId,
    method: 'get'
  })
}

// 新增农药临时申请
export function addApplyTemporary(data) {
  return request({
    url: '/pesticide/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改农药临时申请
export function updateApplyTemporary(data) {
  return request({
    url: '/pesticide/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除农药临时申请
export function delApplyTemporary(pesticideApplyTemporaryId) {
  return request({
    url: '/pesticide/applyTemporary/' + pesticideApplyTemporaryId,
    method: 'delete'
  })
}

// 导出农药临时申请
export function exportApplyTemporary(query) {
  return request({
    url: '/pesticide/applyTemporary/export',
    method: 'get',
    params: query
  })
}