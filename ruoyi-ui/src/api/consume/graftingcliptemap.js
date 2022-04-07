import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/graftingcliptemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/graftingcliptemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/graftingcliptemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGraftingclipcon(data) {
  return request({
    url: '/consume/graftingcliptemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/graftingcliptemcon/username',
    method: 'get',
  })
}

// 查询嫁接夹临时领用列表
export function listGraftingcliptemap(query) {
  return request({
    url: '/consume/graftingcliptemap/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹临时领用详细
export function getGraftingcliptemap(graftingclipApplyTemporaryId) {
  return request({
    url: '/consume/graftingcliptemap/' + graftingclipApplyTemporaryId,
    method: 'get'
  })
}

// 新增嫁接夹临时领用
export function addGraftingcliptemap(data) {
  return request({
    url: '/consume/graftingcliptemap',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹临时领用
export function updateGraftingcliptemap(data) {
  return request({
    url: '/consume/graftingcliptemap',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹临时领用
export function delGraftingcliptemap(graftingclipApplyTemporaryId) {
  return request({
    url: '/consume/graftingcliptemap/' + graftingclipApplyTemporaryId,
    method: 'delete'
  })
}

// 导出嫁接夹临时领用
export function exportGraftingcliptemap(query) {
  return request({
    url: '/consume/graftingcliptemap/export',
    method: 'get',
    params: query
  })
}
