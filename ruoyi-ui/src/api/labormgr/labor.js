import request from '@/utils/request'

// 查询劳动力情况列表
export function listLabor(query) {
  return request({
    url: '/labormgr/labor/list',
    method: 'get',
    params: query
  })
}

// 查询劳动力情况详细
export function getLabor(laborEmployId) {
  return request({
    url: '/labormgr/labor/' + laborEmployId,
    method: 'get'
  })
}

// 新增劳动力情况
export function addLabor(data) {
  return request({
    url: '/labormgr/labor',
    method: 'post',
    data: data
  })
}

// 修改劳动力情况
export function updateLabor(data) {
  return request({
    url: '/labormgr/labor',
    method: 'put',
    data: data
  })
}

// 审核劳动力情况
export function reviewLabor(data) {
  return request({
    url: '/labormgr/labor/review',
    method: 'put',
    data: data
  })
}


// 获取操作编号和操作名称
export function getOperation() {
  return request({
    url: '/labormgr/labor/operation',
    method: 'get',
  })
}

// 删除劳动力情况
export function delLabor(laborEmployId) {
  return request({
    url: '/labormgr/labor/' + laborEmployId,
    method: 'delete'
  })
}

// 导出劳动力情况
export function exportLabor(query) {
  return request({
    url: '/labormgr/labor/export',
    method: 'get',
    params: query
  })
}
