import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/greenhousefilmap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/greenhousefilmap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/greenhousefilmap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGreenhousefilmcon(data) {
  return request({
    url: '/consume/greenhousefilmcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/greenhousefilmcon/username',
    method: 'get',
  })
}

// 查询棚膜领用列表
export function listGreenhousefilmap(query) {
  return request({
    url: '/consume/greenhousefilmap/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜领用详细
export function getGreenhousefilmap(greenhousefilmApplyId) {
  return request({
    url: '/consume/greenhousefilmap/' + greenhousefilmApplyId,
    method: 'get'
  })
}

// 新增棚膜领用
export function addGreenhousefilmap(data) {
  return request({
    url: '/consume/greenhousefilmap',
    method: 'post',
    data: data
  })
}

// 修改棚膜领用
export function updateGreenhousefilmap(data) {
  return request({
    url: '/consume/greenhousefilmap',
    method: 'put',
    data: data
  })
}

// 删除棚膜领用
export function delGreenhousefilmap(greenhousefilmApplyId) {
  return request({
    url: '/consume/greenhousefilmap/' + greenhousefilmApplyId,
    method: 'delete'
  })
}

// 导出棚膜领用
export function exportGreenhousefilmap(query) {
  return request({
    url: '/consume/greenhousefilmap/export',
    method: 'get',
    params: query
  })
}
