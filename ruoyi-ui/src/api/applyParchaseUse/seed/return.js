import request from '@/utils/request'

// 查询种子退回信息列表
export function listReturn(query) {
  return request({
    url: '/seed/return/list',
    method: 'get',
    params: query
  })
}

// 查询种子退回信息详细
export function getReturn(seedReturnId) {
  return request({
    url: '/seed/return/' + seedReturnId,
    method: 'get'
  })
}

// 新增种子退回信息
export function addReturn(data) {
  return request({
    url: '/seed/return',
    method: 'post',
    data: data
  })
}

// 修改种子退回信息
export function updateReturn(data) {
  return request({
    url: '/seed/return',
    method: 'put',
    data: data
  })
}

// 删除种子退回信息
export function delReturn(seedReturnId) {
  return request({
    url: '/seed/return/' + seedReturnId,
    method: 'delete'
  })
}

// 导出种子退回信息
export function exportReturn(query) {
  return request({
    url: '/seed/return/export',
    method: 'get',
    params: query
  })
}