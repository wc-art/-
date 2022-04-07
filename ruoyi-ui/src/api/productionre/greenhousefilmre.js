import request from '@/utils/request'

// 查询棚膜退回列表
export function listGreenhousefilmre(query) {
  return request({
    url: '/production/greenhousefilmre/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜退回详细
export function getGreenhousefilmre(greenhousefilmReturnId) {
  return request({
    url: '/production/greenhousefilmre/' + greenhousefilmReturnId,
    method: 'get'
  })
}
// 获取嫁接签类型
export function getType() {
  return request({
    url: '/production/greenhousefilmre/type',
    method: 'get',
  })
}
// 获取棚膜厚度下拉框
export function getThickness(greenhousefilmTypeId) {
  return request({
    url: '/production/greenhousefilmre/thickness/'+ greenhousefilmTypeId,
    method: 'get',
  })
}
// 获取公司下拉框
export function getOriginCompany(greenhousefilmTypeId) {
  return request({
    url: '/production/greenhousefilmre/origincompany/'+ greenhousefilmTypeId,
    method: 'get',
  })
}
// 获取用户名称
export function getUserName() {
  return request({
    url: '/production/greenhousefilmre/username',
    method: 'get',
  })
}
// 新增棚膜退回
export function addGreenhousefilmre(data) {
  return request({
    url: '/production/greenhousefilmre',
    method: 'post',
    data: data
  })
}

// 修改棚膜退回
export function updateGreenhousefilmre(data) {
  return request({
    url: '/production/greenhousefilmre',
    method: 'put',
    data: data
  })
}

// 删除棚膜退回
export function delGreenhousefilmre(greenhousefilmReturnId) {
  return request({
    url: '/production/greenhousefilmre/' + greenhousefilmReturnId,
    method: 'delete'
  })
}

// 导出棚膜退回
export function exportGreenhousefilmre(query) {
  return request({
    url: '/production/greenhousefilmre/export',
    method: 'get',
    params: query
  })
}
