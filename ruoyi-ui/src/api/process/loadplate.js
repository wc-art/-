import request from '@/utils/request'

// 查询装盘管理列表
export function listLoadplate(query) {
  return request({
    url: '/process/loadplate/list',
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
// 查询装盘管理详细
export function getLoadplate(workLoadplateId) {
  return request({
    url: '/process/loadplate/' + workLoadplateId,
    method: 'get'
  })
}

// 新增装盘管理
export function addLoadplate(data) {
  return request({
    url: '/process/loadplate',
    method: 'post',
    data: data
  })
}

// 修改装盘管理
export function updateLoadplate(data) {
  return request({
    url: '/process/loadplate',
    method: 'put',
    data: data
  })
}

// 删除装盘管理
export function delLoadplate(workLoadplateId) {
  return request({
    url: '/process/loadplate/' + workLoadplateId,
    method: 'delete'
  })
}

// 导出装盘管理
export function exportLoadplate(query) {
  return request({
    url: '/process/loadplate/export',
    method: 'get',
    params: query
  })
}
