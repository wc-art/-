import request from '@/utils/request'

// 查询蔬菜类型列表
export function listCropType(query) {
  return request({
    url: '/seed/type/list',
    method: 'get',
    params: query
  })
}

// 查询种子量列表
export function listSeedAmount(query) {
  return request({
    url: '/seed/amount/list',
    method: 'get',
    params: query
  })
}

// 查询种子量详细
export function getSeedAmount(seedAmountId) {
  return request({
    url: '/seed/amount/' + seedAmountId,
    method: 'get'
  })
}

// 新增种子量
export function addSeedAmount(data) {
  return request({
    url: '/seed/amount',
    method: 'post',
    data: data
  })
}

// 修改种子量
export function updateSeedAmount(data) {
  return request({
    url: '/seed/amount',
    method: 'put',
    data: data
  })
}

// 删除种子量
export function delSeedAmount(seedAmountId) {
  return request({
    url: '/seed/amount/' + seedAmountId,
    method: 'delete'
  })
}

// 导出种子量
export function exportSeedAmount(query) {
  return request({
    url: '/seed/amount/export',
    method: 'get',
    params: query
  })
}
