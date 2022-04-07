import request from '@/utils/request'

// 查询纸箱类型列表
export function listType(query) {
  return request({
    url: '/system/cartonType/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱量列表
export function listCartonAmount(query) {
  return request({
    url: '/system/cartonAmount/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱量详细
export function getCartonAmount(cartonAmountId) {
  return request({
    url: '/system/cartonAmount/' + cartonAmountId,
    method: 'get'
  })
}

// 新增纸箱量
export function addCartonAmount(data) {
  return request({
    url: '/system/cartonAmount',
    method: 'post',
    data: data
  })
}

// 修改纸箱量
export function updateCartonAmount(data) {
  return request({
    url: '/system/cartonAmount',
    method: 'put',
    data: data
  })
}

// 查询纸箱购买信息列表
export function listCartonPurchase(query) {
  return request({
    url: '/system/cartonPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱购买信息详细
export function getCartonPurchase(cartonPurchaseId) {
  return request({
    url: '/system/cartonPurchase/' + cartonPurchaseId,
    method: 'get'
  })
}

// 新增纸箱购买信息
export function addCartonPurchase(data) {
  return request({
    url: '/system/cartonPurchase',
    method: 'post',
    data: data
  })
}

// 修改纸箱购买信息
export function updateCartonPurchase(data) {
  return request({
    url: '/system/cartonPurchase',
    method: 'put',
    data: data
  })
}

// 删除纸箱购买信息
export function delCartonPurchase(cartonPurchaseId) {
  return request({
    url: '/system/cartonPurchase/' + cartonPurchaseId,
    method: 'delete'
  })
}

// 导出纸箱购买信息
export function exportCartonPurchase(query) {
  return request({
    url: '/system/cartonPurchase/export',
    method: 'get',
    params: query
  })
}
