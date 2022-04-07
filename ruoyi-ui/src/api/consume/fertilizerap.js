import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/fertilizerap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/fertilizerap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/fertilizerap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addFertilizercon(data) {
  return request({
    url: '/consume/fertilizercon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/fertilizercon/username',
    method: 'get',
  })
}

// 查询化肥领用列表
export function listFertilizerap(query) {
  return request({
    url: '/consume/fertilizerap/list',
    method: 'get',
    params: query
  })
}

// 查询化肥领用详细
export function getFertilizerap(fertilizerApplyId) {
  return request({
    url: '/consume/fertilizerap/' + fertilizerApplyId,
    method: 'get'
  })
}

// 新增化肥领用
export function addFertilizerap(data) {
  return request({
    url: '/consume/fertilizerap',
    method: 'post',
    data: data
  })
}

// 修改化肥领用
export function updateFertilizerap(data) {
  return request({
    url: '/consume/fertilizerap',
    method: 'put',
    data: data
  })
}

// 删除化肥领用
export function delFertilizerap(fertilizerApplyId) {
  return request({
    url: '/consume/fertilizerap/' + fertilizerApplyId,
    method: 'delete'
  })
}

// 导出化肥领用
export function exportFertilizerap(query) {
  return request({
    url: '/consume/fertilizerap/export',
    method: 'get',
    params: query
  })
}
