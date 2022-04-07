import request from '@/utils/request'

// 查询嫁接签退回列表
export function listGraftinglabelre(query) {
  return request({
    url: '/production/graftinglabelre/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签退回详细
export function getGraftinglabelre(graftinglabelReturnId) {
  return request({
    url: '/production/graftinglabelre/' + graftinglabelReturnId,
    method: 'get'
  })
}
// 获取嫁接签类型
export function getGraftinglabelType() {
  return request({
    url: '/production/graftinglabelre/type',
    method: 'get',
  })
}
// 获取规格
export function getSpecification(graftinglabelTypeId) {
  return request({
    url: '/production/graftinglabelre/specification/'+ graftinglabelTypeId,
    method: 'get',
  })
}
// 获取公司下拉框
export function getOriginCompany(graftinglabelTypeId) {
  return request({
    url: '/production/graftinglabelre/origincompany/'+ graftinglabelTypeId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/graftinglabelre/username',
    method: 'get',
  })
}
// 新增嫁接签退回
export function addGraftinglabelre(data) {
  return request({
    url: '/production/graftinglabelre',
    method: 'post',
    data: data
  })
}

// 修改嫁接签退回
export function updateGraftinglabelre(data) {
  return request({
    url: '/production/graftinglabelre',
    method: 'put',
    data: data
  })
}

// 删除嫁接签退回
export function delGraftinglabelre(graftinglabelReturnId) {
  return request({
    url: '/production/graftinglabelre/' + graftinglabelReturnId,
    method: 'delete'
  })
}

// 导出嫁接签退回
export function exportGraftinglabelre(query) {
  return request({
    url: '/production/graftinglabelre/export',
    method: 'get',
    params: query
  })
}
