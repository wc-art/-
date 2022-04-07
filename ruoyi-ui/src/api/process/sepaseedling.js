import request from '@/utils/request'

// 查询分苗管理列表
export function listSepaseedling(query) {
  return request({
    url: '/process/sepaseedling/list',
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
// 查询分苗管理详细
export function getSepaseedling(workSepaseedlingId) {
  return request({
    url: '/process/sepaseedling/' + workSepaseedlingId,
    method: 'get'
  })
}

// 新增分苗管理
export function addSepaseedling(data) {
  return request({
    url: '/process/sepaseedling',
    method: 'post',
    data: data
  })
}

// 修改分苗管理
export function updateSepaseedling(data) {
  return request({
    url: '/process/sepaseedling',
    method: 'put',
    data: data
  })
}

// 删除分苗管理
export function delSepaseedling(workSepaseedlingId) {
  return request({
    url: '/process/sepaseedling/' + workSepaseedlingId,
    method: 'delete'
  })
}

// 导出分苗管理
export function exportSepaseedling(query) {
  return request({
    url: '/process/sepaseedling/export',
    method: 'get',
    params: query
  })
}
