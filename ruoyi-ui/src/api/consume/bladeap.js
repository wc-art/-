import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/bladeap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/bladeap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/bladeap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addBladecon(data) {
  return request({
    url: '/consume/bladecon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/bladecon/username',
    method: 'get',
  })
}

// 查询刀片领用列表
export function listBladeap(query) {
  return request({
    url: '/consume/bladeap/list',
    method: 'get',
    params: query
  })
}

// 查询刀片领用详细
export function getBladeap(bladeApplyId) {
  return request({
    url: '/consume/bladeap/' + bladeApplyId,
    method: 'get'
  })
}

// 新增刀片领用
export function addBladeap(data) {
  return request({
    url: '/consume/bladeap',
    method: 'post',
    data: data
  })
}

// 修改刀片领用
export function updateBladeap(data) {
  return request({
    url: '/consume/bladeap',
    method: 'put',
    data: data
  })
}

// 删除刀片领用
export function delBladeap(bladeApplyId) {
  return request({
    url: '/consume/bladeap/' + bladeApplyId,
    method: 'delete'
  })
}

// 导出刀片领用
export function exportBladeap(query) {
  return request({
    url: '/consume/bladeap/export',
    method: 'get',
    params: query
  })
}
