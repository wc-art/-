import request from '@/utils/request'

// 查询嫁接夹退回列表
export function listGraftingclipre(query) {
  return request({
    url: '/production/graftingclipre/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹退回详细
export function getGraftingclipre(graftingclipReturnId) {
  return request({
    url: '/production/graftingclipre/' + graftingclipReturnId,
    method: 'get'
  })
}
// 获取嫁接夹类型
export function getGraftingclipType() {
  return request({
    url: '/production/graftingclipre/type',
    method: 'get',
  })
}

// 获取口径型号
export function getSpecification(graftingclipTypeId) {
  return request({
    url: '/production/graftingclipre/specification/'+ graftingclipTypeId,
    method: 'get',
  })
}
// 获取公司下拉框
export function getOriginCompany(graftingclipTypeId) {
  return request({
    url: '/production/graftingclipre/origincompany/'+ graftingclipTypeId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/graftingclipre/username',
    method: 'get',
  })
}
// 新增嫁接夹退回
export function addGraftingclipre(data) {
  return request({
    url: '/production/graftingclipre',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹退回
export function updateGraftingclipre(data) {
  return request({
    url: '/production/graftingclipre',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹退回
export function delGraftingclipre(graftingclipReturnId) {
  return request({
    url: '/production/graftingclipre/' + graftingclipReturnId,
    method: 'delete'
  })
}

// 导出嫁接夹退回
export function exportGraftingclipre(query) {
  return request({
    url: '/production/graftingclipre/export',
    method: 'get',
    params: query
  })
}
