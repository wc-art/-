import request from '@/utils/request'

// 查询移盘管理列表
export function listMoveplate(query) {
  return request({
    url: '/process/moveplate/list',
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
// 查询移盘管理详细
export function getMoveplate(workMoveplateId) {
  return request({
    url: '/process/moveplate/' + workMoveplateId,
    method: 'get'
  })
}

// 新增移盘管理
export function addMoveplate(data) {
  return request({
    url: '/process/moveplate',
    method: 'post',
    data: data
  })
}

// 修改移盘管理
export function updateMoveplate(data) {
  return request({
    url: '/process/moveplate',
    method: 'put',
    data: data
  })
}

// 删除移盘管理
export function delMoveplate(workMoveplateId) {
  return request({
    url: '/process/moveplate/' + workMoveplateId,
    method: 'delete'
  })
}

// 导出移盘管理
export function exportMoveplate(query) {
  return request({
    url: '/process/moveplate/export',
    method: 'get',
    params: query
  })
}
