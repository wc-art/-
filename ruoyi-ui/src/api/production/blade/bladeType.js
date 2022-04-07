import request from '@/utils/request'

// 查询刀片类型列表
export function listBladeType(query) {
  return request({
    url: '/production/bladeType/list',
    method: 'get',
    params: query
  })
}
// 全部纸箱类型
export function bladesType() {
  return request({
    url: '/production/bladeType/list',
    method: 'get',
  })
}
// 查询刀片类型详细
export function getBladeType(bladeTypeId) {
  return request({
    url: '/production/bladeType/' + bladeTypeId,
    method: 'get'
  })
}

// 新增刀片类型
export function addBladeType(data) {
  return request({
    url: '/production/bladeType',
    method: 'post',
    data: data
  })
}

// 修改刀片类型
export function updateBladeType(data) {
  return request({
    url: '/production/bladeType',
    method: 'put',
    data: data
  })
}

// 删除刀片类型
export function delBladeType(bladeTypeId) {
  return request({
    url: '/production/bladeType/' + bladeTypeId,
    method: 'delete'
  })
}

// 导出刀片类型
export function exportBladeType(query) {
  return request({
    url: '/production/bladeType/export',
    method: 'get',
    params: query
  })
}
