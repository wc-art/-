import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/greenhousefilmtemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/greenhousefilmtemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/greenhousefilmtemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addGreenhousefilmcon(data) {
  return request({
    url: '/consume/greenhousefilmtemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/greenhousefilmtemcon/username',
    method: 'get',
  })
}

// 查询棚膜临时领用列表
export function listGreenhousefilmtemap(query) {
  return request({
    url: '/consume/greenhousefilmtemap/list',
    method: 'get',
    params: query
  })
}

// 查询棚膜临时领用详细
export function getGreenhousefilmtemap(greenhousefilmApplyTemporaryId) {
  return request({
    url: '/consume/greenhousefilmtemap/' + greenhousefilmApplyTemporaryId,
    method: 'get'
  })
}

// 新增棚膜临时领用
export function addGreenhousefilmtemap(data) {
  return request({
    url: '/consume/greenhousefilmtemap',
    method: 'post',
    data: data
  })
}

// 修改棚膜临时领用
export function updateGreenhousefilmtemap(data) {
  return request({
    url: '/consume/greenhousefilmtemap',
    method: 'put',
    data: data
  })
}

// 删除棚膜临时领用
export function delGreenhousefilmtemap(greenhousefilmApplyTemporaryId) {
  return request({
    url: '/consume/greenhousefilmtemap/' + greenhousefilmApplyTemporaryId,
    method: 'delete'
  })
}

// 导出棚膜临时领用
export function exportGreenhousefilmtemap(query) {
  return request({
    url: '/consume/greenhousefilmtemap/export',
    method: 'get',
    params: query
  })
}
