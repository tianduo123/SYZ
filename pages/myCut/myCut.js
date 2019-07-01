// pages/myCut/myCut.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:api.BASE_IMG,
    select_l:true,
    empty:false
  },
  //选择
  select(e){
    console.log(e)
    if(e.currentTarget.dataset.status==0){
      console.log('选了了正在砍价')
      this.getMyCutList(0)
      this.setData({
        select_l:true
      })
    }else{
      console.log('选择了我的砍价')
      this.getMyCutList(1)
      this.setData({
        select_l:false
      })
    }
  },
  //我的砍价列表
  getMyCutList(a){
    wx.request({
      url: api.myCut(app.globalData.openid,a,app.globalData.BASE_ID),
      success:(res)=>{
        console.log('砍价列表',res)
        this.setData({
          cutList:res.data.re
        })
        if(res.data.status==0){
         this.setData({
           empty: true
         }) 
        }else{
          this.setData({
            empty:false
          })
        }
      }
    })
  },

  //砍价商品详情
  toCutDetail(e){
    console.log(e)
    if(e.currentTarget.dataset.bh){
      wx.navigateTo({
        url: `../myCutDetail/myCutDetail?source=0&bh=${e.currentTarget.dataset.bh}`,
      })
    }else if(!e.currentTarget.dataset.bh){
      console.log('正在砍价')
      wx.navigateTo({
        url: `../cut_detail/cut_detail?goodsId=${e.currentTarget.dataset.id}`,
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCutList(0)
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