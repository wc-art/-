import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/graftingclipap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/graftingclipap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/graftingclipap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGraftingclipcon(data) {
  return request({
    url: '/consume/graftingclipcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/graftingclipcon/username',
    method: 'get',
  })
}

// 查询嫁接夹领用列表
export function listGraftingclipap(query) {
  return request({
    url: '/consume/graftingclipap/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹领用详细
export function getGraftingclipap(graftingclipApplyId) {
  return request({
    url: '/consume/graftingclipap/' + graftingclipApplyId,
    method: 'get'
  })
}

// 新增嫁接夹领用
export function addGraftingclipap(data) {
  return request({
    url: '/consume/graftingclipap',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹领用
export function updateGraftingclipap(data) {
  return request({
    url: '/consume/graftingclipap',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹领用
export function delGraftingclipap(graftingclipApplyId) {
  return request({
    url: '/consume/graftingclipap/' + graftingclipApplyId,
    method: 'delete'
  })
}

// 导出嫁接夹领用
export function exportGraftingclipap(query) {
  return request({
    url: '/consume/graftingclipap/export',
    method: 'get',
    params: query
  })
}
