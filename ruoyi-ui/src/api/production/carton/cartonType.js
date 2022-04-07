import request from '@/utils/request'

// 查询纸箱类型列表
export function listType(query) {
  return request({
    url: '/system/cartonType/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱类型详细
export function getType(cartonTypeId) {
  return request({
    url: '/system/cartonType/' + cartonTypeId,
    method: 'get'
  })
}

// 新增纸箱类型
export function addType(data) {
  return request({
    url: '/system/cartonType',
    method: 'post',
    data: data
  })
}

// 修改纸箱类型
export function updateType(data) {
  return request({
    url: '/system/cartonType',
    method: 'put',
    data: data
  })
}
// 全部纸箱类型
export function cartonsType() {
  return request({
    url: '/system/cartonType/list',
    method: 'get',
  })
}
// 删除纸箱类型
export function delType(cartonTypeId) {
  return request({
    url: '/system/cartonType/' + cartonTypeId,
    method: 'delete'
  })
}

// 导出纸箱类型
export function exportType(query) {
  return request({
    url: '/system/cartonType/export',
    method: 'get',
    params: query
  })
}
