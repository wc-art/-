import request from '@/utils/request'

// 查询调节剂退回列表
export function listRegulatorre(query) {
  return request({
    url: '/production/regulatorre/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂退回详细
export function getRegulatorre(regulagorReturnId) {
  return request({
    url: '/production/regulatorre/' + regulagorReturnId,
    method: 'get'
  })
}
// 获取化肥名称
export function getRegulatorName() {
  return request({
    url: '/production/regulatorre/name',
    method: 'get',
  })
}
// 获取类型
export function getRegulatorType() {
  return request({
    url: '/production/regulatorre/type',
    method: 'get',
  })
}

export function getContent(regulatorNameId) {
  return request({
    url: '/production/regulatorre/content/'+ regulatorNameId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(regulatorNameId) {
  return request({
    url: '/production/regulatorre/origincompany/'+ regulatorNameId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/regulatorre/username',
    method: 'get',
  })
}
// 新增调节剂退回
export function addRegulatorre(data) {
  return request({
    url: '/production/regulatorre',
    method: 'post',
    data: data
  })
}

// 修改调节剂退回
export function updateRegulatorre(data) {
  return request({
    url: '/production/regulatorre',
    method: 'put',
    data: data
  })
}

// 删除调节剂退回
export function delRegulatorre(regulagorReturnId) {
  return request({
    url: '/production/regulatorre/' + regulagorReturnId,
    method: 'delete'
  })
}

// 导出调节剂退回
export function exportRegulatorre(query) {
  return request({
    url: '/production/regulatorre/export',
    method: 'get',
    params: query
  })
}
