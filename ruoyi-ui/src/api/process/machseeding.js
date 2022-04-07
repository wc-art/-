import request from '@/utils/request'

// 查询机器播种管理列表
export function listMachseeding(query) {
  return request({
    url: '/process/machseeding/list',
    method: 'get',
    params: query
  })
}
export function listUser(query) {
  return request({
    url: '/system/user/list',
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
// 查询机器播种管理详细
export function getMachseeding(workMachseedingId) {
  return request({
    url: '/process/machseeding/' + workMachseedingId,
    method: 'get'
  })
}

// 新增机器播种管理
export function addMachseeding(data) {
  return request({
    url: '/process/machseeding',
    method: 'post',
    data: data
  })
}

// 修改机器播种管理
export function updateMachseeding(data) {
  return request({
    url: '/process/machseeding',
    method: 'put',
    data: data
  })
}

// 删除机器播种管理
export function delMachseeding(workMachseedingId) {
  return request({
    url: '/process/machseeding/' + workMachseedingId,
    method: 'delete'
  })
}

// 导出机器播种管理
export function exportMachseeding(query) {
  return request({
    url: '/process/machseeding/export',
    method: 'get',
    params: query
  })
}
