import request from '@/utils/request'

const from = "?from=expert_quality"

// 查询种苗质量标准列表
export function listSeedling(query) {
  return request({
    url: '/system/quality/list',
    method: 'get',
    params: query
  })
}

// 查询种苗质量标准详细
export function getSeedling(expertdbId) {
  return request({
    url: '/system/quality/' + expertdbId,
    method: 'get'
  })
}

// 新增种苗质量标准
export function addSeedling(data) {
  return request({
    url: '/system/quality',
    method: 'post',
    data: data
  })
}

// 修改种苗质量标准
export function updateSeedling(data) {
  return request({
    url: '/system/quality',
    method: 'put',
    data: data
  })
}

// 删除种苗质量标准
export function delSeedling(expertdbId) {
  return request({
    url: '/system/quality/' + expertdbId,
    method: 'delete'
  })
}

// 获取图片
export function getImgSeedling(expertdbId) {
  return request({
    url: '/expert/file/viewpicture' + from + `&id=${expertdbId}`,
    method: 'get'
  })
}
