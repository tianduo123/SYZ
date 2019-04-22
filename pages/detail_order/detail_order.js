// pages/detail_order/detail_order.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG
  },
  //更多优惠
  more(){
    wx.switchTab({
      url: '../home/home',
    })
  },
  //我的拼团
  toMyGroup(){
    wx.navigateTo({
      url: '../myGroup/myGroup',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //查看商品详情
    wx.request({
      url: api.getKcDetail(options.goods_id),
      success:(res)=>{
        console.log(res)
        this.setData({
          detail:res.data.detail,
        })
      }
    })
    //查看拼团成员
    wx.request({
      url: api.checkP(options.gb_id),
      success:(res)=>{
        console.log(res)
        this.setData({
          group:res.data.re
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})