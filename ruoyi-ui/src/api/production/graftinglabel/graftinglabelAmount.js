import request from '@/utils/request'

// 查询嫁接签类型列表
export function listGraftinglabelType(query) {
  return request({
    url: '/production/graftinglabelType/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签量列表
export function listGraftinglabelAmount(query) {
  return request({
    url: '/production/graftinglabelAmount/list',
    method: 'get',
    params: query
  })
}

// 查询嫁接签量详细
export function getGraftinglabelAmount(graftinglabelAmountId) {
  return request({
    url: '/production/graftinglabelAmount/' + graftinglabelAmountId,
    method: 'get'
  })
}

// 新增嫁接签量
export function addGraftinglabelAmount(data) {
  return request({
    url: '/production/graftinglabelAmount',
    method: 'post',
    data: data
  })
}

// 修改嫁接签量
export function updateGraftinglabelAmount(data) {
  return request({
    url: '/production/graftinglabelAmount',
    method: 'put',
    data: data
  })
}

// 删除嫁接签量
export function delGraftinglabelAmount(graftinglabelAmountId) {
  return request({
    url: '/production/graftinglabelAmount/' + graftinglabelAmountId,
    method: 'delete'
  })
}

// 导出嫁接签量
export function exportGraftinglabelAmount(query) {
  return request({
    url: '/production/graftinglabelAmount/export',
    method: 'get',
    params: query
  })
}
