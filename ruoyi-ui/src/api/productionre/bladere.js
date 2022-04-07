import request from '@/utils/request'

// 查询刀片退回列表
export function listBladere(query) {
  return request({
    url: '/production/bladere/list',
    method: 'get',
    params: query
  })
}

// 查询刀片退回详细
export function getBladere(bladeReturnId) {
  return request({
    url: '/production/bladere/' + bladeReturnId,
    method: 'get'
  })
}
// 获取类型
export function getType() {
  return request({
    url: '/production/bladere/type',
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/bladere/username',
    method: 'get',
  })
}

// 获取品牌下拉框
export function getBrand(bladeTypeId) {
  return request({
    url: '/production/bladere/brand/'+ bladeTypeId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(bladeTypeId) {
  return request({
    url: '/production/bladere/origincompany/'+ bladeTypeId,
    method: 'get',
  })
}
// 新增刀片退回
export function addBladere(data) {
  return request({
    url: '/production/bladere',
    method: 'post',
    data: data
  })
}

// 修改刀片退回
export function updateBladere(data) {
  return request({
    url: '/production/bladere',
    method: 'put',
    data: data
  })
}

// 删除刀片退回
export function delBladere(bladeReturnId) {
  return request({
    url: '/production/bladere/' + bladeReturnId,
    method: 'delete'
  })
}

// 导出刀片退回
export function exportBladere(query) {
  return request({
    url: '/production/bladere/export',
    method: 'get',
    params: query
  })
}
