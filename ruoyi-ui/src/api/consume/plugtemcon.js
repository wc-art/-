import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listPlugtemcon(query) {
  return request({
    url: '/consume/plugtemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getPlugtemcon(plugConsumeTemporaryId) {
  return request({
    url: '/consume/plugtemcon/' + plugConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addPlugtemcon(data) {
  return request({
    url: '/consume/plugtemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updatePlugtemcon(data) {
  return request({
    url: '/consume/plugtemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delPlugtemcon(plugConsumeTemporaryId) {
  return request({
    url: '/consume/plugtemcon/' + plugConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportPlugtemcon(query) {
  return request({
    url: '/consume/plugtemcon/export',
    method: 'get',
    params: query
  })
}