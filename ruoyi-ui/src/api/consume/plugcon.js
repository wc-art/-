import request from '@/utils/request'

// 查询查看领用信息列表
export function listPlugcon(query) {
  return request({
    url: '/consume/plugcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getPlugcon(plugConsumeId) {
  return request({
    url: '/consume/plugcon/' + plugConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addPlugcon(data) {
  return request({
    url: '/consume/plugcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updatePlugcon(data) {
  return request({
    url: '/consume/plugcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delPlugcon(plugConsumeId) {
  return request({
    url: '/consume/plugcon/' + plugConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportPlugcon(query) {
  return request({
    url: '/consume/plugcon/export',
    method: 'get',
    params: query
  })
}