import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listCartontemcon(query) {
  return request({
    url: '/consume/cartontemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getCartontemcon(cartonConsumeTemporaryId) {
  return request({
    url: '/consume/cartontemcon/' + cartonConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addCartontemcon(data) {
  return request({
    url: '/consume/cartontemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateCartontemcon(data) {
  return request({
    url: '/consume/cartontemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delCartontemcon(cartonConsumeTemporaryId) {
  return request({
    url: '/consume/cartontemcon/' + cartonConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportCartontemcon(query) {
  return request({
    url: '/consume/cartontemcon/export',
    method: 'get',
    params: query
  })
}