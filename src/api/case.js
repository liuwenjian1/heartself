import request from '@/utils/request'

export function countCaseByType() {
  return request({
    url: '/api/countCaseByType',
    method: 'get'
  })
}

export function countCaseByMonth() {
  return request({
    url: '/api/countCaseByMonth',
    method: 'get'
  })
}

export function getCaseList() {
  return request({
    url: '/api/queryCase',
    method: 'get'
  })
}
