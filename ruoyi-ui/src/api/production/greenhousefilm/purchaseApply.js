import request from '@/utils/request'

// 查询棚膜购买申请列表
export function listGreenhousefilmpply(query) {
  return request({
    url: '/system/greenhousefilmpply/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜购买申请详细
export function getGreenhousefilmpply(greenhousefilmPurchaseApplyId) {
  return request({
    url: '/system/greenhousefilmpply/' + greenhousefilmPurchaseApplyId,
    method: 'get'
  })
}

// 新增棚膜购买申请
export function addGreenhousefilmpply(data) {
  return request({
    url: '/system/greenhousefilmpply',
    method: 'post',
    data: data
  })
}

// 修改棚膜购买申请
export function updateGreenhousefilmpply(data) {
  return request({
    url: '/system/greenhousefilmpply',
    method: 'put',
    data: data
  })
}

// 删除棚膜购买申请
export function delGreenhousefilmpply(greenhousefilmPurchaseApplyId) {
  return request({
    url: '/system/greenhousefilmpply/' + greenhousefilmPurchaseApplyId,
    method: 'delete'
  })
}

// 导出棚膜购买申请
export function exportGreenhousefilmpply(query) {
  return request({
    url: '/system/greenhousefilmpply/export',
    method: 'get',
    params: query
  })
}