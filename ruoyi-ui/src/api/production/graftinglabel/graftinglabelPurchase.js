import request from '@/utils/request'

// 查询嫁接签类型列表
export function listGraftinglabelType(query) {
  return request({
    url: '/production/graftinglabelType/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签购买信息列表
export function listGraftinglabelPurchase(query) {
  return request({
    url: '/production/graftinglabelPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签购买信息详细
export function getGraftinglabelPurchase(graftinglabelPurchaseId) {
  return request({
    url: '/production/graftinglabelPurchase/' + graftinglabelPurchaseId,
    method: 'get'
  })
}

// 新增嫁接签购买信息
export function addGraftinglabelPurchase(data) {
  return request({
    url: '/production/graftinglabelPurchase',
    method: 'post',
    data: data
  })
}

// 修改嫁接签购买信息
export function updateGraftinglabelPurchase(data) {
  return request({
    url: '/production/graftinglabelPurchase',
    method: 'put',
    data: data
  })
}

// 删除嫁接签购买信息
export function delGraftinglabelPurchase(graftinglabelPurchaseId) {
  return request({
    url: '/production/graftinglabelPurchase/' + graftinglabelPurchaseId,
    method: 'delete'
  })
}

// 导出嫁接签购买信息
export function exportGraftinglabelPurchase(query) {
  return request({
    url: '/production/graftinglabelPurchase/export',
    method: 'get',
    params: query
  })
}
