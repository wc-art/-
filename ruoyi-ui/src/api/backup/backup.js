import request from '@/utils/request'

// 开始备份sql文件
export function startBackup() {
  return request({
    url: '/view/sql',
    method: 'get'
  })
}

// 询问是否备份成功
export function isSuccess() {
  return request({
    url: '/view/selectsqlfile',
    method: 'get'
  })
}