import request from '@/utils/request'

// 查询生产资料订单数据
export function production(data) {
  return request({
    url: '/view/ProductionsCharts',
    method: 'post',
    data
  })
}