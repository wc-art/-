import request from '@/utils/request'

// 查询用户列表
export function listCustomer(query) {
  return request({
    url: '/system/customer/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getCustomer(customerId) {
  return request({
    url: '/system/customer/' + customerId,
    method: 'get'
  })
}

// 新增用户
export function addCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delCustomer(customerId) {
  return request({
    url: '/system/customer/' + customerId,
    method: 'delete'
  })
}

// 导出用户
export function exportCustomer(query) {
  return request({
    url: '/system/customer/export',
    method: 'get',
    params: query
  })
}