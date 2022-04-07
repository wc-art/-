import request from '@/utils/request'

// 查询穴盘类型列表
export function listPlugType(query) {
  return request({
    url: '/production/plugType/list',
    method: 'get',
    params: query
  })
}
// 导出所有穴盘类型
export function plugsType() {
  return request({
    url:'/production/plugType/list',
    method:'get'
  })
}
// 查询穴盘类型详细
export function getPlugType(plugTypeId) {
  return request({
    url: '/production/plugType/' + plugTypeId,
    method: 'get'
  })
}

// 新增穴盘类型
export function addPlugType(data) {
  return request({
    url: '/production/plugType',
    method: 'post',
    data: data
  })
}

// 修改穴盘类型
export function updatePlugType(data) {
  return request({
    url: '/production/plugType',
    method: 'put',
    data: data
  })
}

// 删除穴盘类型
export function delPlugType(plugTypeId) {
  return request({
    url: '/production/plugType/' + plugTypeId,
    method: 'delete'
  })
}

// 导出穴盘类型
export function exportPlugType(query) {
  return request({
    url: '/production/plugType/export',
    method: 'get',
    params: query
  })
}
