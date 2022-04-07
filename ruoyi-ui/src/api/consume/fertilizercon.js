import request from '@/utils/request'

// 查询查看领用信息列表
export function listFertilizercon(query) {
  return request({
    url: '/consume/fertilizercon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getFertilizercon(fertilizerConsumeId) {
  return request({
    url: '/consume/fertilizercon/' + fertilizerConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addFertilizercon(data) {
  return request({
    url: '/consume/fertilizercon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateFertilizercon(data) {
  return request({
    url: '/consume/fertilizercon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delFertilizercon(fertilizerConsumeId) {
  return request({
    url: '/consume/fertilizercon/' + fertilizerConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportFertilizercon(query) {
  return request({
    url: '/consume/fertilizercon/export',
    method: 'get',
    params: query
  })
}