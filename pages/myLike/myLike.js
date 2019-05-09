// pages/myLike/myLike.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG,
    arr:[],
    likes:[]
  },
  //商品详情
  toDetail(e){
    wx.navigateTo({
      url: `../kcdetail/kcdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取我的收藏
    wx.request({
      url: api.myLike(app.globalData.openid,app.globalData.BASE_ID),
      success:(res)=>{
        console.log(res)
        for(var i=0;i<res.data.re.length;i++){
          this.data.arr.push(res.data.re[i].goods_id)
        }
        console.log(this.data.arr)
        for(var i=0;i<this.data.arr.length;i++){
          wx.request({
            url: api.getKcDetail(this.data.arr[i]),
            success:(res)=>{
              this.data.likes.push(res.data.detail)
              console.log(this.data.likes)
              this.setData({
                likes:this.data.likes
              })
            }          
          })
        }
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
    //获取我的收藏
    // wx.request({
    //   url: api.myLike(app.globalData.openid),
    //   success: (res) => {
    //     console.log(res)
    //     for (var i = 0; i < res.data.re.length; i++) {
    //       this.data.arr.push(res.data.re[i].goods_id)
    //     }
    //     console.log(this.data.arr)
    //     for (var i = 0; i < this.data.arr.length; i++) {
    //       wx.request({
    //         url: api.getKcDetail(this.data.arr[i]),
    //         success: (res) => {
    //           this.data.likes.push(res.data.detail)
    //           console.log(this.data.likes)
    //           this.setData({
    //             likes: this.data.likes
    //           })
    //         }

    //       })
    //     }
    //   }
    // })
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