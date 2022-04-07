import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listGreenhousefilmtemcon(query) {
  return request({
    url: '/consume/greenhousefilmtemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getGreenhousefilmtemcon(greenhousefilmConsumeTemporaryId) {
  return request({
    url: '/consume/greenhousefilmtemcon/' + greenhousefilmConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addGreenhousefilmtemcon(data) {
  return request({
    url: '/consume/greenhousefilmtemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateGreenhousefilmtemcon(data) {
  return request({
    url: '/consume/greenhousefilmtemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delGreenhousefilmtemcon(greenhousefilmConsumeTemporaryId) {
  return request({
    url: '/consume/greenhousefilmtemcon/' + greenhousefilmConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportGreenhousefilmtemcon(query) {
  return request({
    url: '/consume/greenhousefilmtemcon/export',
    method: 'get',
    params: query
  })
}