import request from '@/utils/request'

// 查询VIEW列表
export function listCustomers(query) {
  return request({
    url: '/system/customers/list',
    method: 'get',
    params: query
  })
}

// 查询VIEW详细
export function getCustomers(companyName) {
  return request({
    url: '/system/customers/' + companyName,
    method: 'get'
  })
}

// 新增VIEW
export function addCustomers(data) {
  return request({
    url: '/system/customers',
    method: 'post',
    data: data
  })
}

// 修改VIEW
export function updateCustomers(data) {
  return request({
    url: '/system/customers',
    method: 'put',
    data: data
  })
}

// 删除VIEW
export function delCustomers(companyName) {
  return request({
    url: '/system/customers/' + companyName,
    method: 'delete'
  })
}

// 导出VIEW
export function exportCustomers(query) {
  return request({
    url: '/system/customers/export',
    method: 'get',
    params: query
  })
}