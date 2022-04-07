import request from '@/utils/request'

// 查询基质类型()列表
export function listStromaType(query) {
  return request({
    url: '/production/stromaType/list',
    method: 'get',
    params: query
  })
}
// 导出所有基质类型
export function stromaType() {
  return request({
    url:'/production/stromaType/list',
    method:'get',
  })
}

// 查询基质类型()详细
export function getStromaType(stromaTypeId) {
  return request({
    url: '/production/stromaType/' + stromaTypeId,
    method: 'get'
  })
}

// 新增基质类型()
export function addStromaType(data) {
  return request({
    url: '/production/stromaType',
    method: 'post',
    data: data
  })
}

// 修改基质类型()
export function updateStromaType(data) {
  return request({
    url: '/production/stromaType',
    method: 'put',
    data: data
  })
}

// 删除基质类型()
export function delStromaType(stromaTypeId) {
  return request({
    url: '/production/stromaType/' + stromaTypeId,
    method: 'delete'
  })
}

// 导出基质类型()
export function exportStromaType(query) {
  return request({
    url: '/production/stromaType/export',
    method: 'get',
    params: query
  })
}
