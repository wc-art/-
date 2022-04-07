import request from '@/utils/request'

// 查询棚膜类型(长*宽)列表
export function listGreenhousefilmType(query) {
  return request({
    url: '/production/greenhousefilmType/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜类型(长*宽)详细
export function getGreenhousefilmType(greenhousefilmTypeId) {
  return request({
    url: '/production/greenhousefilmType/' + greenhousefilmTypeId,
    method: 'get'
  })
}

// 新增棚膜类型(长*宽)
export function addGreenhousefilmType(data) {
  return request({
    url: '/production/greenhousefilmType',
    method: 'post',
    data: data
  })
}

// 修改棚膜类型(长*宽)
export function updateGreenhousefilmType(data) {
  return request({
    url: '/production/greenhousefilmType',
    method: 'put',
    data: data
  })
}

// 删除棚膜类型(长*宽)
export function delGreenhousefilmType(greenhousefilmTypeId) {
  return request({
    url: '/production/greenhousefilmType/' + greenhousefilmTypeId,
    method: 'delete'
  })
}

// 导出棚膜类型(长*宽)
export function exportGreenhousefilmType(query) {
  return request({
    url: '/production/greenhousefilmType/export',
    method: 'get',
    params: query
  })
}