import request from '@/utils/request'

// 查询基质退回信息列表
export function listStroma(query) {
  return request({
    url: '/production/stromare/list',
    method: 'get',
    params: query
  })
}
// 获取基质编号和基质
export function getStromaKind() {
  return request({
    url: '/production/stromare/stromakind',
    method: 'get',
  })
}
// 获取蔬菜类型
export function getStromaType() {
  return request({
    url: '/production/stromare/stromatype',
    method: 'get',
  })
}
// 获取品牌下拉框
export function getBrand(stromaTypeId) {
  return request({
    url: '/production/stromare/brand/'+ stromaTypeId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(stromaTypeId) {
  return request({
    url: '/production/stromare/origincompany/'+ stromaTypeId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/stromare/username',
    method: 'get',
  })
}
// 查询基质退回信息详细
export function getStroma(stromaReturnId) {
  return request({
    url: '/production/stromare/' + stromaReturnId,
    method: 'get'
  })
}

// 新增基质退回信息
export function addStroma(data) {
  return request({
    url: '/production/stromare',
    method: 'post',
    data: data
  })
}

// 修改基质退回信息
export function updateStroma(data) {
  return request({
    url: '/production/stromare',
    method: 'put',
    data: data
  })
}

// 删除基质退回信息
export function delStroma(stromaReturnId) {
  return request({
    url: '/production/stromare/' + stromaReturnId,
    method: 'delete'
  })
}

// 导出基质退回信息
export function exportStroma(query) {
  return request({
    url: '/production/stromare/export',
    method: 'get',
    params: query
  })
}
