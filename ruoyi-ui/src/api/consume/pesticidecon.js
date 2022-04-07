import request from '@/utils/request'

// 查询查看领用信息列表
export function listPesticidecon(query) {
  return request({
    url: '/consume/pesticidecon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getPesticidecon(pesticideConsumeId) {
  return request({
    url: '/consume/pesticidecon/' + pesticideConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addPesticidecon(data) {
  return request({
    url: '/consume/pesticidecon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updatePesticidecon(data) {
  return request({
    url: '/consume/pesticidecon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delPesticidecon(pesticideConsumeId) {
  return request({
    url: '/consume/pesticidecon/' + pesticideConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportPesticidecon(query) {
  return request({
    url: '/consume/pesticidecon/export',
    method: 'get',
    params: query
  })
}