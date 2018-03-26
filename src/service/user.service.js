/**
 * user related service
 */
import {post} from '@/utils/http'
import WeConf from '@/config/wechat.conf'

/**
 * promisify wechat login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success (data) {
        resolve(data) // get code by data.code
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

/**
 * promisify wechat getUserInfo
 */
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success (data) {
        resolve(data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

/**
 * login backend via wechat authentication
 */
export const getToken = async () => {
  try {
    const {code} = await login()
    const {signature, iv, encryptedData} = await getUserInfo()
    const res = await post(WeConf.AUTH_URL, {
      code,
      signature,
      encryptedData,
      iv
    })

    return res
  } catch (e) {
    console.error('get token failed.', e)
  }
}
