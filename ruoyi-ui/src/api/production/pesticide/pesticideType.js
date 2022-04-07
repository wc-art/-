import request from '@/utils/request'

// 查询农药类型列表
export function listPesticideType(query) {
  return request({
    url: '/production/pesticideType/list',
    method: 'get',
    params: query
  })
}

// 查询农药类型详细
export function getPesticideType(pesticideTypeId) {
  return request({
    url: '/production/pesticideType/' + pesticideTypeId,
    method: 'get'
  })
}

// 新增农药类型
export function addPesticideType(data) {
  return request({
    url: '/production/pesticideType',
    method: 'post',
    data: data
  })
}

// 修改农药类型
export function updatePesticideType(data) {
  return request({
    url: '/production/pesticideType',
    method: 'put',
    data: data
  })
}

// 删除农药类型
export function delPesticideType(pesticideTypeId) {
  return request({
    url: '/production/pesticideType/' + pesticideTypeId,
    method: 'delete'
  })
}

// 导出农药类型
export function exportPesticideType(query) {
  return request({
    url: '/production/pesticideType/export',
    method: 'get',
    params: query
  })
}