import request from '@/utils/request'

// 查询查看领用信息列表
export function listGraftingclipcon(query) {
  return request({
    url: '/consume/graftingclipcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getGraftingclipcon(graftingclipConsumeId) {
  return request({
    url: '/consume/graftingclipcon/' + graftingclipConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addGraftingclipcon(data) {
  return request({
    url: '/consume/graftingclipcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateGraftingclipcon(data) {
  return request({
    url: '/consume/graftingclipcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delGraftingclipcon(graftingclipConsumeId) {
  return request({
    url: '/consume/graftingclipcon/' + graftingclipConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportGraftingclipcon(query) {
  return request({
    url: '/consume/graftingclipcon/export',
    method: 'get',
    params: query
  })
}