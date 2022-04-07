import request from '@/utils/request'

// 查询其他劳动力情况列表
export function listOtherlabor(query) {
  return request({
    url: '/labormgr/otherlabor/list',
    method: 'get',
    params: query
  })
}

// 查询其他劳动力情况详细
export function getOtherlabor(laborEmployOtherId) {
  return request({
    url: '/labormgr/otherlabor/' + laborEmployOtherId,
    method: 'get'
  })
}

// 新增其他劳动力情况
export function addOtherlabor(data) {
  return request({
    url: '/labormgr/otherlabor',
    method: 'post',
    data: data
  })
}

// 修改其他劳动力情况
export function updateOtherlabor(data) {
  return request({
    url: '/labormgr/otherlabor',
    method: 'put',
    data: data
  })
}

// 审核其他劳动力情况
export function reviewOtherlabor(data) {
  return request({
    url: '/labormgr/otherlabor/review',
    method: 'put',
    data: data
  })
}

// 删除其他劳动力情况
export function delOtherlabor(laborEmployOtherId) {
  return request({
    url: '/labormgr/otherlabor/' + laborEmployOtherId,
    method: 'delete'
  })
}

// 获取操作编号和操作名称
export function getOperation() {
  return request({
    url: '/labormgr/otherlabor/operation',
    method: 'get',
  })
}
// 导出其他劳动力情况
export function exportOtherlabor(query) {
  return request({
    url: '/labormgr/otherlabor/export',
    method: 'get',
    params: query
  })
}
