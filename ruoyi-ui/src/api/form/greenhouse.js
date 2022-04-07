import request from '@/utils/request'

// 查询VIEW列表
export function listGreenhouse(query) {
  return request({
    url: '/system/statisticGreenhouse/list',
    method: 'get',
    params: query
  })
}

// 查询VIEW详细
export function getGreenhouse(areaName) {
  return request({
    url: '/system/greenhouse/' + areaName,
    method: 'get'
  })
}

// 新增VIEW
export function addGreenhouse(data) {
  return request({
    url: '/system/greenhouse',
    method: 'post',
    data: data
  })
}

// 修改VIEW
export function updateGreenhouse(data) {
  return request({
    url: '/system/greenhouse',
    method: 'put',
    data: data
  })
}

// 删除VIEW
export function delGreenhouse(areaName) {
  return request({
    url: '/system/greenhouse/' + areaName,
    method: 'delete'
  })
}

// 导出VIEW
export function exportGreenhouse(query) {
  return request({
    url: '/system/statisticGreenhouse/export',
    method: 'get',
    params: query
  })
}
