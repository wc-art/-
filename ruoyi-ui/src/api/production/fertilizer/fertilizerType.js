import request from '@/utils/request'

// 查询化肥名称列表
export function listFertilizerName(query) {
  return request({
    url: '/production/fertilizerName/list',
    method: 'get',
    params: query
  })
}

// 查询化肥类型列表
export function listFertilizerType(query) {
  return request({
    url: '/production/fertilizerType/list',
    method: 'get',
    params: query
  })
}

// 查询化肥类型详细
export function getFertilizerType(fertilizerTypeId) {
  return request({
    url: '/production/fertilizerType/' + fertilizerTypeId,
    method: 'get'
  })
}

// 新增化肥类型
export function addFertilizerType(data) {
  return request({
    url: '/production/fertilizerType',
    method: 'post',
    data: data
  })
}

// 修改化肥类型
export function updateFertilizerType(data) {
  return request({
    url: '/production/fertilizerType',
    method: 'put',
    data: data
  })
}

// 删除化肥类型
export function delFertilizerType(fertilizerTypeId) {
  return request({
    url: '/production/fertilizerType/' + fertilizerTypeId,
    method: 'delete'
  })
}

// 导出化肥类型
export function exportFertilizerType(query) {
  return request({
    url: '/production/fertilizerType/export',
    method: 'get',
    params: query
  })
}
