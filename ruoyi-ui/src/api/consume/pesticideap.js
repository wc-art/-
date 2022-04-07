import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/pesticideap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/pesticideap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/pesticideap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addPesticidecon(data) {
  return request({
    url: '/consume/pesticidecon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/pesticidecon/username',
    method: 'get',
  })
}

// 查询农药领用列表
export function listPesticideap(query) {
  return request({
    url: '/consume/pesticideap/list',
    method: 'get',
    params: query
  })
}

// 查询农药领用详细
export function getPesticideap(pesticideApplyId) {
  return request({
    url: '/consume/pesticideap/' + pesticideApplyId,
    method: 'get'
  })
}

// 新增农药领用
export function addPesticideap(data) {
  return request({
    url: '/consume/pesticideap',
    method: 'post',
    data: data
  })
}

// 修改农药领用
export function updatePesticideap(data) {
  return request({
    url: '/consume/pesticideap',
    method: 'put',
    data: data
  })
}

// 删除农药领用
export function delPesticideap(pesticideApplyId) {
  return request({
    url: '/consume/pesticideap/' + pesticideApplyId,
    method: 'delete'
  })
}

// 导出农药领用
export function exportPesticideap(query) {
  return request({
    url: '/consume/pesticideap/export',
    method: 'get',
    params: query
  })
}
