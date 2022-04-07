import request from '@/utils/request'

// 查询化肥临时申请列表
export function listApplyTemporary(query) {
  return request({
    url: '/fertilizer/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询化肥临时申请详细
export function getApplyTemporary(fertilizerApplyTemporaryId) {
  return request({
    url: '/fertilizer/applyTemporary/' + fertilizerApplyTemporaryId,
    method: 'get'
  })
}

// 新增化肥临时申请
export function addApplyTemporary(data) {
  return request({
    url: '/fertilizer/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改化肥临时申请
export function updateApplyTemporary(data) {
  return request({
    url: '/fertilizer/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除化肥临时申请
export function delApplyTemporary(fertilizerApplyTemporaryId) {
  return request({
    url: '/fertilizer/applyTemporary/' + fertilizerApplyTemporaryId,
    method: 'delete'
  })
}

// 导出化肥临时申请
export function exportApplyTemporary(query) {
  return request({
    url: '/fertilizer/applyTemporary/export',
    method: 'get',
    params: query
  })
}