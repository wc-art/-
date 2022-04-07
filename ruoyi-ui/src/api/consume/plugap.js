import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/plugap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/plugap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/plugap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addPlugcon(data) {
  return request({
    url: '/consume/plugcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/plugcon/username',
    method: 'get',
  })
}

// 查询穴盘领用列表
export function listPlugap(query) {
  return request({
    url: '/consume/plugap/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘领用详细
export function getPlugap(plugApplyId) {
  return request({
    url: '/consume/plugap/' + plugApplyId,
    method: 'get'
  })
}

// 新增穴盘领用
export function addPlugap(data) {
  return request({
    url: '/consume/plugap',
    method: 'post',
    data: data
  })
}

// 修改穴盘领用
export function updatePlugap(data) {
  return request({
    url: '/consume/plugap',
    method: 'put',
    data: data
  })
}

// 删除穴盘领用
export function delPlugap(plugApplyId) {
  return request({
    url: '/consume/plugap/' + plugApplyId,
    method: 'delete'
  })
}

// 导出穴盘领用
export function exportPlugap(query) {
  return request({
    url: '/consume/plugap/export',
    method: 'get',
    params: query
  })
}
