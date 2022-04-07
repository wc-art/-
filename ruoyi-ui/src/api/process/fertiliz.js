import request from '@/utils/request'

// 查询基质调配列表
export function listFertiliz(query) {
  return request({
    url: '/process/fertiliz/list',
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
// 查询基质调配详细
export function getFertiliz(workFertilizeId) {
  return request({
    url: '/process/fertiliz/' + workFertilizeId,
    method: 'get'
  })
}

// 新增基质调配
export function addFertiliz(data) {
  return request({
    url: '/process/fertiliz',
    method: 'post',
    data: data
  })
}

// 修改基质调配
export function updateFertiliz(data) {
  return request({
    url: '/process/fertiliz',
    method: 'put',
    data: data
  })
}

// 删除基质调配
export function delFertiliz(workFertilizeId) {
  return request({
    url: '/process/fertiliz/' + workFertilizeId,
    method: 'delete'
  })
}

// 导出基质调配
export function exportFertiliz(query) {
  return request({
    url: '/process/fertiliz/export',
    method: 'get',
    params: query
  })
}
