import request from '@/utils/request'

// 查询穴盘临时申请领用详细列表
export function listApplyTemporary(query) {
  return request({
    url: '/plug/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘临时申请领用详细详细
export function getApplyTemporary(plugApplyTemporaryId) {
  return request({
    url: '/plug/applyTemporary/' + plugApplyTemporaryId,
    method: 'get'
  })
}

// 新增穴盘临时申请领用详细
export function addApplyTemporary(data) {
  return request({
    url: '/plug/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改穴盘临时申请领用详细
export function updateApplyTemporary(data) {
  return request({
    url: '/plug/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除穴盘临时申请领用详细
export function delApplyTemporary(plugApplyTemporaryId) {
  return request({
    url: '/plug/applyTemporary/' + plugApplyTemporaryId,
    method: 'delete'
  })
}

// 导出穴盘临时申请领用详细
export function exportApplyTemporary(query) {
  return request({
    url: '/plug/applyTemporary/export',
    method: 'get',
    params: query
  })
}