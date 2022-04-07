import request from '@/utils/request'

// 查询人工播种列表
export function listArtiseeding(query) {
  return request({
    url: '/process/artiseeding/list',
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
// 查询人工播种详细
export function getArtiseeding(workArtiseedingId) {
  return request({
    url: '/process/artiseeding/' + workArtiseedingId,
    method: 'get'
  })
}

// 新增人工播种
export function addArtiseeding(data) {
  return request({
    url: '/process/artiseeding',
    method: 'post',
    data: data
  })
}

// 修改人工播种
export function updateArtiseeding(data) {
  return request({
    url: '/process/artiseeding',
    method: 'put',
    data: data
  })
}

// 删除人工播种
export function delArtiseeding(workArtiseedingId) {
  return request({
    url: '/process/artiseeding/' + workArtiseedingId,
    method: 'delete'
  })
}

// 导出人工播种
export function exportArtiseeding(query) {
  return request({
    url: '/process/artiseeding/export',
    method: 'get',
    params: query
  })
}
