import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/pesticidetemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/pesticidetemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/pesticidetemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addPesticidecon(data) {
  return request({
    url: '/consume/pesticidetemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/pesticidetemcon/username',
    method: 'get',
  })
}

// 查询农药临时领用列表
export function listPesticidetemap(query) {
  return request({
    url: '/consume/pesticidetemap/list',
    method: 'get',
    params: query
  })
}

// 查询农药临时领用详细
export function getPesticidetemap(pesticideApplyTemporaryId) {
  return request({
    url: '/consume/pesticidetemap/' + pesticideApplyTemporaryId,
    method: 'get'
  })
}

// 新增农药临时领用
export function addPesticidetemap(data) {
  return request({
    url: '/consume/pesticidetemap',
    method: 'post',
    data: data
  })
}

// 修改农药临时领用
export function updatePesticidetemap(data) {
  return request({
    url: '/consume/pesticidetemap',
    method: 'put',
    data: data
  })
}

// 删除农药临时领用
export function delPesticidetemap(pesticideApplyTemporaryId) {
  return request({
    url: '/consume/pesticidetemap/' + pesticideApplyTemporaryId,
    method: 'delete'
  })
}

// 导出农药临时领用
export function exportPesticidetemap(query) {
  return request({
    url: '/consume/pesticidetemap/export',
    method: 'get',
    params: query
  })
}
