import request from '@/utils/request'

// 查询生产操作管理列表
export function listOperation(query) {
  return request({
    url: '/system/operation/list',
    method: 'get',
    params: query
  })
}

// 查询生产操作管理详细
export function getOperation(operationId) {
  return request({
    url: '/system/operation/' + operationId,
    method: 'get'
  })
}

// 新增生产操作管理
export function addOperation(data) {
  return request({
    url: '/system/operation',
    method: 'post',
    data: data
  })
}

// 修改生产操作管理
export function updateOperation(data) {
  return request({
    url: '/system/operation',
    method: 'put',
    data: data
  })
}

// 删除生产操作管理
export function delOperation(operationId) {
  return request({
    url: '/system/operation/' + operationId,
    method: 'delete'
  })
}

// 导出生产操作管理
export function exportOperation(query) {
  return request({
    url: '/system/operation/export',
    method: 'get',
    params: query
  })
}