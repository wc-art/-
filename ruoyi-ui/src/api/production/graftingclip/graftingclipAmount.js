import request from '@/utils/request'

// 查询嫁接夹类型列表
export function listGraftingclipType(query) {
  return request({
    url: '/production/graftingclipType/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹量列表
export function listGraftingclipAmount(query) {
  return request({
    url: '/production/graftingclipAmount/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接夹量详细
export function getGraftingclipAmount(graftingclipAmountId) {
  return request({
    url: '/production/graftingclipAmount/' + graftingclipAmountId,
    method: 'get'
  })
}

// 新增嫁接夹量
export function addGraftingclipAmount(data) {
  return request({
    url: '/production/graftingclipAmount',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹量
export function updateGraftingclipAmount(data) {
  return request({
    url: '/production/graftingclipAmount',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹量
export function delGraftingclipAmount(graftingclipAmountId) {
  return request({
    url: '/production/graftingclipAmount/' + graftingclipAmountId,
    method: 'delete'
  })
}

// 导出嫁接夹量
export function exportGraftingclipAmount(query) {
  return request({
    url: '/production/graftingclipAmount/export',
    method: 'get',
    params: query
  })
}
