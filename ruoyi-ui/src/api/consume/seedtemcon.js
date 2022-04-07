import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listSeedtemcon(query) {
  return request({
    url: '/consume/seedtemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getSeedtemcon(seedConsumeTemporaryId) {
  return request({
    url: '/consume/seedtemcon/' + seedConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addSeedtemcon(data) {
  return request({
    url: '/consume/seedtemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateSeedtemcon(data) {
  return request({
    url: '/consume/seedtemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delSeedtemcon(seedConsumeTemporaryId) {
  return request({
    url: '/consume/seedtemcon/' + seedConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportSeedtemcon(query) {
  return request({
    url: '/consume/seedtemcon/export',
    method: 'get',
    params: query
  })
}