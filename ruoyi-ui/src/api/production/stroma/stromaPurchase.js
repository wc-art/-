import request from '@/utils/request'

// 查询基质种列表
export function listStromaKind(query) {
  return request({
    url: '/system/stromaKind/list',
    method: 'get',
    params: query
  })
}

// 查询基质类型列表
export function listStromaType(query) {
  return request({
    url: '/system/stromaType/list',
    method: 'get',
    params: query
  })
}

// 查询基质购买信息列表
export function listStromaPurchase(query) {
  return request({
    url: '/production/stromaPurchase/list',
    method: 'get',
    params: query
  })
}

// 查询基质购买信息详细
export function getStromaPurchase(stromaPurchaseId) {
  return request({
    url: '/production/stromaPurchase/' + stromaPurchaseId,
    method: 'get'
  })
}

// 新增基质购买信息
export function addStromaPurchase(data) {
  return request({
    url: '/production/stromaPurchase',
    method: 'post',
    data: data
  })
}

// 修改基质购买信息
export function updateStromaPurchase(data) {
  return request({
    url: '/production/stromaPurchase',
    method: 'put',
    data: data
  })
}

// 删除基质购买信息
export function delStromaPurchase(stromaPurchaseId) {
  return request({
    url: '/production/stromaPurchase/' + stromaPurchaseId,
    method: 'delete'
  })
}

// 导出基质购买信息
export function exportStromaPurchase(query) {
  return request({
    url: '/production/stromaPurchase/export',
    method: 'get',
    params: query
  })
}
