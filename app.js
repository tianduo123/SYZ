//app.js
const api = require('./request/api.js')
App({
  onLaunch: function (options) {
    console.log(options)
    console.log("生元宝传过来的id是", options.referrerInfo.extraData.admin_id)
    this.globalData.BASE_ID = options.referrerInfo.extraData.admin_id
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          url: api.getOpenid(this.globalData.appid, this.globalData.secret, res.code,this.globalData.BASE_ID),
          success: (res) => {
            console.log(res)
            this.globalData.openid = res.data.openid
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appid: 'wx3950a029465d5070',
    secret: '2dfa279dc8380406906598be0ee6c9e7',
    openid: '',
  }
})