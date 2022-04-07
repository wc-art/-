import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/bladetemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/bladetemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/bladetemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addBladecon(data) {
  return request({
    url: '/consume/bladetemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/bladetemcon/username',
    method: 'get',
  })
}

// 查询刀片临时领用列表
export function listBladetemap(query) {
  return request({
    url: '/consume/bladetemap/list',
    method: 'get',
    params: query
  })
}

// 查询刀片临时领用详细
export function getBladetemap(bladeApplyTemporaryId) {
  return request({
    url: '/consume/bladetemap/' + bladeApplyTemporaryId,
    method: 'get'
  })
}

// 新增刀片临时领用
export function addBladetemap(data) {
  return request({
    url: '/consume/bladetemap',
    method: 'post',
    data: data
  })
}

// 修改刀片临时领用
export function updateBladetemap(data) {
  return request({
    url: '/consume/bladetemap',
    method: 'put',
    data: data
  })
}

// 删除刀片临时领用
export function delBladetemap(bladeApplyTemporaryId) {
  return request({
    url: '/consume/bladetemap/' + bladeApplyTemporaryId,
    method: 'delete'
  })
}

// 导出刀片临时领用
export function exportBladetemap(query) {
  return request({
    url: '/consume/bladetemap/export',
    method: 'get',
    params: query
  })
}
