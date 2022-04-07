import request from '@/utils/request'

// 查询能耗信息列表
export function listConsumption(query) {
  return request({
    url: '/energy/consumption/list',
    method: 'get',
    params: query
  })
}

// 查询能耗信息详细
export function getConsumption(energyConsumptionId) {
  return request({
    url: '/energy/consumption/' + energyConsumptionId,
    method: 'get'
  })
}

// 新增能耗信息
export function addConsumption(data) {
  return request({
    url: '/energy/consumption',
    method: 'post',
    data: data
  })
}

// 修改能耗信息
export function updateConsumption(data) {
  return request({
    url: '/energy/consumption',
    method: 'put',
    data: data
  })
}

// 删除能耗信息
export function delConsumption(energyConsumptionId) {
  return request({
    url: '/energy/consumption/' + energyConsumptionId,
    method: 'delete'
  })
}

// 导出能耗信息
export function exportConsumption(query) {
  return request({
    url: '/energy/consumption/export',
    method: 'get',
    params: query
  })
}