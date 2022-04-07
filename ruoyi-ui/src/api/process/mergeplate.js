import request from '@/utils/request'

// 查询合盘管理列表
export function listMergeplate(query) {
  return request({
    url: '/process/mergeplate/list',
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
// 查询合盘管理详细
export function getMergeplate(workMergeplateId) {
  return request({
    url: '/process/mergeplate/' + workMergeplateId,
    method: 'get'
  })
}

// 新增合盘管理
export function addMergeplate(data) {
  return request({
    url: '/process/mergeplate',
    method: 'post',
    data: data
  })
}

// 修改合盘管理
export function updateMergeplate(data) {
  return request({
    url: '/process/mergeplate',
    method: 'put',
    data: data
  })
}

// 删除合盘管理
export function delMergeplate(workMergeplateId) {
  return request({
    url: '/process/mergeplate/' + workMergeplateId,
    method: 'delete'
  })
}

// 导出合盘管理
export function exportMergeplate(query) {
  return request({
    url: '/process/mergeplate/export',
    method: 'get',
    params: query
  })
}
