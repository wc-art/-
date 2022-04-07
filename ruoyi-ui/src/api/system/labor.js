import request from '@/utils/request'

// 查询劳动力参数管理列表
export function listLabor(query) {
  return request({
    url: '/system/labor/list',
    method: 'get',
    params: query
  })
}

// 查询劳动力参数管理详细
export function getLabor(parameterLaborId) {
  return request({
    url: '/system/labor/' + parameterLaborId,
    method: 'get'
  })
}

// 新增劳动力参数管理
export function addLabor(data) {
  return request({
    url: '/system/labor',
    method: 'post',
    data: data
  })
}

// 修改劳动力参数管理
export function updateLabor(data) {
  return request({
    url: '/system/labor',
    method: 'put',
    data: data
  })
}

// 删除劳动力参数管理
export function delLabor(parameterLaborId) {
  return request({
    url: '/system/labor/' + parameterLaborId,
    method: 'delete'
  })
}

// 导出劳动力参数管理
export function exportLabor(query) {
  return request({
    url: '/system/labor/export',
    method: 'get',
    params: query
  })
}