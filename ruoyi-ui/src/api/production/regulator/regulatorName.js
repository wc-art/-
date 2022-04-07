import request from '@/utils/request'

// 查询调节剂名称列表
export function listRegulatorName(query) {
  return request({
    url: '/production/regulatorName/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂名称详细
export function getRegulatorName(regulatorNameId) {
  return request({
    url: '/production/regulatorName/' + regulatorNameId,
    method: 'get'
  })
}

// 新增调节剂名称
export function addRegulatorName(data) {
  return request({
    url: '/production/regulatorName',
    method: 'post',
    data: data
  })
}

// 修改调节剂名称
export function updateRegulatorName(data) {
  return request({
    url: '/production/regulatorName',
    method: 'put',
    data: data
  })
}

// 删除调节剂名称
export function delRegulatorName(regulatorNameId) {
  return request({
    url: '/production/regulatorName/' + regulatorNameId,
    method: 'delete'
  })
}

// 导出调节剂名称
export function exportRegulatorName(query) {
  return request({
    url: '/production/regulatorName/export',
    method: 'get',
    params: query
  })
}