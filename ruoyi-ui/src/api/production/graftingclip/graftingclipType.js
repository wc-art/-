import request from '@/utils/request'

// 查询嫁接夹类型列表
export function listGraftingclipType(query) {
  return request({
    url: '/production/graftingclipType/list',
    method: 'get',
    params: query
  })
}

// 全部嫁接夹类型
export function graftingclipsType() {
  return request({
    url: '/production/graftingclipType/list',
    method: 'get',
  })
}

// 查询嫁接夹类型详细
export function getGraftingclipType(graftingclipTypeId) {
  return request({
    url: '/production/graftingclipType/' + graftingclipTypeId,
    method: 'get'
  })
}

// 新增嫁接夹类型
export function addGraftingclipType(data) {
  return request({
    url: '/production/graftingclipType',
    method: 'post',
    data: data
  })
}

// 修改嫁接夹类型
export function updateGraftingclipType(data) {
  return request({
    url: '/production/graftingclipType',
    method: 'put',
    data: data
  })
}

// 删除嫁接夹类型
export function delGraftingclipType(graftingclipTypeId) {
  return request({
    url: '/production/graftingclipType/' + graftingclipTypeId,
    method: 'delete'
  })
}

// 导出嫁接夹类型
export function exportGraftingclipType(query) {
  return request({
    url: '/production/graftingclipType/export',
    method: 'get',
    params: query
  })
}
