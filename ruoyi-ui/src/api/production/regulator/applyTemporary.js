import request from '@/utils/request'

// 查询调节剂临时申请列表
export function listApplyTemporary(query) {
  return request({
    url: '/regulator/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂临时申请详细
export function getApplyTemporary(regulatorApplyTemporaryId) {
  return request({
    url: '/regulator/applyTemporary/' + regulatorApplyTemporaryId,
    method: 'get'
  })
}

// 新增调节剂临时申请
export function addApplyTemporary(data) {
  return request({
    url: '/regulator/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改调节剂临时申请
export function updateApplyTemporary(data) {
  return request({
    url: '/regulator/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除调节剂临时申请
export function delApplyTemporary(regulatorApplyTemporaryId) {
  return request({
    url: '/regulator/applyTemporary/' + regulatorApplyTemporaryId,
    method: 'delete'
  })
}

// 导出调节剂临时申请
export function exportApplyTemporary(query) {
  return request({
    url: '/regulator/applyTemporary/export',
    method: 'get',
    params: query
  })
}