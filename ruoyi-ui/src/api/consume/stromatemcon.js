import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listStromatemcon(query) {
  return request({
    url: '/consume/stromatemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getStromatemcon(stromaConsumeTemporayId) {
  return request({
    url: '/consume/stromatemcon/' + stromaConsumeTemporayId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addStromatemcon(data) {
  return request({
    url: '/consume/stromatemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateStromatemcon(data) {
  return request({
    url: '/consume/stromatemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delStromatemcon(stromaConsumeTemporayId) {
  return request({
    url: '/consume/stromatemcon/' + stromaConsumeTemporayId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportStromatemcon(query) {
  return request({
    url: '/consume/stromatemcon/export',
    method: 'get',
    params: query
  })
}