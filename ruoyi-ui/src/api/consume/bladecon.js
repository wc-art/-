import request from '@/utils/request'

// 查询查看领用信息列表
export function listBladecon(query) {
  return request({
    url: '/consume/bladecon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getBladecon(bladeConsumeId) {
  return request({
    url: '/consume/bladecon/' + bladeConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addBladecon(data) {
  return request({
    url: '/consume/bladecon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateBladecon(data) {
  return request({
    url: '/consume/bladecon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delBladecon(bladeConsumeId) {
  return request({
    url: '/consume/bladecon/' + bladeConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportBladecon(query) {
  return request({
    url: '/consume/bladecon/export',
    method: 'get',
    params: query
  })
}