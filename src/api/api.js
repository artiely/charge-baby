import fetch from './fetch'

/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
const LOGIN = params => {
  return fetch({
    url: '/v1/clients/web/admin/login',
    method: 'post',
    data: params
  })
}

const ORDER_LIST = params => {
  return fetch({ url: '/v1/orders', method: 'get', params: params })
}

const STORE_LIST = params => {
  return fetch({ url: '/v1/stores', method: 'get', params: params })
}

const BOX_LIST = params => {
  return fetch({ url: '/v1/boxes', method: 'get', params: params })
}

const CHARGE_LIST = params => {
  return fetch({ url: '/v1/chargers', method: 'get', params: params })
}

const BOXTYPE_LIST = params => {
  return fetch({ url: '/v1/boxtypes', method: 'get', params: params })
}

const MEMBER_LIST = params => {
  return fetch({ url: '/v1/members', method: 'get', params: params })
}

const DEPOSITLOG_LIST = params => {
  return fetch({ url: '/v1/depositlogs', method: 'get', params: params })
}

const SETTING_LIST = params => {
  return fetch({ url: '/v1/settings', method: 'get', params: params })
}

const USER_INFO = params => {
  return fetch({ url: '/v1/user/profile', method: 'get', params: params })
}

const BOX_QRCODE = params => {
  return fetch({ url: '/v1/boxes/qrcode', method: 'get', params: params })
}

const BOX_DOWNLOAD_IMG = params => {
  return fetch({ url: '/v1/boxes/downloadimg', method: 'get', params: params })
}

const ORDER_PUT_POST = params => {
  if (!params.id) {
    return fetch({ url: `/v1/stores/`, method: 'post', data: params })
  }
  return fetch({ url: `/v1/stores/${params.id}`, method: 'put', data: params })
}

const BOX_PUT_POST = params => {
  if (!params.id) {
    return fetch({ url: `/v1/boxes/`, method: 'post', data: params })
  }
  return fetch({ url: `/v1/boxes/${params.id}`, method: 'put', data: params })
}

const BOXTYPE_PUT_POST = params => {
  if (!params.id) {
    return fetch({ url: `/v1/boxtypes/`, method: 'post', data: params })
  }
  return fetch({ url: `/v1/boxtypes/${params.id}`, method: 'put', data: params })
}

const apiList = {
  LOGIN,
  ORDER_LIST,
  STORE_LIST,
  BOX_LIST,
  CHARGE_LIST,
  BOXTYPE_LIST,
  MEMBER_LIST,
  DEPOSITLOG_LIST,
  SETTING_LIST,
  ORDER_PUT_POST,
  BOX_PUT_POST,
  BOXTYPE_PUT_POST,
  USER_INFO,
  BOX_QRCODE,
  BOX_DOWNLOAD_IMG
}

export default apiList
