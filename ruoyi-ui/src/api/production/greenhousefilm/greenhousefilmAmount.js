import request from '@/utils/request'

// 查询棚膜类型(长*宽)列表
export function listGreenhousefilmType(query) {
  return request({
    url: '/production/greenhousefilmType/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜量列表
export function listGreenhousefilmAmount(query) {
  return request({
    url: '/production/greenhousefilmAmount/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜量详细
export function getGreenhousefilmAmount(greenhousefilmAmountId) {
  return request({
    url: '/production/greenhousefilmAmount/' + greenhousefilmAmountId,
    method: 'get'
  })
}

// 新增棚膜量
export function addGreenhousefilmAmount(data) {
  return request({
    url: '/production/greenhousefilmAmount',
    method: 'post',
    data: data
  })
}

// 修改棚膜量
export function updateGreenhousefilmAmount(data) {
  return request({
    url: '/production/greenhousefilmAmount',
    method: 'put',
    data: data
  })
}

// 删除棚膜量
export function delGreenhousefilmAmount(greenhousefilmAmountId) {
  return request({
    url: '/production/greenhousefilmAmount/' + greenhousefilmAmountId,
    method: 'delete'
  })
}

// 导出棚膜量
export function exportGreenhousefilmAmount(query) {
  return request({
    url: '/production/greenhousefilmAmount/export',
    method: 'get',
    params: query
  })
}
