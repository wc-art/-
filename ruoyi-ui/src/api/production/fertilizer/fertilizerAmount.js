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

// 查询化肥量列表
export function listFertilizerAmount(query) {
  return request({
    url: '/production/fertilizerAmount/list',
    method: 'get',
    params: query
  })
}

// 查询化肥量详细
export function getFertilizerAmount(fertilizerAmountId) {
  return request({
    url: '/production/fertilizerAmount/' + fertilizerAmountId,
    method: 'get'
  })
}

// 新增化肥量
export function addFertilizerAmount(data) {
  return request({
    url: '/production/fertilizerAmount',
    method: 'post',
    data: data
  })
}

// 修改化肥量
export function updateFertilizerAmount(data) {
  return request({
    url: '/production/fertilizerAmount',
    method: 'put',
    data: data
  })
}

// 删除化肥量
export function delFertilizerAmount(fertilizerAmountId) {
  return request({
    url: '/production/fertilizerAmount/' + fertilizerAmountId,
    method: 'delete'
  })
}

// 导出化肥量
export function exportFertilizerAmount(query) {
  return request({
    url: '/production/fertilizerAmount/export',
    method: 'get',
    params: query
  })
}
