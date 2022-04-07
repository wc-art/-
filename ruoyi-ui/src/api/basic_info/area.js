import request from '@/utils/request'

// 查询片区管理列表
export function listArea(query) {
  return request({
    url: '/system/area/list',
    method: 'get',
    params: query
  })
}

// 查询片区管理详细
export function getArea(areaId) {
  return request({
    url: '/system/area/' + areaId,
    method: 'get'
  })
}

// 新增片区管理
export function addArea(data) {
  return request({
    url: '/system/area',
    method: 'post',
    data: data
  })
}

// 修改片区管理
export function updateArea(data) {
  return request({
    url: '/system/area',
    method: 'put',
    data: data
  })
}

// 删除片区管理
export function delArea(areaId) {
  return request({
    url: '/system/area/' + areaId,
    method: 'delete'
  })
}

// 导出片区管理
export function exportArea(query) {
  return request({
    url: '/system/area/export',
    method: 'get',
    params: query
  })
}