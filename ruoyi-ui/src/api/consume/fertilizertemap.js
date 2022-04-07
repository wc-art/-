import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/fertilizertemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/fertilizertemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/fertilizertemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addFertilizercon(data) {
  return request({
    url: '/consume/fertilizertemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/fertilizertemcon/username',
    method: 'get',
  })
}

// 查询化肥临时领用列表
export function listFertilizertemap(query) {
  return request({
    url: '/consume/fertilizertemap/list',
    method: 'get',
    params: query
  })
}

// 查询化肥临时领用详细
export function getFertilizertemap(fertilizerApplyTemporaryId) {
  return request({
    url: '/consume/fertilizertemap/' + fertilizerApplyTemporaryId,
    method: 'get'
  })
}

// 新增化肥临时领用
export function addFertilizertemap(data) {
  return request({
    url: '/consume/fertilizertemap',
    method: 'post',
    data: data
  })
}

// 修改化肥临时领用
export function updateFertilizertemap(data) {
  return request({
    url: '/consume/fertilizertemap',
    method: 'put',
    data: data
  })
}

// 删除化肥临时领用
export function delFertilizertemap(fertilizerApplyTemporaryId) {
  return request({
    url: '/consume/fertilizertemap/' + fertilizerApplyTemporaryId,
    method: 'delete'
  })
}

// 导出化肥临时领用
export function exportFertilizertemap(query) {
  return request({
    url: '/consume/fertilizertemap/export',
    method: 'get',
    params: query
  })
}
