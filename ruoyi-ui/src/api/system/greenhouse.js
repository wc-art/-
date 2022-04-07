import request from '@/utils/request'

// 查询大棚管理列表
export function listGreenhouse(query) {
  return request({
    url: '/system/greenhouse/list',
    method: 'get',
    params: query
  })
}

// 查询大棚管理详细
export function getGreenhouse(greenhouseId) {
  return request({
    url: '/system/greenhouse/' + greenhouseId,
    method: 'get'
  })
}

export function listarea(query) {
  return request({
    url: '/system/area/list',
  method: 'get'
  })
}

// 新增大棚管理
export function addGreenhouse(data) {
  return request({
    url: '/system/greenhouse',
    method: 'post',
    data: data
  })
}

// 修改大棚管理
export function updateGreenhouse(data) {
  return request({
    url: '/system/greenhouse',
    method: 'put',
    data: data
  })
}

// 删除大棚管理
export function delGreenhouse(greenhouseId) {
  return request({
    url: '/system/greenhouse/' + greenhouseId,
    method: 'delete'
  })
}

// 导出大棚管理
export function exportGreenhouse(query) {
  return request({
    url: '/system/greenhouse/export',
    method: 'get',
    params: query
  })
}
