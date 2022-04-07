import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/plugtemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/plugtemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/plugtemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addPlugcon(data) {
  return request({
    url: '/consume/plugtemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/plugtemcon/username',
    method: 'get',
  })
}

// 查询穴盘临时领用列表
export function listPlugtemap(query) {
  return request({
    url: '/consume/plugtemap/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘临时领用详细
export function getPlugtemap(plugApplyTemporaryId) {
  return request({
    url: '/consume/plugtemap/' + plugApplyTemporaryId,
    method: 'get'
  })
}

// 新增穴盘临时领用
export function addPlugtemap(data) {
  return request({
    url: '/consume/plugtemap',
    method: 'post',
    data: data
  })
}

// 修改穴盘临时领用
export function updatePlugtemap(data) {
  return request({
    url: '/consume/plugtemap',
    method: 'put',
    data: data
  })
}

// 删除穴盘临时领用
export function delPlugtemap(plugApplyTemporaryId) {
  return request({
    url: '/consume/plugtemap/' + plugApplyTemporaryId,
    method: 'delete'
  })
}

// 导出穴盘临时领用
export function exportPlugtemap(query) {
  return request({
    url: '/consume/plugtemap/export',
    method: 'get',
    params: query
  })
}
