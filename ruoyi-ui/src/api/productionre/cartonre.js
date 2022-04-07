import request from '@/utils/request'

// 查询纸箱退回列表
export function listCartonre(query) {
  return request({
    url: '/production/cartonre/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱退回详细
export function getCartonre(cartonReturnId) {
  return request({
    url: '/production/cartonre/' + cartonReturnId,
    method: 'get'
  })
}
// 获取嫁接签类型
export function getType() {
  return request({
    url: '/production/cartonre/type',
    method: 'get',
  })
}
// 获取规格
export function getSpecification(cartonTypeId) {
  return request({
    url: '/production/cartonre/specification/'+ cartonTypeId,
    method: 'get',
  })
}
// 获取公司下拉框
export function getOriginCompany(cartonTypeId) {
  return request({
    url: '/production/cartonre/origincompany/'+ cartonTypeId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/cartonre/username',
    method: 'get',
  })
}
// 新增纸箱退回
export function addCartonre(data) {
  return request({
    url: '/production/cartonre',
    method: 'post',
    data: data
  })
}

// 修改纸箱退回
export function updateCartonre(data) {
  return request({
    url: '/production/cartonre',
    method: 'put',
    data: data
  })
}

// 删除纸箱退回
export function delCartonre(cartonReturnId) {
  return request({
    url: '/production/cartonre/' + cartonReturnId,
    method: 'delete'
  })
}

// 导出纸箱退回
export function exportCartonre(query) {
  return request({
    url: '/production/cartonre/export',
    method: 'get',
    params: query
  })
}
