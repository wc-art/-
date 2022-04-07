import request from '@/utils/request'

// 查询纸箱购买详细列表
export function listCartonApply(query) {
  return request({
    url: '/system/cartonApply/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱购买详细详细
export function getCartonApply(cartonPurchaseApplyId) {
  return request({
    url: '/system/cartonApply/' + cartonPurchaseApplyId,
    method: 'get'
  })
}

// 新增纸箱购买详细
export function addCartonApply(data) {
  return request({
    url: '/system/cartonApply',
    method: 'post',
    data: data
  })
}

// 修改纸箱购买详细
export function updateCartonApply(data) {
  return request({
    url: '/system/cartonApply',
    method: 'put',
    data: data
  })
}

// 删除纸箱购买详细
export function delCartonApply(cartonPurchaseApplyId) {
  return request({
    url: '/system/cartonApply/' + cartonPurchaseApplyId,
    method: 'delete'
  })
}

// 导出纸箱购买详细
export function exportCartonApply(query) {
  return request({
    url: '/system/cartonApply/export',
    method: 'get',
    params: query
  })
}