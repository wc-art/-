import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listRegulatortemcon(query) {
  return request({
    url: '/consume/regulatortemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getRegulatortemcon(regulatorConsumeTemporaryId) {
  return request({
    url: '/consume/regulatortemcon/' + regulatorConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addRegulatortemcon(data) {
  return request({
    url: '/consume/regulatortemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateRegulatortemcon(data) {
  return request({
    url: '/consume/regulatortemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delRegulatortemcon(regulatorConsumeTemporaryId) {
  return request({
    url: '/consume/regulatortemcon/' + regulatorConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportRegulatortemcon(query) {
  return request({
    url: '/consume/regulatortemcon/export',
    method: 'get',
    params: query
  })
}