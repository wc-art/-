import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/stromaap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/stromaap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/stromaap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addStromacon(data) {
  return request({
    url: '/consume/stromacon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/stromacon/username',
    method: 'get',
  })
}

// 查询基质领用列表
export function listStromaap(query) {
  return request({
    url: '/consume/stromaap/list',
    method: 'get',
    params: query
  })
}

// 查询基质领用详细
export function getStromaap(stromaApplyId) {
  return request({
    url: '/consume/stromaap/' + stromaApplyId,
    method: 'get'
  })
}

// 新增基质领用
export function addStromaap(data) {
  return request({
    url: '/consume/stromaap',
    method: 'post',
    data: data
  })
}

// 修改基质领用
export function updateStromaap(data) {
  return request({
    url: '/consume/stromaap',
    method: 'put',
    data: data
  })
}

// 删除基质领用
export function delStromaap(stromaApplyId) {
  return request({
    url: '/consume/stromaap/' + stromaApplyId,
    method: 'delete'
  })
}

// 导出基质领用
export function exportStromaap(query) {
  return request({
    url: '/consume/stromaap/export',
    method: 'get',
    params: query
  })
}
