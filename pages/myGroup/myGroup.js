// pages/goods_list/goods_list.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG
  },
  //拼团详情
  toDetail(e){
    wx.navigateTo({
      url: `../group_detail/group_detail?goods_id=${e.currentTarget.dataset.goodsid}&bh=${e.currentTarget.dataset.bh}&status=${e.currentTarget.dataset.status}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取我的拼团
    wx.request({
      url: api.myGroup(app.globalData.openid,app.globalData.BASE_ID),
      success:(res)=>{
        console.log(res)
        this.setData({
          myList:res.data.re
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
  // onShareAppMessage: function () {

  // }
})