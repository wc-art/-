import request from '@/utils/request'

// 查询嫁接签临时申请领用详细列表
export function listApplyTemporary(query) {
  return request({
    url: '/graftinglabel/applyTemporary/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签临时申请领用详细详细
export function getApplyTemporary(graftinglabelApplyTemporaryId) {
  return request({
    url: '/graftinglabel/applyTemporary/' + graftinglabelApplyTemporaryId,
    method: 'get'
  })
}

// 新增嫁接签临时申请领用详细
export function addApplyTemporary(data) {
  return request({
    url: '/graftinglabel/applyTemporary',
    method: 'post',
    data: data
  })
}

// 修改嫁接签临时申请领用详细
export function updateApplyTemporary(data) {
  return request({
    url: '/graftinglabel/applyTemporary',
    method: 'put',
    data: data
  })
}

// 删除嫁接签临时申请领用详细
export function delApplyTemporary(graftinglabelApplyTemporaryId) {
  return request({
    url: '/graftinglabel/applyTemporary/' + graftinglabelApplyTemporaryId,
    method: 'delete'
  })
}

// 导出嫁接签临时申请领用详细
export function exportApplyTemporary(query) {
  return request({
    url: '/graftinglabel/applyTemporary/export',
    method: 'get',
    params: query
  })
}