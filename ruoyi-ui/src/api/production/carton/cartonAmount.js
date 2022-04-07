import request from '@/utils/request'

// 查询纸箱类型列表
export function listType(query) {
  return request({
    url: '/system/cartonType/list',
    method: 'get',
    params: query
  })
}


// 查询纸箱量列表
export function listCartonAmount(query) {
  return request({
    url: '/system/cartonAmount/list',
    method: 'get',
    params: query
  })
}

// 查询纸箱量详细
export function getCartonAmount(cartonAmountId) {
  return request({
    url: '/system/cartonAmount/' + cartonAmountId,
    method: 'get'
  })
}

// 新增纸箱量
export function addCartonAmount(data) {
  return request({
    url: '/system/cartonAmount',
    method: 'post',
    data: data
  })
}

// 修改纸箱量
export function updateCartonAmount(data) {
  return request({
    url: '/system/cartonAmount',
    method: 'put',
    data: data
  })
}

// 删除纸箱量
export function delCartonAmount(cartonAmountId) {
  return request({
    url: '/system/cartonAmount/' + cartonAmountId,
    method: 'delete'
  })
}

// 导出纸箱量
export function exportCartonAmount(query) {
  return request({
    url: '/system/cartonAmount/export',
    method: 'get',
    params: query
  })
}
