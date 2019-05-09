// pages/order/order.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    imgUrl: api.BASE_IMG
  },
  // 选择订单状态
  seleStatus(e) {
    console.log(e)
    this.setData({
      status: e.currentTarget.dataset.status
    })
    if (this.data.status == 0) {
      console.log('全部订单')
      wx.request({
        url: api.myAllOrder(app.globalData.openid,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }

        }
      })
    } else if (this.data.status == 1) {
      console.log('待付款')
      wx.request({
        url: api.myOrder(app.globalData.openid, 0,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    } else if (this.data.status == 2) {
      console.log('已付款')
      wx.request({
        url: api.myOrder(app.globalData.openid, 1,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    } else if (this.data.status == 3) {
      console.log('已完成')
      wx.request({
        url: api.myOrder(app.globalData.openid, 2,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    } else if (this.data.status == 4) {
      console.log('已退款')
      wx.request({
        url: api.myOrder(app.globalData.openid, 3,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    }else{
      console.log('已失效')
      wx.request({
        url: api.myOrder(app.globalData.openid, 4,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    }
  },
  //订单详情
  orderDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `../group_detail/group_detail?goods_id=${e.currentTarget.dataset.goodsid}&bh=${e.currentTarget.dataset.bh}&status=${e.currentTarget.dataset.status}&gb_id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      status: options.status
    })

    if (this.data.status == 0) {
      wx.request({
        url: api.myAllOrder(app.globalData.openid,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          this.setData({
            orderList: res.data.re
          })
        }
      })
    } else {
      wx.request({
        url: api.myOrder(app.globalData.openid, this.data.status-1,app.globalData.BASE_ID),
        success: (res) => {
          console.log(res)
          if (res.data.status != 0) {
            this.setData({
              orderList: res.data.re
            })
          } else {
            this.setData({
              orderList: ''
            })
          }
        }
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})