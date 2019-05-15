// pages/myCut/myCut.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:api.BASE_IMG
  },

  //我的砍价列表
  getMyCutList(){
    wx.request({
      url: api.myCut(app.globalData.openid,app.globalData.BASE_ID),
      success:(res)=>{
        console.log(res)
        this.setData({
          cutList:res.data.re
        })
      }
    })
  },

  //砍价商品详情
  toCutDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `../myCutDetail/myCutDetail?source=0&bh=${e.currentTarget.dataset.bh}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCutList()
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