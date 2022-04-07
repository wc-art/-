import request from '@/utils/request'

// 查询化肥类型列表
export function listFertilizerType(query) {
  return request({
    url: '/production/fertilizerType/list',
    method: 'get',
    params: query
  })
}

// 查询化肥名称列表
export function listFertilizerName(query) {
  return request({
    url: '/production/fertilizerName/list',
    method: 'get',
    params: query
  })
}

// 查询化肥名称详细
export function getFertilizerName(fertilizerNameId) {
  return request({
    url: '/production/fertilizerName/' + fertilizerNameId,
    method: 'get'
  })
}

// 新增化肥名称
export function addFertilizerName(data) {
  return request({
    url: '/production/fertilizerName',
    method: 'post',
    data: data
  })
}

// 修改化肥名称
export function updateFertilizerName(data) {
  return request({
    url: '/production/fertilizerName',
    method: 'put',
    data: data
  })
}

// 删除化肥名称
export function delFertilizerName(fertilizerNameId) {
  return request({
    url: '/production/fertilizerName/' + fertilizerNameId,
    method: 'delete'
  })
}

// 导出化肥名称
export function exportFertilizerName(query) {
  return request({
    url: '/production/fertilizerName/export',
    method: 'get',
    params: query
  })
}
