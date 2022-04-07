import request from '@/utils/request'

// 查询嫁接夹类型列表
export function listGraftingclipType(query) {
  return request({
    url: '/production/graftingclipType/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹购买信息列表
export function listGraftingclipPurchase(query) {
  return request({
    url: '/production/graftingclipPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹购买信息详细
export function getGraftingclipPurchase(graftingclipPurchaseId) {
  return request({
    url: '/production/graftingclipPurchase/' + graftingclipPurchaseId,
    method: 'get'
  })
}

// 新增嫁接夹购买信息
export function addGraftingclipPurchase(data) {
  return request({
    url: '/production/graftingclipPurchase',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹购买信息
export function updateGraftingclipPurchase(data) {
  return request({
    url: '/production/graftingclipPurchase',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹购买信息
export function delGraftingclipPurchase(graftingclipPurchaseId) {
  return request({
    url: '/production/graftingclipPurchase/' + graftingclipPurchaseId,
    method: 'delete'
  })
}

// 导出嫁接夹购买信息
export function exportGraftingclipPurchase(query) {
  return request({
    url: '/production/graftingclipPurchase/export',
    method: 'get',
    params: query
  })
}
