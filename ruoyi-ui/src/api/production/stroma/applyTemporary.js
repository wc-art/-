import request from '@/utils/request'

// 查询基质临时申请列表
export function listApplyTemporary(query) {
  return request({
    url: '/stroma/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询基质临时申请详细
export function getApplyTemporary(stromaApplyTemporayId) {
  return request({
    url: '/stroma/applyTemporary/' + stromaApplyTemporayId,
    method: 'get'
  })
}

// 新增基质临时申请
export function addApplyTemporary(data) {
  return request({
    url: '/stroma/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改基质临时申请
export function updateApplyTemporary(data) {
  return request({
    url: '/stroma/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除基质临时申请
export function delApplyTemporary(stromaApplyTemporayId) {
  return request({
    url: '/stroma/applyTemporary/' + stromaApplyTemporayId,
    method: 'delete'
  })
}

// 导出基质临时申请
export function exportApplyTemporary(query) {
  return request({
    url: '/stroma/applyTemporary/export',
    method: 'get',
    params: query
  })
}