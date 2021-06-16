import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/userLoginVue',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/userInfoVue',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
