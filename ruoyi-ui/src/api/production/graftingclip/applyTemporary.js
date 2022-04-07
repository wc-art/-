import request from '@/utils/request'

// 查询嫁接夹临时申请领用详细列表
export function listApplyTemporary(query) {
  return request({
    url: '/graftingclip/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹临时申请领用详细详细
export function getApplyTemporary(graftingclipApplyTemporaryId) {
  return request({
    url: '/graftingclip/applyTemporary/' + graftingclipApplyTemporaryId,
    method: 'get'
  })
}

// 新增嫁接夹临时申请领用详细
export function addApplyTemporary(data) {
  return request({
    url: '/graftingclip/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹临时申请领用详细
export function updateApplyTemporary(data) {
  return request({
    url: '/graftingclip/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹临时申请领用详细
export function delApplyTemporary(graftingclipApplyTemporaryId) {
  return request({
    url: '/graftingclip/applyTemporary/' + graftingclipApplyTemporaryId,
    method: 'delete'
  })
}

// 导出嫁接夹临时申请领用详细
export function exportApplyTemporary(query) {
  return request({
    url: '/graftingclip/applyTemporary/export',
    method: 'get',
    params: query
  })
}