import request from '@/utils/request'
// 退回
export function back(applyId) {
  return request({
    url: '/consume/cartontemap/back/'+applyId,
    method: 'put',
  })
}
// 更新库存量
export function upAmount(data) {
  return request({
    url: '/consume/cartontemap/amount',
    method: 'put',
    data: data
  })
}
// 更新领用状态
export function upCumStatus(applyId) {
  return request({
    url: '/consume/cartontemap/consu/'+applyId,
    method: 'put',
  })
}
// 增加领用信息
export function addCartoncon(data) {
  return request({
    url: '/consume/cartontemcon',
    method: 'post',
    data: data
  })
}
// 获取领用人名称
export function getUserName() {
  return request({
    url: '/consume/cartontemcon/username',
    method: 'get',
  })
}

// 查询纸箱临时领用列表
export function listCartontemap(query) {
  return request({
    url: '/consume/cartontemap/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱临时领用详细
export function getCartontemap(cartonApplyTemporaryId) {
  return request({
    url: '/consume/cartontemap/' + cartonApplyTemporaryId,
    method: 'get'
  })
}

// 新增纸箱临时领用
export function addCartontemap(data) {
  return request({
    url: '/consume/cartontemap',
    method: 'post',
    data: data
  })
}

// 修改纸箱临时领用
export function updateCartontemap(data) {
  return request({
    url: '/consume/cartontemap',
    method: 'put',
    data: data
  })
}

// 删除纸箱临时领用
export function delCartontemap(cartonApplyTemporaryId) {
  return request({
    url: '/consume/cartontemap/' + cartonApplyTemporaryId,
    method: 'delete'
  })
}

// 导出纸箱临时领用
export function exportCartontemap(query) {
  return request({
    url: '/consume/cartontemap/export',
    method: 'get',
    params: query
  })
}
