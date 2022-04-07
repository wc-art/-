import request from '@/utils/request'

// 查询VIEW列表
export function orderview(query) {
    return request({
      url: '/orderview',
      method: 'get',
      params: query
    })
  }
