import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/seedap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/seedap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/seedap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addSeedcon(data) {
  return request({
    url: '/consume/seedcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/seedcon/username',
    method: 'get',
  })
}

// 查询种子领用列表
export function listSeedap(query) {
  return request({
    url: '/consume/seedap/list',
    method: 'get',
    params: query
  })
}

// 查询种子领用详细
export function getSeedap(applyId) {
  return request({
    url: '/consume/seedap/' + applyId,
    method: 'get'
  })
}

// 新增种子领用
export function addSeedap(data) {
  return request({
    url: '/consume/seedap',
    method: 'post',
    data: data
  })
}

// 修改种子领用
export function updateSeedap(data) {
  return request({
    url: '/consume/seedap',
    method: 'put',
    data: data
  })
}

// 删除种子领用
export function delSeedap(applyId) {
  return request({
    url: '/consume/seedap/' + applyId,
    method: 'delete'
  })
}

// 导出种子领用
export function exportSeedap(query) {
  return request({
    url: '/consume/seedap/export',
    method: 'get',
    params: query
  })
}
