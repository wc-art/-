import request from '@/utils/request'

// 查询化肥退回列表
export function listFertilizerre(query) {
  return request({
    url: '/production/fertilizerre/list',
    method: 'get',
    params: query
  })
}

// 查询化肥退回详细
export function getFertilizerre(fertilizerReturnId) {
  return request({
    url: '/production/fertilizerre/' + fertilizerReturnId,
    method: 'get'
  })
}
// 获取化肥名称
export function getFertilizerName() {
  return request({
    url: '/production/fertilizerre/name',
    method: 'get',
  })
}
// 获取化肥类型
export function getFertilizerType() {
  return request({
    url: '/production/fertilizerre/type',
    method: 'get',
  })
}
// 获取npk下拉框
export function getContent(fertilizerNameId) {
  return request({
    url: '/production/fertilizerre/content/'+ fertilizerNameId,
    method: 'get',
  })
}
// 获取品牌下拉框
export function getBrand(fertilizerNameId) {
  return request({
    url: '/production/fertilizerre/brand/'+ fertilizerNameId,
    method: 'get',
  })
}

// 获取公司下拉框
export function getOriginCompany(fertilizerNameId) {
  return request({
    url: '/production/fertilizerre/origincompany/'+ fertilizerNameId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/fertilizerre/username',
    method: 'get',
  })
}
// 新增化肥退回
export function addFertilizerre(data) {
  return request({
    url: '/production/fertilizerre',
    method: 'post',
    data: data
  })
}

// 修改化肥退回
export function updateFertilizerre(data) {
  return request({
    url: '/production/fertilizerre',
    method: 'put',
    data: data
  })
}

// 删除化肥退回
export function delFertilizerre(fertilizerReturnId) {
  return request({
    url: '/production/fertilizerre/' + fertilizerReturnId,
    method: 'delete'
  })
}

// 导出化肥退回
export function exportFertilizerre(query) {
  return request({
    url: '/production/fertilizerre/export',
    method: 'get',
    params: query
  })
}
