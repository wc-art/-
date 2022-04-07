import request from '@/utils/request'

// 查询刀片类型列表
export function listBladeType(query) {
  return request({
    url: '/production/bladeType/list',
    method: 'get',
    params: query
  })
}

// 查询刀片量列表
export function listBladeAmount(query) {
  return request({
    url: '/production/bladeAmount/list',
    method: 'get',
    params: query
  })
}

// 查询刀片量详细
export function getBladeAmount(bladeAmountId) {
  return request({
    url: '/production/bladeAmount/' + bladeAmountId,
    method: 'get'
  })
}

// 新增刀片量
export function addBladeAmount(data) {
  return request({
    url: '/production/bladeAmount',
    method: 'post',
    data: data
  })
}

// 修改刀片量
export function updateBladeAmount(data) {
  return request({
    url: '/production/bladeAmount',
    method: 'put',
    data: data
  })
}

// 删除刀片量
export function delBladeAmount(bladeAmountId) {
  return request({
    url: '/production/bladeAmount/' + bladeAmountId,
    method: 'delete'
  })
}

// 导出刀片量
export function exportBladeAmount(query) {
  return request({
    url: '/production/bladeAmount/export',
    method: 'get',
    params: query
  })
}
