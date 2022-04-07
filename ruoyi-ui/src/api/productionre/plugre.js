import request from '@/utils/request'

// 查询穴盘退回列表
export function listPlugreturn(query) {
  return request({
    url: '/production/plugre/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘退回详细
export function getPlugreturn(plugReturnId) {
  return request({
    url: '/production/plugre/' + plugReturnId,
    method: 'get'
  })
}

// 新增穴盘退回
export function addPlugreturn(data) {
  return request({
    url: '/production/plugre',
    method: 'post',
    data: data
  })
}
// 获取穴盘类型
export function getPlugType() {
  return request({
    url: '/production/plugre/plugtype',
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/plugre/username',
    method: 'get',
  })
}

// 获取品牌下拉框
export function getBrand(plugTypeId) {
  return request({
    url: '/production/plugre/brand/'+ plugTypeId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(plugTypeId) {
  return request({
    url: '/production/plugre/origincompany/'+ plugTypeId,
    method: 'get',
  })
}
// 修改穴盘退回
export function updatePlugreturn(data) {
  return request({
    url: '/production/plugre',
    method: 'put',
    data: data
  })
}

// 删除穴盘退回
export function delPlugreturn(plugReturnId) {
  return request({
    url: '/production/plugre/' + plugReturnId,
    method: 'delete'
  })
}

// 导出穴盘退回
export function exportPlugreturn(query) {
  return request({
    url: '/production/plugre/export',
    method: 'get',
    params: query
  })
}
