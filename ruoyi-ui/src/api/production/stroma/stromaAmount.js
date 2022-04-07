import request from '@/utils/request'

// 查询基质种列表
export function listStromaKind(query) {
  return request({
    url: '/system/stromaKind/list',
    method: 'get',
    params: query
  })
}

// 查询基质类型列表
export function listStromaType(query) {
  return request({
    url: '/system/stromaType/list',
    method: 'get',
    params: query
  })
}

// 查询基质量列表
export function listStromaAmount(query) {
  return request({
    url: '/production/stromaAmount/list',
    method: 'get',
    params: query
  })
}

// 查询基质量详细
export function getStromaAmount(stromaAmountId) {
  return request({
    url: '/production/stromaAmount/' + stromaAmountId,
    method: 'get'
  })
}

// 新增基质量
export function addStromaAmount(data) {
  return request({
    url: '/production/stromaAmount',
    method: 'post',
    data: data
  })
}

// 修改基质量
export function updateStromaAmount(data) {
  return request({
    url: '/production/stromaAmount',
    method: 'put',
    data: data
  })
}

// 删除基质量
export function delStromaAmount(stromaAmountId) {
  return request({
    url: '/production/stromaAmount/' + stromaAmountId,
    method: 'delete'
  })
}

// 导出基质量
export function exportStromaAmount(query) {
  return request({
    url: '/production/stromaAmount/export',
    method: 'get',
    params: query
  })
}
