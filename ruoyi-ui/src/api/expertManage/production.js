import request from '@/utils/request'

const from = "?from=expert_production"

// 查询专家类表列表
export function listProduction(query) {
  return request({
    url: '/system/production/list',
    method: 'get',
    params: query
  })
}

// 查询专家类表详细
export function getProduction(expertdbId) {
  return request({
    url: '/system/production/' + expertdbId,
    method: 'get'
  })
}

// 新增专家类表
export function addProduction(data) {
  return request({
    url: '/system/production',
    method: 'post',
    data: data
  })
}

// 修改专家类表
export function updateProduction(data) {
  return request({
    url: '/system/production',
    method: 'put',
    data: data
  })
}

// 删除专家类表
export function delProduction(expertdbId) {
  return request({
    url: '/system/production/' + expertdbId,
    method: 'delete'
  })
}


// 获取图片
export function getImgProduction(expertdbId) {
  return request({
    url: '/expert/file/viewpicture' + from + `&id=${expertdbId}`,
    method: 'get'
  })
}
