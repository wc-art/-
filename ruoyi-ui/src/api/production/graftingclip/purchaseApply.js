import request from '@/utils/request'

// 查询嫁接夹购买详细列表
export function listGraftingclipApply(query) {
  return request({
    url: '/system/graftingclipApply/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹购买详细详细
export function getGraftingclipApply(graftingclipPurchaseApplyId) {
  return request({
    url: '/system/graftingclipApply/' + graftingclipPurchaseApplyId,
    method: 'get'
  })
}

// 新增嫁接夹购买详细
export function addGraftingclipApply(data) {
  return request({
    url: '/system/graftingclipApply',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹购买详细
export function updateGraftingclipApply(data) {
  return request({
    url: '/system/graftingclipApply',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹购买详细
export function delGraftingclipApply(graftingclipPurchaseApplyId) {
  return request({
    url: '/system/graftingclipApply/' + graftingclipPurchaseApplyId,
    method: 'delete'
  })
}

// 导出嫁接夹购买详细
export function exportGraftingclipApply(query) {
  return request({
    url: '/system/graftingclipApply/export',
    method: 'get',
    params: query
  })
}