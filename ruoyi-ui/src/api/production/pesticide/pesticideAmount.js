import request from '@/utils/request'

// 查询农药名称列表
export function listPesticideName(query) {
  return request({
    url: '/production/pesticideName/list',
    method: 'get',
    params: query
  })
}

// 查询农药类型列表
export function listPesticideType(query) {
  return request({
    url: '/production/pesticideType/list',
    method: 'get',
    params: query
  })
}

// 查询农药量列表
export function listPesticideAmount(query) {
  return request({
    url: '/production/pesticideAmount/list',
    method: 'get',
    params: query
  })
}

// 查询农药量详细
export function getPesticideAmount(pesticideAmountId) {
  return request({
    url: '/production/pesticideAmount/' + pesticideAmountId,
    method: 'get'
  })
}

// 新增农药量
export function addPesticideAmount(data) {
  return request({
    url: '/production/pesticideAmount',
    method: 'post',
    data: data
  })
}

// 修改农药量
export function updatePesticideAmount(data) {
  return request({
    url: '/production/pesticideAmount',
    method: 'put',
    data: data
  })
}

// 删除农药量
export function delPesticideAmount(pesticideAmountId) {
  return request({
    url: '/production/pesticideAmount/' + pesticideAmountId,
    method: 'delete'
  })
}

// 导出农药量
export function exportPesticideAmount(query) {
  return request({
    url: '/production/pesticideAmount/export',
    method: 'get',
    params: query
  })
}
