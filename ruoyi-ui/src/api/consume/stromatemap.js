import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/stromatemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/stromatemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/stromatemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addStromacon(data) {
  return request({
    url: '/consume/stromatemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/stromatemcon/username',
    method: 'get',
  })
}

// 查询基质临时领用列表
export function listStromatemap(query) {
  return request({
    url: '/consume/stromatemap/list',
    method: 'get',
    params: query
  })
}

// 查询基质临时领用详细
export function getStromatemap(stromaApplyTemporayId) {
  return request({
    url: '/consume/stromatemap/' + stromaApplyTemporayId,
    method: 'get'
  })
}

// 新增基质临时领用
export function addStromatemap(data) {
  return request({
    url: '/consume/stromatemap',
    method: 'post',
    data: data
  })
}

// 修改基质临时领用
export function updateStromatemap(data) {
  return request({
    url: '/consume/stromatemap',
    method: 'put',
    data: data
  })
}

// 删除基质临时领用
export function delStromatemap(stromaApplyTemporayId) {
  return request({
    url: '/consume/stromatemap/' + stromaApplyTemporayId,
    method: 'delete'
  })
}

// 导出基质临时领用
export function exportStromatemap(query) {
  return request({
    url: '/consume/stromatemap/export',
    method: 'get',
    params: query
  })
}
