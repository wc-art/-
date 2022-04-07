import request from '@/utils/request'

const from = '?from=expert_pest'

// 查询专家类表列表
// 查询病虫害防治列表
export function listPest(query) {
  return request({
    url: '/system/control/list',
    method: 'get',
    params: query
  })
}

// 查询病虫害防治详细
export function getPest(expertdbId) {
  return request({
    url: '/system/control/' + expertdbId,
    method: 'get'
  })
}

// 新增病虫害防治
export function addPest(data) {
  return request({
    url: '/system/control',
    method: 'post',
    data: data
  })
}

// 修改病虫害防治
export function updatePest(data) {
  return request({
    url: '/system/control',
    method: 'put',
    data: data
  })
}

// 删除病虫害防治
export function delPest(expertdbId) {
  return request({
    url: '/system/control/' + expertdbId,
    method: 'delete'
  })
}


// 获取图片
export function getImgPest(expertdbId) {
  return request({
    url: '/expert/file/viewpicture' + from + `&id=${expertdbId}`,
    method: 'get'
  })
}
