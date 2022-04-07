import request from '@/utils/request'

// 查询出圃管理列表
export function listTransplant(query) {
  return request({
    url: '/transplant/transplant/list',
    method: 'get',
    params: query
  })
}

export function listCustomer(query) {
  return request({
    url: '/system/customer/list',
    method: 'get',
  })
}
export function listOrder(query) {
  return request({
    url: '/system/order/list',
    method: 'get',
  })
}
export function listgreenhouse(query) {
  return request({
    url: 'system/greenhouse/list',
    method: 'get',
  })
}
// 查询出圃管理详细
export function getTransplant(transplantId) {
  return request({
    url: '/transplant/transplant/' + transplantId,
    method: 'get'
  })
}

// 新增出圃管理
export function addTransplant(data) {
  return request({
    url: '/transplant/transplant',
    method: 'post',
    data: data
  })
}

// 修改出圃管理
export function updateTransplant(data) {
  return request({
    url: '/transplant/transplant',
    method: 'put',
    data: data
  })
}

// 删除出圃管理
export function delTransplant(transplantId) {
  return request({
    url: '/transplant/transplant/' + transplantId,
    method: 'delete'
  })
}

// 导出出圃管理
export function exportTransplant(query) {
  return request({
    url: '/transplant/transplant/export',
    method: 'get',
    params: query
  })
}
