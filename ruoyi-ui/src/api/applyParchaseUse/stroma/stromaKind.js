import request from '@/utils/request'

// 查询基质种(草炭,蛭石,珍珠岩, 商品基质)列表
export function listStromaKind(query) {
  return request({
    url: '/production/stromaKind/list',
    method: 'get',
    params: query
  })
}

// 查询基质种(草炭,蛭石,珍珠岩, 商品基质)详细
export function getStromaKind(stromaKindId) {
  return request({
    url: '/production/stromaKind/' + stromaKindId,
    method: 'get'
  })
}
// 导出所有基质种
export function stromaKind() {
  return request({
    url:'/production/stromaKind/list',
    method:'get',
  })
}

// 新增基质种(草炭,蛭石,珍珠岩, 商品基质)
export function addStromaKind(data) {
  return request({
    url: '/production/stromaKind',
    method: 'post',
    data: data
  })
}

// 修改基质种(草炭,蛭石,珍珠岩, 商品基质)
export function updateStromaKind(data) {
  return request({
    url: '/production/stromaKind',
    method: 'put',
    data: data
  })
}

// 删除基质种(草炭,蛭石,珍珠岩, 商品基质)
export function delStromaKind(stromaKindId) {
  return request({
    url: '/production/stromaKind/' + stromaKindId,
    method: 'delete'
  })
}

// 导出基质种(草炭,蛭石,珍珠岩, 商品基质)
export function exportStromaKind(query) {
  return request({
    url: '/production/stromaKind/export',
    method: 'get',
    params: query
  })
}
