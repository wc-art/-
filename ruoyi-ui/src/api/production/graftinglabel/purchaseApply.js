import request from '@/utils/request'

// 查询嫁接签购买详细列表
export function listGraftinglabelApply(query) {
  return request({
    url: '/system/graftinglabelApply/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签购买详细详细
export function getGraftinglabelApply(graftinglabelPurchaseApplyId) {
  return request({
    url: '/system/graftinglabelApply/' + graftinglabelPurchaseApplyId,
    method: 'get'
  })
}

// 新增嫁接签购买详细
export function addGraftinglabelApply(data) {
  return request({
    url: '/system/graftinglabelApply',
    method: 'post',
    data: data
  })
}

// 修改嫁接签购买详细
export function updateGraftinglabelApply(data) {
  return request({
    url: '/system/graftinglabelApply',
    method: 'put',
    data: data
  })
}

// 删除嫁接签购买详细
export function delGraftinglabelApply(graftinglabelPurchaseApplyId) {
  return request({
    url: '/system/graftinglabelApply/' + graftinglabelPurchaseApplyId,
    method: 'delete'
  })
}

// 导出嫁接签购买详细
export function exportGraftinglabelApply(query) {
  return request({
    url: '/system/graftinglabelApply/export',
    method: 'get',
    params: query
  })
}