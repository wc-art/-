import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/cartonap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/cartonap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/cartonap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addCartoncon(data) {
  return request({
    url: '/consume/cartoncon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/cartoncon/username',
    method: 'get',
  })
}

// 查询纸箱领用列表
export function listCartonap(query) {
  return request({
    url: '/consume/cartonap/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱领用详细
export function getCartonap(cartonApplyId) {
  return request({
    url: '/consume/cartonap/' + cartonApplyId,
    method: 'get'
  })
}

// 新增纸箱领用
export function addCartonap(data) {
  return request({
    url: '/consume/cartonap',
    method: 'post',
    data: data
  })
}

// 修改纸箱领用
export function updateCartonap(data) {
  return request({
    url: '/consume/cartonap',
    method: 'put',
    data: data
  })
}

// 删除纸箱领用
export function delCartonap(cartonApplyId) {
  return request({
    url: '/consume/cartonap/' + cartonApplyId,
    method: 'delete'
  })
}

// 导出纸箱领用
export function exportCartonap(query) {
  return request({
    url: '/consume/cartonap/export',
    method: 'get',
    params: query
  })
}
