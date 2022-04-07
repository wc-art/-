import request from '@/utils/request'

// 查询查看领用信息列表
export function listGreenhousefilmcon(query) {
  return request({
    url: '/consume/greenhousefilmcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getGreenhousefilmcon(greenhousefilmConsumeId) {
  return request({
    url: '/consume/greenhousefilmcon/' + greenhousefilmConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addGreenhousefilmcon(data) {
  return request({
    url: '/consume/greenhousefilmcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateGreenhousefilmcon(data) {
  return request({
    url: '/consume/greenhousefilmcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delGreenhousefilmcon(greenhousefilmConsumeId) {
  return request({
    url: '/consume/greenhousefilmcon/' + greenhousefilmConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportGreenhousefilmcon(query) {
  return request({
    url: '/consume/greenhousefilmcon/export',
    method: 'get',
    params: query
  })
}