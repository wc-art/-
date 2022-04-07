import request from '@/utils/request'

// 查询VIEW列表
export function listProcess(query) {
  return request({
    url: '/system/process/list',
    method: 'get',
    params: query
  })
}

// 查询VIEW详细
export function getProcess(id) {
  return request({
    url: '/system/process/' + id,
    method: 'get'
  })
}

// 新增VIEW
export function addProcess(data) {
  return request({
    url: '/system/process',
    method: 'post',
    data: data
  })
}

// 修改VIEW
export function updateProcess(data) {
  return request({
    url: '/system/process',
    method: 'put',
    data: data
  })
}

// 删除VIEW
export function delProcess(id) {
  return request({
    url: '/system/process/' + id,
    method: 'delete'
  })
}


// 导出VIEW
export function exportProcess(query) {
  return request({
    url: '/system/process/export',
    method: 'get',
    params: query
  })
}
