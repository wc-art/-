import request from '@/utils/request'

// 查询嫁接夹申请领用详细列表
export function listApply(query) {
  return request({
    url: '/graftingclip/apply/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹申请领用详细详细
export function getApply(graftingclipApplyId) {
  return request({
    url: '/graftingclip/apply/' + graftingclipApplyId,
    method: 'get'
  })
}

// 新增嫁接夹申请领用详细
export function addApply(data) {
  return request({
    url: '/graftingclip/apply',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹申请领用详细
export function updateApply(data) {
  return request({
    url: '/graftingclip/apply',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹申请领用详细
export function delApply(graftingclipApplyId) {
  return request({
    url: '/graftingclip/apply/' + graftingclipApplyId,
    method: 'delete'
  })
}

// 导出嫁接夹申请领用详细
export function exportApply(query) {
  return request({
    url: '/graftingclip/apply/export',
    method: 'get',
    params: query
  })
}