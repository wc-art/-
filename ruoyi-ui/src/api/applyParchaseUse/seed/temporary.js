import request from '@/utils/request'

// 查询种子临时申请列表
export function listTemporary(query) {
  return request({
    url: '/seed/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询种子临时申请详细
export function getTemporary(seedApplyTemporaryId) {
  return request({
    url: '/seed/applyTemporary/' + seedApplyTemporaryId,
    method: 'get'
  })
}

// 新增种子临时申请
export function addTemporary(data) {
  return request({
    url: '/seed/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改种子临时申请
export function updateTemporary(data) {
  return request({
    url: '/seed/applyTemporary/edit',
    method: 'put',
    data: data
  })
}

// 删除种子临时申请
export function delTemporary(seedApplyTemporaryId) {
  return request({
    url: '/seed/applyTemporary/' + seedApplyTemporaryId,
    method: 'delete'
  })
}

// 导出种子临时申请
export function exportTemporary(query) {
  return request({
    url: '/seed/applyTemporary/export',
    method: 'get',
    params: query
  })
}
