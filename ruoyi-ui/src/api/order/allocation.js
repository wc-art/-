import request from '@/utils/request'

// 查询订单分配列表
export function listAllocation(query) {
  return request({
    url: '/system/allocation/list',
    method: 'get',
    params: query
  })
}


export function getListAllocation(query) {
  return request({
    url: '/system/allocation/listId',
    method: 'get',
    params: query
  })
}



// 查询订单分配详细
export function getAllocation(orderAllocationId) {
  return request({
    url: '/system/allocation/' + orderAllocationId,
    method: 'get'
  })
}

// 新增订单分配
export function addAllocation(data) {
  return request({
    url: '/system/allocation',
    method: 'post',
    data: data
  })
}

// 修改订单分配
export function updateAllocation(data) {
  return request({
    url: '/system/allocation',
    method: 'put',
    data: data
  })
}

// 删除订单分配
export function delAllocation(orderAllocationId) {
  return request({
    url: '/system/allocation/' + orderAllocationId,
    method: 'delete'
  })
}

// 导出订单分配
export function exportAllocation(query) {
  return request({
    url: '/system/allocation/export',
    method: 'get',
    params: query
  })
}
