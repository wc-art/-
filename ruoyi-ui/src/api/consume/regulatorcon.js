import request from '@/utils/request'

// 查询查看领用信息列表
export function listRegulatorcon(query) {
  return request({
    url: '/consume/regulatorcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看领用信息详细
export function getRegulatorcon(regulatorConsumeId) {
  return request({
    url: '/consume/regulatorcon/' + regulatorConsumeId,
    method: 'get'
  })
}

// 新增查看领用信息
export function addRegulatorcon(data) {
  return request({
    url: '/consume/regulatorcon',
    method: 'post',
    data: data
  })
}

// 修改查看领用信息
export function updateRegulatorcon(data) {
  return request({
    url: '/consume/regulatorcon',
    method: 'put',
    data: data
  })
}

// 删除查看领用信息
export function delRegulatorcon(regulatorConsumeId) {
  return request({
    url: '/consume/regulatorcon/' + regulatorConsumeId,
    method: 'delete'
  })
}

// 导出查看领用信息
export function exportRegulatorcon(query) {
  return request({
    url: '/consume/regulatorcon/export',
    method: 'get',
    params: query
  })
}