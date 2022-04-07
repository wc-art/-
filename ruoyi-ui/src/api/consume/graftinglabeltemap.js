import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/graftinglabeltemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/graftinglabeltemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/graftinglabeltemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGraftinglabelcon(data) {
  return request({
    url: '/consume/graftinglabeltemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/graftinglabeltemcon/username',
    method: 'get',
  })
}

// 查询嫁接签临时领用列表
export function listGraftinglabeltemap(query) {
  return request({
    url: '/consume/graftinglabeltemap/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签临时领用详细
export function getGraftinglabeltemap(graftinglabelApplyTemporaryId) {
  return request({
    url: '/consume/graftinglabeltemap/' + graftinglabelApplyTemporaryId,
    method: 'get'
  })
}

// 新增嫁接签临时领用
export function addGraftinglabeltemap(data) {
  return request({
    url: '/consume/graftinglabeltemap',
    method: 'post',
    data: data
  })
}

// 修改嫁接签临时领用
export function updateGraftinglabeltemap(data) {
  return request({
    url: '/consume/graftinglabeltemap',
    method: 'put',
    data: data
  })
}

// 删除嫁接签临时领用
export function delGraftinglabeltemap(graftinglabelApplyTemporaryId) {
  return request({
    url: '/consume/graftinglabeltemap/' + graftinglabelApplyTemporaryId,
    method: 'delete'
  })
}

// 导出嫁接签临时领用
export function exportGraftinglabeltemap(query) {
  return request({
    url: '/consume/graftinglabeltemap/export',
    method: 'get',
    params: query
  })
}
