import request from '@/utils/request'

// 查询穴盘申请领用详细列表
export function listApply(query) {
  return request({
    url: '/plug/apply/list',
    method: 'get',
    params: query
  })
}

// 查询穴盘申请领用详细详细
export function getApply(plugApplyId) {
  return request({
    url: '/plug/apply/' + plugApplyId,
    method: 'get'
  })
}

// 新增穴盘申请领用详细
export function addApply(data) {
  return request({
    url: '/plug/apply',
    method: 'post',
    data: data
  })
}

// 修改穴盘申请领用详细
export function updateApply(data) {
  return request({
    url: '/plug/apply',
    method: 'put',
    data: data
  })
}

// 删除穴盘申请领用详细
export function delApply(plugApplyId) {
  return request({
    url: '/plug/apply/' + plugApplyId,
    method: 'delete'
  })
}

// 导出穴盘申请领用详细
export function exportApply(query) {
  return request({
    url: '/plug/apply/export',
    method: 'get',
    params: query
  })
}