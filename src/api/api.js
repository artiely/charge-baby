import fetch from './fetch'

/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
const LOGIN = params => {
  return fetch({url: '/v1/clients/web/admin/login', method: 'post', data: params})
}

const ORDER_LIST = params => {
  return fetch({url: '/v1/orders', method: 'get', params: params})
}

const apiList = {
  LOGIN,
  ORDER_LIST
}

export default apiList
