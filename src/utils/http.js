/**
 * Promisify http tools based on wx.request
 */

const httpRequest = (url, method, data, header) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success (res) {
        resolve(res)
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

/**
 * http GET
 */
export const get = (url, data, header) => {
  return httpRequest(url, 'GET', data, header)
}

/**
 * http POST
 */
export const post = (url, data, header) => {
  return httpRequest(url, 'POST', data, header)
}

/**
 * all
 */
export default {get, post}
