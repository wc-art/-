import request from '@/utils/request'

// 查询施肥管理列表
export function listFertilize(query) {
  return request({
    url: '/process/fertilize/list',
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
// 查询施肥管理详细
export function getFertilize(workFertilizeId) {
  return request({
    url: '/process/fertilize/' + workFertilizeId,
    method: 'get'
  })
}

// 新增施肥管理
export function addFertilize(data) {
  return request({
    url: '/process/fertilize',
    method: 'post',
    data: data
  })
}

// 修改施肥管理
export function updateFertilize(data) {
  return request({
    url: '/process/fertilize',
    method: 'put',
    data: data
  })
}

// 删除施肥管理
export function delFertilize(workFertilizeId) {
  return request({
    url: '/process/fertilize/' + workFertilizeId,
    method: 'delete'
  })
}

// 导出施肥管理
export function exportFertilize(query) {
  return request({
    url: '/process/fertilize/export',
    method: 'get',
    params: query
  })
}
