import request from '@/utils/request'

// 查询调配管理列表
export function listStromamix(query) {
  return request({
    url: '/process/stromamix/list',
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
// 查询调配管理详细
export function getStromamix(workStromamixId) {
  return request({
    url: '/process/stromamix/' + workStromamixId,
    method: 'get'
  })
}

// 新增调配管理
export function addStromamix(data) {
  return request({
    url: '/process/stromamix',
    method: 'post',
    data: data
  })
}

// 修改调配管理
export function updateStromamix(data) {
  return request({
    url: '/process/stromamix',
    method: 'put',
    data: data
  })
}

// 删除调配管理
export function delStromamix(workStromamixId) {
  return request({
    url: '/process/stromamix/' + workStromamixId,
    method: 'delete'
  })
}

// 导出调配管理
export function exportStromamix(query) {
  return request({
    url: '/process/stromamix/export',
    method: 'get',
    params: query
  })
}
