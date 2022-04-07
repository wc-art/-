import request from '@/utils/request'

// 查询查看领用信息列表
export function listSeedcon(query) {
  return request({
    url: '/consume/seedcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getSeedcon(seedConsumeId) {
  return request({
    url: '/consume/seedcon/' + seedConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addSeedcon(data) {
  return request({
    url: '/consume/seedcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateSeedcon(data) {
  return request({
    url: '/consume/seedcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delSeedcon(seedConsumeId) {
  return request({
    url: '/consume/seedcon/' + seedConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportSeedcon(query) {
  return request({
    url: '/consume/seedcon/export',
    method: 'get',
    params: query
  })
}
