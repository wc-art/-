import request from '@/utils/request'

// 查询usercrop列表
export function listUsercrop(query) {
  return request({
    url: '/system/usercrop/list',
    method: 'get',
    params: query
  })
}

// 查询usercrop详细
export function getUsercrop(userId) {
  return request({
    url: '/system/usercrop/' + userId,
    method: 'get'
  })
}

// 新增usercrop
export function addUsercrop(data) {
  return request({
    url: '/system/usercrop',
    method: 'post',
    data: data
  })
}

// 修改usercrop
export function updateUsercrop(data) {
  return request({
    url: '/system/usercrop',
    method: 'put',
    data: data
  })
}

// 删除usercrop
export function delUsercrop(userId) {
  return request({
    url: '/system/usercrop/' + userId,
    method: 'delete'
  })
}

// 导出usercrop
export function exportUsercrop(query) {
  return request({
    url: '/system/usercrop/export',
    method: 'get',
    params: query
  })
}