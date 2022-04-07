import request from '@/utils/request'

// 查询种子量列表
export function listAmount(query) {
  return request({
    url: '/seed/amount/list',
    method: 'get',
    params: query
  })
}

// 查询种子量详细
export function getAmount(seedAmountId) {
  return request({
    url: '/seed/amount/' + seedAmountId,
    method: 'get'
  })
}

// 新增种子量
export function addAmount(data) {
  return request({
    url: '/seed/amount',
    method: 'post',
    data: data
  })
}

// 修改种子量
export function updateAmount(data) {
  return request({
    url: '/seed/amount',
    method: 'put',
    data: data
  })
}

// 删除种子量
export function delAmount(seedAmountId) {
  return request({
    url: '/seed/amount/' + seedAmountId,
    method: 'delete'
  })
}

// 导出种子量
export function exportAmount(query) {
  return request({
    url: '/seed/amount/export',
    method: 'get',
    params: query
  })
}