import request from '@/utils/request'

// 查询嫁接管理列表
export function listGrafting(query) {
  return request({
    url: '/process/grafting/list',
    method: 'get',
    params: query
  })
}
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
  })
}
export function listOrder(query) {
  return request({
    url: '/system/order/list',
    method: 'get',
  })
}
export function listgreenhouse(query) {
  return request({
    url: 'system/greenhouse/list',
    method: 'get',
  })
}
// 查询嫁接管理详细
export function getGrafting(workGraftingId) {
  return request({
    url: '/process/grafting/' + workGraftingId,
    method: 'get'
  })
}

// 新增嫁接管理
export function addGrafting(data) {
  return request({
    url: '/process/grafting',
    method: 'post',
    data: data
  })
}

// 修改嫁接管理
export function updateGrafting(data) {
  return request({
    url: '/process/grafting',
    method: 'put',
    data: data
  })
}

// 删除嫁接管理
export function delGrafting(workGraftingId) {
  return request({
    url: '/process/grafting/' + workGraftingId,
    method: 'delete'
  })
}

// 导出嫁接管理
export function exportGrafting(query) {
  return request({
    url: '/process/grafting/export',
    method: 'get',
    params: query
  })
}
