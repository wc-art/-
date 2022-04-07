import request from '@/utils/request'

// 查询农药名称列表
export function listPesticideName(query) {
  return request({
    url: '/production/pesticideName/list',
    method: 'get',
    params: query
  })
}

// 查询农药名称详细
export function getPesticideName(pesticideNameId) {
  return request({
    url: '/production/pesticideName/' + pesticideNameId,
    method: 'get'
  })
}

// 新增农药名称
export function addPesticideName(data) {
  return request({
    url: '/production/pesticideName',
    method: 'post',
    data: data
  })
}

// 修改农药名称
export function updatePesticideName(data) {
  return request({
    url: '/production/pesticideName',
    method: 'put',
    data: data
  })
}

// 删除农药名称
export function delPesticideName(pesticideNameId) {
  return request({
    url: '/production/pesticideName/' + pesticideNameId,
    method: 'delete'
  })
}

// 导出农药名称
export function exportPesticideName(query) {
  return request({
    url: '/production/pesticideName/export',
    method: 'get',
    params: query
  })
}