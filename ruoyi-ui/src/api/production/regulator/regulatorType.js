import request from '@/utils/request'

// 查询调节剂类型列表
export function listRegulatorType(query) {
  return request({
    url: '/production/regulatorType/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂类型详细
export function getRegulatorType(regulatorTypeId) {
  return request({
    url: '/production/regulatorType/' + regulatorTypeId,
    method: 'get'
  })
}

// 新增调节剂类型
export function addRegulatorType(data) {
  return request({
    url: '/production/regulatorType',
    method: 'post',
    data: data
  })
}

// 修改调节剂类型
export function updateRegulatorType(data) {
  return request({
    url: '/production/regulatorType',
    method: 'put',
    data: data
  })
}

// 删除调节剂类型
export function delRegulatorType(regulatorTypeId) {
  return request({
    url: '/production/regulatorType/' + regulatorTypeId,
    method: 'delete'
  })
}

// 导出调节剂类型
export function exportRegulatorType(query) {
  return request({
    url: '/production/regulatorType/export',
    method: 'get',
    params: query
  })
}