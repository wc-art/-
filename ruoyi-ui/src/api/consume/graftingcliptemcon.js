import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listGraftingcliptemcon(query) {
  return request({
    url: '/consume/graftingcliptemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getGraftingcliptemcon(graftingclipConsumeTemporaryId) {
  return request({
    url: '/consume/graftingcliptemcon/' + graftingclipConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addGraftingcliptemcon(data) {
  return request({
    url: '/consume/graftingcliptemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateGraftingcliptemcon(data) {
  return request({
    url: '/consume/graftingcliptemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delGraftingcliptemcon(graftingclipConsumeTemporaryId) {
  return request({
    url: '/consume/graftingcliptemcon/' + graftingclipConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportGraftingcliptemcon(query) {
  return request({
    url: '/consume/graftingcliptemcon/export',
    method: 'get',
    params: query
  })
}