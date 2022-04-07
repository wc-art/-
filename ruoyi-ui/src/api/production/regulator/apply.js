import request from '@/utils/request'

// 查询调节剂申请列表
export function listApply(query) {
  return request({
    url: '/regulator/apply/list',
    method: 'get',
    params: query
  })
}

// 查询调节剂申请详细
export function getApply(regulatorApplyId) {
  return request({
    url: '/regulator/apply/' + regulatorApplyId,
    method: 'get'
  })
}

// 新增调节剂申请
export function addApply(data) {
  return request({
    url: '/regulator/apply',
    method: 'post',
    data: data
  })
}

// 修改调节剂申请
export function updateApply(data) {
  return request({
    url: '/regulator/apply',
    method: 'put',
    data: data
  })
}

// 删除调节剂申请
export function delApply(regulatorApplyId) {
  return request({
    url: '/regulator/apply/' + regulatorApplyId,
    method: 'delete'
  })
}

// 导出调节剂申请
export function exportApply(query) {
  return request({
    url: '/regulator/apply/export',
    method: 'get',
    params: query
  })
}