import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/graftinglabelap/back/'+applyId,
    method: 'put',
  })
}

// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/graftinglabelap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/graftinglabelap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGraftinglabelcon(data) {
  return request({
    url: '/consume/graftinglabelcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/graftinglabelcon/username',
    method: 'get',
  })
}

// 查询嫁接签领用列表
export function listGraftinglabelap(query) {
  return request({
    url: '/consume/graftinglabelap/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签领用详细
export function getGraftinglabelap(graftinglabelApplyId) {
  return request({
    url: '/consume/graftinglabelap/' + graftinglabelApplyId,
    method: 'get'
  })
}

// 新增嫁接签领用
export function addGraftinglabelap(data) {
  return request({
    url: '/consume/graftinglabelap',
    method: 'post',
    data: data
  })
}

// 修改嫁接签领用
export function updateGraftinglabelap(data) {
  return request({
    url: '/consume/graftinglabelap',
    method: 'put',
    data: data
  })
}

// 删除嫁接签领用
export function delGraftinglabelap(graftinglabelApplyId) {
  return request({
    url: '/consume/graftinglabelap/' + graftinglabelApplyId,
    method: 'delete'
  })
}

// 导出嫁接签领用
export function exportGraftinglabelap(query) {
  return request({
    url: '/consume/graftinglabelap/export',
    method: 'get',
    params: query
  })
}
