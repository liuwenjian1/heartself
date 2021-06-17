import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/advice/insert',
    method: 'post',
    data
  })
}
