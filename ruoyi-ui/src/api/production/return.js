import request from '@/utils/request'

// 查询种子退回列表
export function listReturn(query) {
  return request({
    url: '/production/return/list',
    method: 'get',
    params: query
  })
}

// 查询种子退回详细
export function getReturn(seedReturnId) {
  return request({
    url: '/production/return/' + seedReturnId,
    method: 'get'
  })
}

// 新增种子退回
export function addReturn(data) {
  return request({
    url: '/production/return',
    method: 'post',
    data: data
  })
}

// 获取蔬菜编号和蔬菜
export function getCropType() {
  return request({
    url: '/production/return/croptype',
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/return/username',
    method: 'get',
  })
}

// 获取蔬菜对应品种列表
export function getVarietyName(cropTypeId) {
  return request({
    url: '/production/return/varietyname/'+ cropTypeId,
    method: 'get',
  })
}


// 修改种子退回
export function updateReturn(data) {
  return request({
    url: '/production/return',
    method: 'put',
    data: data
  })
}

// 删除种子退回
export function delReturn(seedReturnId) {
  return request({
    url: '/production/return/' + seedReturnId,
    method: 'delete'
  })
}

// 导出种子退回
export function exportReturn(query) {
  return request({
    url: '/production/return/export',
    method: 'get',
    params: query
  })
}
