import request from '@/utils/request'


// 查询穴盘类型列表
export function listPlugType(query) {
  return request({
    url: '/production/plugType/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘类型详细
export function getPlugType(plugTypeId) {
  return request({
    url: '/system/plugType/' + plugTypeId,
    method: 'get'
  })
}

// 查询穴盘量列表
export function listPlugAmount(query) {
  return request({
    url: '/production/plugAmount/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘量详细
export function getPlugAmount(plugAmountId) {
  return request({
    url: '/production/plugAmount/' + plugAmountId,
    method: 'get'
  })
}

// 新增穴盘量
export function addPlugAmount(data) {
  return request({
    url: '/production/plugAmount',
    method: 'post',
    data: data
  })
}

// 修改穴盘量
export function updatePlugAmount(data) {
  return request({
    url: '/production/plugAmount',
    method: 'put',
    data: data
  })
}

// 删除穴盘量
export function delPlugAmount(plugAmountId) {
  return request({
    url: '/production/plugAmount/' + plugAmountId,
    method: 'delete'
  })
}

// 导出穴盘量
export function exportPlugAmount(query) {
  return request({
    url: '/production/plugAmount/export',
    method: 'get',
    params: query
  })
}
