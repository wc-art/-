import request from '@/utils/request'

// 查询用户片区关联表列表
export function listUserarea(query) {
  return request({
    url: '/system/userarea/list',
    method: 'get',
    params: query
  })
}

// 查询用户片区关联表详细
export function getUserarea(userId) {
  return request({
    url: '/system/userarea/' + userId,
    method: 'get'
  })
}

// 新增用户片区关联表
export function addUserarea(data) {
  return request({
    url: '/system/userarea',
    method: 'post',
    data: data
  })
}

// 修改用户片区关联表
export function updateUserarea(data) {
  return request({
    url: '/system/userarea',
    method: 'put',
    data: data
  })
}

// 删除用户片区关联表
export function delUserarea(userId) {
  return request({
    url: '/system/userarea/' + userId,
    method: 'delete'
  })
}

// 导出用户片区关联表
export function exportUserarea(query) {
  return request({
    url: '/system/userarea/export',
    method: 'get',
    params: query
  })
}