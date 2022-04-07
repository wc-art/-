import request from '@/utils/request'

// 查询棚膜类型(长*宽)列表
export function listGreenhousefilmType(query) {
  return request({
    url: '/production/greenhousefilmType/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜购买信息列表
export function listGreenhousefilmPurchase(query) {
  return request({
    url: '/production/greenhousefilmPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜购买信息详细
export function getGreenhousefilmPurchase(greenhousefilmPurchaseId) {
  return request({
    url: '/production/greenhousefilmPurchase/' + greenhousefilmPurchaseId,
    method: 'get'
  })
}

// 新增棚膜购买信息
export function addGreenhousefilmPurchase(data) {
  return request({
    url: '/production/greenhousefilmPurchase',
    method: 'post',
    data: data
  })
}

// 修改棚膜购买信息
export function updateGreenhousefilmPurchase(data) {
  return request({
    url: '/production/greenhousefilmPurchase',
    method: 'put',
    data: data
  })
}

// 删除棚膜购买信息
export function delGreenhousefilmPurchase(greenhousefilmPurchaseId) {
  return request({
    url: '/production/greenhousefilmPurchase/' + greenhousefilmPurchaseId,
    method: 'delete'
  })
}

// 导出棚膜购买信息
export function exportGreenhousefilmPurchase(query) {
  return request({
    url: '/production/greenhousefilmPurchase/export',
    method: 'get',
    params: query
  })
}
