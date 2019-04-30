// pages/me/me.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  //我的砍价
  toKanjia(){
    console.log('我的砍价')
    wx.showToast({
      title: '此功能暂未开放！',
      image:'../../icon/none.png',
    })
  },
  //查看更多
  lookMore(e){
    wx.navigateTo({
      url: `../order/order?status=${e.currentTarget.dataset.status}`,
    })
  },
  //点击订单状态
  toOrder(e){
    wx.navigateTo({
      url: `../order/order?status=${e.currentTarget.dataset.status}`,
    })
  },
  //联系商家
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '13381444813',
    })
  },
  //我的拼团
  toMyGroup(){
    wx.navigateTo({
      url: '../myGroup/myGroup',
    })
  },
  //我的收藏
  toMyLike(){
    wx.navigateTo({
      url: '../myLike/myLike',
    })
  },
      /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
 
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        this.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName
        })
      },
    })
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