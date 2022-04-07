import request from '@/utils/request'

// 查询纸箱申请领用详细列表
export function listApply(query) {
  return request({
    url: '/carton/apply/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱申请领用详细详细
export function getApply(cartonApplyId) {
  return request({
    url: '/carton/apply/' + cartonApplyId,
    method: 'get'
  })
}

// 新增纸箱申请领用详细
export function addApply(data) {
  return request({
    url: '/carton/apply',
    method: 'post',
    data: data
  })
}

// 修改纸箱申请领用详细
export function updateApply(data) {
  return request({
    url: '/carton/apply',
    method: 'put',
    data: data
  })
}

// 删除纸箱申请领用详细
export function delApply(cartonApplyId) {
  return request({
    url: '/carton/apply/' + cartonApplyId,
    method: 'delete'
  })
}

// 导出纸箱申请领用详细
export function exportApply(query) {
  return request({
    url: '/carton/apply/export',
    method: 'get',
    params: query
  })
}