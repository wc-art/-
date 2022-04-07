import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/seedtemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/seedtemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/seedtemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addSeedcon(data) {
  return request({
    url: '/consume/seedtemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/seedtemcon/username',
    method: 'get',
  })
}
// 查询种子临时领用列表
export function listSeedtemap(query) {
  return request({
    url: '/consume/seedtemap/list',
    method: 'get',
    params: query
  })
}

// 查询种子临时领用详细
export function getSeedtemap(seedApplyTemporaryId) {
  return request({
    url: '/consume/seedtemap/' + seedApplyTemporaryId,
    method: 'get'
  })
}

// 新增种子临时领用
export function addSeedtemap(data) {
  return request({
    url: '/consume/seedtemap',
    method: 'post',
    data: data
  })
}

// 修改种子临时领用
export function updateSeedtemap(data) {
  return request({
    url: '/consume/seedtemap',
    method: 'put',
    data: data
  })
}

// 删除种子临时领用
export function delSeedtemap(seedApplyTemporaryId) {
  return request({
    url: '/consume/seedtemap/' + seedApplyTemporaryId,
    method: 'delete'
  })
}

// 导出种子临时领用
export function exportSeedtemap(query) {
  return request({
    url: '/consume/seedtemap/export',
    method: 'get',
    params: query
  })
}
