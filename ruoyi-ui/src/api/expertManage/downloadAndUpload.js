import request from "@/utils/request"

export function deleteImage(query) {
  return request({
    method: 'get',
    url: '/expert/image/delete',
    params: query
  })
}