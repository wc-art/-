import request from '@/utils/request'

// 查询能耗信息
export function energyInfo(query) {
  return request({
    method: 'get',
    params: query,
    url: '/view/energy'
  })
}