import request from '@/utils/request'

// 查询嫁接签申请领用详细列表
export function listApply(query) {
  return request({
    url: '/graftinglabel/apply/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签申请领用详细详细
export function getApply(graftinglabelApplyId) {
  return request({
    url: '/graftinglabel/apply/' + graftinglabelApplyId,
    method: 'get'
  })
}

// 新增嫁接签申请领用详细
export function addApply(data) {
  return request({
    url: '/graftinglabel/apply',
    method: 'post',
    data: data
  })
}

// 修改嫁接签申请领用详细
export function updateApply(data) {
  return request({
    url: '/graftinglabel/apply',
    method: 'put',
    data: data
  })
}

// 删除嫁接签申请领用详细
export function delApply(graftinglabelApplyId) {
  return request({
    url: '/graftinglabel/apply/' + graftinglabelApplyId,
    method: 'delete'
  })
}

// 导出嫁接签申请领用详细
export function exportApply(query) {
  return request({
    url: '/graftinglabel/apply/export',
    method: 'get',
    params: query
  })
}