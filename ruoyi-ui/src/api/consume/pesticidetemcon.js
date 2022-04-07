import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listPesticidetemcon(query) {
  return request({
    url: '/consume/pesticidetemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getPesticidetemcon(pesticideConsumeTemporaryId) {
  return request({
    url: '/consume/pesticidetemcon/' + pesticideConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addPesticidetemcon(data) {
  return request({
    url: '/consume/pesticidetemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updatePesticidetemcon(data) {
  return request({
    url: '/consume/pesticidetemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delPesticidetemcon(pesticideConsumeTemporaryId) {
  return request({
    url: '/consume/pesticidetemcon/' + pesticideConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportPesticidetemcon(query) {
  return request({
    url: '/consume/pesticidetemcon/export',
    method: 'get',
    params: query
  })
}