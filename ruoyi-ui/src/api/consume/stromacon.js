import request from '@/utils/request'

// 查询查看领用信息列表
export function listStromacon(query) {
  return request({
    url: '/consume/stromacon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getStromacon(stromaConsumeId) {
  return request({
    url: '/consume/stromacon/' + stromaConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addStromacon(data) {
  return request({
    url: '/consume/stromacon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateStromacon(data) {
  return request({
    url: '/consume/stromacon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delStromacon(stromaConsumeId) {
  return request({
    url: '/consume/stromacon/' + stromaConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportStromacon(query) {
  return request({
    url: '/consume/stromacon/export',
    method: 'get',
    params: query
  })
}