import request from '@/utils/request'

// 查询农药退回列表
export function listPesticidere(query) {
  return request({
    url: '/production/pesticidere/list',
    method: 'get',
    params: query
  })
}

// 查询农药退回详细
export function getPesticidere(pesticideReturnId) {
  return request({
    url: '/production/pesticidere/' + pesticideReturnId,
    method: 'get'
  })
}

// 新增农药退回
export function addPesticidere(data) {
  return request({
    url: '/production/pesticidere',
    method: 'post',
    data: data
  })
}
// 获取农药名称
export function getPesticideName() {
  return request({
    url: '/production/pesticidere/pesticidename',
    method: 'get',
  })
}
// 获取农药类型
export function getPesticideType() {
  return request({
    url: '/production/pesticidere/pesticidetype',
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/pesticidere/username',
    method: 'get',
  })
}

// 获取有效含量下拉框
export function getContent(pesticideNameId) {
  return request({
    url: '/production/pesticidere/content/'+ pesticideNameId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(pesticideNameId) {
  return request({
    url: '/production/pesticidere/origincompany/'+ pesticideNameId,
    method: 'get',
  })
}
// 修改农药退回
export function updatePesticidere(data) {
  return request({
    url: '/production/pesticidere',
    method: 'put',
    data: data
  })
}

// 删除农药退回
export function delPesticidere(pesticideReturnId) {
  return request({
    url: '/production/pesticidere/' + pesticideReturnId,
    method: 'delete'
  })
}

// 导出农药退回
export function exportPesticidere(query) {
  return request({
    url: '/production/pesticidere/export',
    method: 'get',
    params: query
  })
}
