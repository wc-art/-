import request from '@/utils/request'

// 查询查看临时领用信息列表
export function listGraftinglabeltemcon(query) {
  return request({
    url: '/consume/graftinglabeltemcon/list',
    method: 'get',
    params: query
  })
}

// 查询查看临时领用信息详细
export function getGraftinglabeltemcon(graftinglabelConsumeTemporaryId) {
  return request({
    url: '/consume/graftinglabeltemcon/' + graftinglabelConsumeTemporaryId,
    method: 'get'
  })
}

// 新增查看临时领用信息
export function addGraftinglabeltemcon(data) {
  return request({
    url: '/consume/graftinglabeltemcon',
    method: 'post',
    data: data
  })
}

// 修改查看临时领用信息
export function updateGraftinglabeltemcon(data) {
  return request({
    url: '/consume/graftinglabeltemcon',
    method: 'put',
    data: data
  })
}

// 删除查看临时领用信息
export function delGraftinglabeltemcon(graftinglabelConsumeTemporaryId) {
  return request({
    url: '/consume/graftinglabeltemcon/' + graftinglabelConsumeTemporaryId,
    method: 'delete'
  })
}

// 导出查看临时领用信息
export function exportGraftinglabeltemcon(query) {
  return request({
    url: '/consume/graftinglabeltemcon/export',
    method: 'get',
    params: query
  })
}
