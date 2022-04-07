import request from '@/utils/request'

// 查询operation列表
export function listOperation(query) {
  return request({
    url: '/system/operation/list',
    method: 'get',
    params: query
  })
}

// 查询operation详细
export function getOperation(operationId) {
  return request({
    url: '/system/operation/' + operationId,
    method: 'get'
  })
}

// 新增operation
export function addOperation(data) {
  return request({
    url: '/system/operation',
    method: 'post',
    data: data
  })
}

// 修改operation
export function updateOperation(data) {
  return request({
    url: '/system/operation',
    method: 'put',
    data: data
  })
}

// 删除operation
export function delOperation(operationId) {
  return request({
    url: '/system/operation/' + operationId,
    method: 'delete'
  })
}

// 导出operation
export function exportOperation(query) {
  return request({
    url: '/system/operation/export',
    method: 'get',
    params: query
  })
}