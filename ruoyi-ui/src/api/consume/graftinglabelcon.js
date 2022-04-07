import request from '@/utils/request'

// 查询查看领用信息列表
export function listGraftinglabelcon(query) {
  return request({
    url: '/consume/graftinglabelcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getGraftinglabelcon(graftinglabelConsumeId) {
  return request({
    url: '/consume/graftinglabelcon/' + graftinglabelConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addGraftinglabelcon(data) {
  return request({
    url: '/consume/graftinglabelcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateGraftinglabelcon(data) {
  return request({
    url: '/consume/graftinglabelcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delGraftinglabelcon(graftinglabelConsumeId) {
  return request({
    url: '/consume/graftinglabelcon/' + graftinglabelConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportGraftinglabelcon(query) {
  return request({
    url: '/consume/graftinglabelcon/export',
    method: 'get',
    params: query
  })
}
