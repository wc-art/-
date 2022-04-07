import request from '@/utils/request'

// 查询蔬菜类型列表
export function listCropType(query) {
  return request({
    url: '/seed/type/list',
    method: 'get',
    params: query
  })
}

// 导出所有蔬菜类型
export function vegetableType() {
  return request({
    url:'/seed/type/all',
    method:'get'
  })
}

// 查询蔬菜类型详细
export function getCropType(cropTypeId) {
  return request({
    url: '/seed/type/' + cropTypeId,
    method: 'get'
  })
}

// 新增蔬菜类型
export function addCropType(data) {
  return request({
    url: '/seed/type',
    method: 'post',
    data: data
  })
}

// 修改蔬菜类型
export function updateCropType(data) {
  return request({
    url: '/seed/type',
    method: 'put',
    data: data
  })
}

// 删除蔬菜类型
export function delCropType(cropTypeId) {
  return request({
    url: '/seed/type/' + cropTypeId,
    method: 'delete'
  })
}

// 导出蔬菜类型
export function exportCropType(query) {
  return request({
    url: '/seed/type/export',
    method: 'get',
    params: query
  })
}
