import request from '@/utils/request'

// 查询用户大棚关联列表
export function listUsergreenhouse(query) {
  return request({
    url: '/system/usergreenhouse/list',
    method: 'get',
    params: query
  })
}

// 查询用户大棚关联详细
export function getUsergreenhouse(userId) {
  console.log("userId",userId)
  return request({
    url: '/system/usergreenhouse/' + userId,
    method: 'get'
  })
}

// 新增用户大棚关联
export function addUsergreenhouse(data) {
  return request({
    url: '/system/usergreenhouse',
    method: 'post',
    data: data
  })
}

// 修改用户大棚关联
export function updateUsergreenhouse(data) {
  return request({
    url: '/system/usergreenhouse',
    method: 'put',
    data: data
  })
}

// 删除用户大棚关联
export function delUsergreenhouse(userId) {
  return request({
    url: '/system/usergreenhouse/' + userId,
    method: 'delete'
  })
}

// 导出用户大棚关联
export function exportUsergreenhouse(query) {
  return request({
    url: '/system/usergreenhouse/export',
    method: 'get',
    params: query
  })
}
