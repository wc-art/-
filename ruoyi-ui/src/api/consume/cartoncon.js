import request from '@/utils/request'

// 查询查看领用信息列表
export function listCartoncon(query) {
  return request({
    url: '/consume/cartoncon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getCartoncon(cartonConsumeId) {
  return request({
    url: '/consume/cartoncon/' + cartonConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addCartoncon(data) {
  return request({
    url: '/consume/cartoncon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateCartoncon(data) {
  return request({
    url: '/consume/cartoncon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delCartoncon(cartonConsumeId) {
  return request({
    url: '/consume/cartoncon/' + cartonConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportCartoncon(query) {
  return request({
    url: '/consume/cartoncon/export',
    method: 'get',
    params: query
  })
}