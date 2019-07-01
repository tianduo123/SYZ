// pages/shareCutDetail/shareCutDetail.js
const app = getApp()
const api = require('../../request/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: api.BASE_IMG,
    endTime: '', //活动倒计时时间
    isEnd:false
  },

  /*
    openid备注
    以下代码涉及到2个openid
      openid1 --> 分享人的openid,用于获取砍价商品详情
      openid  --> 被分享人的openid,用于标识是谁帮忙砍价

  */


  //获取用户信息
  getUserInfo(res) {
    console.log(res)
    if (res.detail.userInfo) {
      this.setData({
        avatarurl: res.detail.userInfo.avatarUrl,
        nickname: res.detail.userInfo.nickName
      })
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
    }
  },

  //获取最新砍价详情
  getNewDetail() {
    console.log('被分享人的openid是',this.data.openid1)
    wx.request({
      url: api.goodsDetail(this.data.openid1, this.data.goods_id, this.data.admin_id),
      success: (res) => {
        console.log('最新商品砍价详情--', res)
        this.setData({
          detail: res.data.detail, //商品详情
          shareLisst: res.data.bargainList, //砍价帮列表
          now_price: res.data.now_price, //当前价钱
          endTime: res.data.detail.dao_time //活动结束时间
        })
        this.data.setIntervalid = setInterval(() => {
          var djs = new Date(this.data.endTime).getTime() - new Date().getTime() //倒计时剩余时间戳
          var h = parseInt(djs / 1000 / 60 / 60 % 24)
          var m = parseInt(djs / 1000 / 60 % 60)
          var s = parseInt(djs / 1000 % 60)
          // console.log('倒计时时间戳', djs)
          // console.log('倒计时', h + '小时' + m + '分钟' + s + '秒')
          this.setData({
            h: h,
            m: m,
            s: s
          })
          if(this.data.s<0){
            console.log('倒计时结束')
            clearInterval(this.data.setIntervalid)
            this.setData({
              h:0,
              m:0,
              s:0,
              isEnd:true
            })
          }
        }, 1000)
      }
    })
  },
  close() {
    this.setData({
      isShow: false
    })
  },

  //帮他砍价
  shareCut() {
    if (!this.data.avatarurl || !this.data.nickname) {
      console.log('用户还没授权')
    } else {
      wx.request({
        url: api.helpCut(this.data.openid, this.data.goods_id, this.data.bargain_id, this.data.avatarurl, this.data.nickname, this.data.admin_id),
        success: (res) => {
          console.log('被分享人openid--', this.data.openid)
          console.log('商品详情参数--', this.data.goods_id)
          console.log('砍价id参数--', this.data.bargain_id)
          console.log('商家adming参数--', this.data.admin_id)
          console.log('帮他砍价详情', res)
          if (res.data.status == 1) {
            //那么帮砍价成功
            this.getNewDetail()
            this.setData({
              isShow: true,
              cutInfo: res.data.data
            })
          } else if (res.data.status == 0) {
            //砍价失败
            wx.showToast({
              title: '发生了一个未知错误，请稍后再试',
              icon: 'none'
            })
          } else if (res.data.status == 2 || res.data.status == 4) {
            //砍价活动结束
            wx.showToast({
              title: '砍价活动已结束',
              icon: 'none'
            })
          } else if (res.data.status == 3) {
            wx.showToast({
              title: '每人只能砍一次呦',
              icon: 'none'
            })
          } else if (res.data.status == 6) {
            wx.showToast({
              title: '该商品已经砍到最低价啦，不能再砍了呦',
              icon: 'none'
            })
          }
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('上个页面传过来的数据是----', options)
    //获取被分享人的openid
    wx.login({
      success: (res) => {
        if (res.code) {
          //获取被分享人的openid、
          wx.request({
            url: api.getOpenid(app.globalData.appid, app.globalData.secret, res.code),
            success: (res) => {
              console.log('被分享人的openid是---', res.data.openid)
              console.log('分享人的openid是---', options.openid)
              this.setData({
                openid: res.data.openid
              })
            }
          })
        }
      }
    })
    this.setData({
      openid1: options.openid,
      goods_id: options.goods_id,
      bargain_id: options.bargain_id,
      admin_id: options.admin_id
    })
    console.log('分享页面传过来的参数是--------', options)
    //获取商品详情
    this.getNewDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('用户下拉需刷新商品砍价详情')
    wx.showLoading({
      title: '努力加载中...',
      success: () => {
        this.getNewDetail()
      }
    })
    setTimeout(() => {
      wx.hideLoading(),
        wx.stopPullDownRefresh()
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

})