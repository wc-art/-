import request from '@/utils/request'

// 查询调节剂名称列表
export function listRegulatorName(query) {
  return request({
    url: '/production/regulatorName/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂类型列表
export function listRegulatorType(query) {
  return request({
    url: '/production/regulatorType/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂量列表
export function listRegulatorAmount(query) {
  return request({
    url: '/production/regulatorAmount/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂量详细
export function getRegulatorAmount(regulatorAmountId) {
  return request({
    url: '/production/regulatorAmount/' + regulatorAmountId,
    method: 'get'
  })
}

// 新增调节剂量
export function addRegulatorAmount(data) {
  return request({
    url: '/production/regulatorAmount',
    method: 'post',
    data: data
  })
}

// 修改调节剂量
export function updateRegulatorAmount(data) {
  return request({
    url: '/production/regulatorAmount',
    method: 'put',
    data: data
  })
}

// 删除调节剂量
export function delRegulatorAmount(regulatorAmountId) {
  return request({
    url: '/production/regulatorAmount/' + regulatorAmountId,
    method: 'delete'
  })
}

// 导出调节剂量
export function exportRegulatorAmount(query) {
  return request({
    url: '/production/regulatorAmount/export',
    method: 'get',
    params: query
  })
}
