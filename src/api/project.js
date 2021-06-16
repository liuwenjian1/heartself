import request from '@/utils/request'

export function countProjectByUser() {
  return request({
    url: '/api/countProjectByUser',
    method: 'get'
  })
}

export function countProjectByMonth() {
  return request({
    url: '/api/countProjectByMonth',
    method: 'get'
  })
}

export function getProjectList() {
  return request({
    url: '/api/getProjectList',
    method: 'get'
  })
}
