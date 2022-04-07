import request from '@/utils/request'

// 查询棚膜临时申请列表
export function listApplyTemporary(query) {
  return request({
    url: '/greenhousefilm/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜临时申请详细
export function getApplyTemporary(greenhousefilmApplyTemporaryId) {
  return request({
    url: '/greenhousefilm/applyTemporary/' + greenhousefilmApplyTemporaryId,
    method: 'get'
  })
}

// 新增棚膜临时申请
export function addApplyTemporary(data) {
  return request({
    url: '/greenhousefilm/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改棚膜临时申请
export function updateApplyTemporary(data) {
  return request({
    url: '/greenhousefilm/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除棚膜临时申请
export function delApplyTemporary(greenhousefilmApplyTemporaryId) {
  return request({
    url: '/greenhousefilm/applyTemporary/' + greenhousefilmApplyTemporaryId,
    method: 'delete'
  })
}

// 导出棚膜临时申请
export function exportApplyTemporary(query) {
  return request({
    url: '/greenhousefilm/applyTemporary/export',
    method: 'get',
    params: query
  })
}