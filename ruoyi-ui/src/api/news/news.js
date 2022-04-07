import request from '@/utils/request'

// 查询消息提示列表
export function listNews(query) {
  return request({
    url: '/system/news/list',
    method: 'get',
    params: query
  })
}

// 查询消息提示详细
export function getNews(newsId) {
  return request({
    url: '/system/news/' + newsId,
    method: 'get'
  })
}

// 新增消息提示
export function addNews(data) {
  return request({
    url: '/system/news',
    method: 'post',
    data: data
  })
}

// 修改消息提示
export function updateNews(data) {
  return request({
    url: '/system/news',
    method: 'put',
    data: data
  })
}

// 删除消息提示
export function delNews(data) {
  return request({
    url: '/system/news',
    method: 'delete',
    data: data
  })
}



// 删除一条消息提示
export function delNews1(data) {
  return request({
    url: '/system/news/delete1',
    method: 'delete',
    data: data
  })
}

// 导出消息提示
export function exportNews(query) {
  return request({
    url: '/system/news/export',
    method: 'get',
    params: query
  })
}
