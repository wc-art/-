import request from '@/utils/request'

// 查询除萌蘖管理列表
export function listRemosproutiller(query) {
  return request({
    url: '/process/remosproutiller/list',
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
// 查询除萌蘖管理详细
export function getRemosproutiller(workRemosproutillerId) {
  return request({
    url: '/process/remosproutiller/' + workRemosproutillerId,
    method: 'get'
  })
}

// 新增除萌蘖管理
export function addRemosproutiller(data) {
  return request({
    url: '/process/remosproutiller',
    method: 'post',
    data: data
  })
}

// 修改除萌蘖管理
export function updateRemosproutiller(data) {
  return request({
    url: '/process/remosproutiller',
    method: 'put',
    data: data
  })
}

// 删除除萌蘖管理
export function delRemosproutiller(workRemosproutillerId) {
  return request({
    url: '/process/remosproutiller/' + workRemosproutillerId,
    method: 'delete'
  })
}

// 导出除萌蘖管理
export function exportRemosproutiller(query) {
  return request({
    url: '/process/remosproutiller/export',
    method: 'get',
    params: query
  })
}
