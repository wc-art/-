import request from '@/utils/request'

// 查询VIEW列表
export function listUsers(query) {
  return request({
    url: '/system/users/list',
    method: 'get',
    params: query
  })
}

// 查询VIEW详细
export function getUsers(userName) {
  return request({
    url: '/system/users/' + userName,
    method: 'get'
  })
}

// 新增VIEW
export function addUsers(data) {
  return request({
    url: '/system/users',
    method: 'post',
    data: data
  })
}

// 修改VIEW
export function updateUsers(data) {
  return request({
    url: '/system/users',
    method: 'put',
    data: data
  })
}

// 删除VIEW
export function delUsers(userName) {
  return request({
    url: '/system/users/' + userName,
    method: 'delete'
  })
}

// 导出VIEW
export function exportUsers(query) {
  return request({
    url: '/system/users/export',
    method: 'get',
    params: query
  })
}