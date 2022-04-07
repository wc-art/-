import request from '@/utils/request'

// 查询装箱管理列表
export function listPacking(query) {
  return request({
    url: '/process/packing/list',
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
// 查询装箱管理详细
export function getPacking(workPackingId) {
  return request({
    url: '/process/packing/' + workPackingId,
    method: 'get'
  })
}

// 新增装箱管理
export function addPacking(data) {
  return request({
    url: '/process/packing',
    method: 'post',
    data: data
  })
}

// 修改装箱管理
export function updatePacking(data) {
  return request({
    url: '/process/packing',
    method: 'put',
    data: data
  })
}

// 删除装箱管理
export function delPacking(workPackingId) {
  return request({
    url: '/process/packing/' + workPackingId,
    method: 'delete'
  })
}

// 导出装箱管理
export function exportPacking(query) {
  return request({
    url: '/process/packing/export',
    method: 'get',
    params: query
  })
}
