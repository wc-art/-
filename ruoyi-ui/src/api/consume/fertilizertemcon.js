import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listFertilizertemcon(query) {
  return request({
    url: '/consume/fertilizertemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getFertilizertemcon(fertilizerConsumeTemporaryId) {
  return request({
    url: '/consume/fertilizertemcon/' + fertilizerConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addFertilizertemcon(data) {
  return request({
    url: '/consume/fertilizertemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateFertilizertemcon(data) {
  return request({
    url: '/consume/fertilizertemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delFertilizertemcon(fertilizerConsumeTemporaryId) {
  return request({
    url: '/consume/fertilizertemcon/' + fertilizerConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportFertilizertemcon(query) {
  return request({
    url: '/consume/fertilizertemcon/export',
    method: 'get',
    params: query
  })
}