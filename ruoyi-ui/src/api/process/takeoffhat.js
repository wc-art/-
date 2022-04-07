import request from '@/utils/request'

// 查询脱帽管理列表
export function listTakeoffhat(query) {
  return request({
    url: '/process/takeoffhat/list',
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
// 查询脱帽管理详细
export function getTakeoffhat(workTakeoffhatId) {
  return request({
    url: '/process/takeoffhat/' + workTakeoffhatId,
    method: 'get'
  })
}

// 新增脱帽管理
export function addTakeoffhat(data) {
  return request({
    url: '/process/takeoffhat',
    method: 'post',
    data: data
  })
}

// 修改脱帽管理
export function updateTakeoffhat(data) {
  return request({
    url: '/process/takeoffhat',
    method: 'put',
    data: data
  })
}

// 删除脱帽管理
export function delTakeoffhat(workTakeoffhatId) {
  return request({
    url: '/process/takeoffhat/' + workTakeoffhatId,
    method: 'delete'
  })
}

// 导出脱帽管理
export function exportTakeoffhat(query) {
  return request({
    url: '/process/takeoffhat/export',
    method: 'get',
    params: query
  })
}
