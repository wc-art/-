import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/regulatortemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/regulatortemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/regulatortemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addRegulatorcon(data) {
  return request({
    url: '/consume/regulatortemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/regulatortemcon/username',
    method: 'get',
  })
}

// 查询调节剂临时领用列表
export function listRegulatortemap(query) {
  return request({
    url: '/consume/regulatortemap/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂临时领用详细
export function getRegulatortemap(regulatorApplyTemporaryId) {
  return request({
    url: '/consume/regulatortemap/' + regulatorApplyTemporaryId,
    method: 'get'
  })
}

// 新增调节剂临时领用
export function addRegulatortemap(data) {
  return request({
    url: '/consume/regulatortemap',
    method: 'post',
    data: data
  })
}

// 修改调节剂临时领用
export function updateRegulatortemap(data) {
  return request({
    url: '/consume/regulatortemap',
    method: 'put',
    data: data
  })
}

// 删除调节剂临时领用
export function delRegulatortemap(regulatorApplyTemporaryId) {
  return request({
    url: '/consume/regulatortemap/' + regulatorApplyTemporaryId,
    method: 'delete'
  })
}

// 导出调节剂临时领用
export function exportRegulatortemap(query) {
  return request({
    url: '/consume/regulatortemap/export',
    method: 'get',
    params: query
  })
}
