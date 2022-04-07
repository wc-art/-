import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/regulatorap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/regulatorap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/regulatorap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addRegulatorcon(data) {
  return request({
    url: '/consume/regulatorcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/regulatorcon/username',
    method: 'get',
  })
}

// 查询调节剂领用列表
export function listRegulatorap(query) {
  return request({
    url: '/consume/regulatorap/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂领用详细
export function getRegulatorap(regulatorApplyId) {
  return request({
    url: '/consume/regulatorap/' + regulatorApplyId,
    method: 'get'
  })
}

// 新增调节剂领用
export function addRegulatorap(data) {
  return request({
    url: '/consume/regulatorap',
    method: 'post',
    data: data
  })
}

// 修改调节剂领用
export function updateRegulatorap(data) {
  return request({
    url: '/consume/regulatorap',
    method: 'put',
    data: data
  })
}

// 删除调节剂领用
export function delRegulatorap(regulatorApplyId) {
  return request({
    url: '/consume/regulatorap/' + regulatorApplyId,
    method: 'delete'
  })
}

// 导出调节剂领用
export function exportRegulatorap(query) {
  return request({
    url: '/consume/regulatorap/export',
    method: 'get',
    params: query
  })
}
