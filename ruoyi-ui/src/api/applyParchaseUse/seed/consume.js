import request from '@/utils/request'

// 查询种子领用信息列表
export function listConsume(query) {
  return request({
    url: '/seed/consume/list',
    method: 'get',
    params: query
  })
}

// 查询种子领用信息详细
export function getConsume(seedConsumeId) {
  return request({
    url: '/seed/consume/' + seedConsumeId,
    method: 'get'
  })
}

// 新增种子领用信息
export function addConsume(data) {
  return request({
    url: '/seed/consume',
    method: 'post',
    data: data
  })
}

// 修改种子领用信息
export function updateConsume(data) {
  return request({
    url: '/seed/consume',
    method: 'put',
    data: data
  })
}

// 删除种子领用信息
export function delConsume(seedConsumeId) {
  return request({
    url: '/seed/consume/' + seedConsumeId,
    method: 'delete'
  })
}

// 导出种子领用信息
export function exportConsume(query) {
  return request({
    url: '/seed/consume/export',
    method: 'get',
    params: query
  })
}