import request from '@/utils/request'

// 查询嫁接签类型列表
export function listGraftinglabelType(query) {
  return request({
    url: '/production/graftinglabelType/list',
    method: 'get',
    params: query
  })
}
// 全部嫁接夹类型
export function graftinglabelsType() {
  return request({
    url: '/production/graftinglabelType/list',
    method: 'get',
  })
}
// 查询嫁接签类型详细
export function getGraftinglabelType(graftinglabelTypeId) {
  return request({
    url: '/production/graftinglabelType/' + graftinglabelTypeId,
    method: 'get'
  })
}

// 新增嫁接签类型
export function addGraftinglabelType(data) {
  return request({
    url: '/production/graftinglabelType',
    method: 'post',
    data: data
  })
}

// 修改嫁接签类型
export function updateGraftinglabelType(data) {
  return request({
    url: '/production/graftinglabelType',
    method: 'put',
    data: data
  })
}

// 删除嫁接签类型
export function delGraftinglabelType(graftinglabelTypeId) {
  return request({
    url: '/production/graftinglabelType/' + graftinglabelTypeId,
    method: 'delete'
  })
}

// 导出嫁接签类型
export function exportGraftinglabelType(query) {
  return request({
    url: '/production/graftinglabelType/export',
    method: 'get',
    params: query
  })
}
