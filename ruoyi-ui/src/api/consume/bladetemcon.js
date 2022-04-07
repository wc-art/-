import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listBladetemcon(query) {
  return request({
    url: '/consume/bladetemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getBladetemcon(bladeConsumeTemporaryId) {
  return request({
    url: '/consume/bladetemcon/' + bladeConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addBladetemcon(data) {
  return request({
    url: '/consume/bladetemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateBladetemcon(data) {
  return request({
    url: '/consume/bladetemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delBladetemcon(bladeConsumeTemporaryId) {
  return request({
    url: '/consume/bladetemcon/' + bladeConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportBladetemcon(query) {
  return request({
    url: '/consume/bladetemcon/export',
    method: 'get',
    params: query
  })
}