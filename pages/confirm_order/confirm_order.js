// pages/confirm_order/confirm_order.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG
  },
  pay_order() {
    console.log('立即支付')
    wx.request({
      url: api.makeOrder(this.data.ord_id, app.globalData.openid, this.data.price),
      success: (res) => {
        console.log(res)
        this.setData({
          prepayid:res.data.prepayid
        })
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: 'prepay_id=' + res.data.prepayid,
          signType: 'MD5',
          paySign: res.data.sign,
          success: (res) => {
            console.log('支付成功', res)
            //判断是否拼团成
            wx.request({
              url: api.isOk(this.data.gb_id),
              success: (res) => {
                console.log(res)
                if(res.data.status==1){
                  //拼团成功,发送拼团成功的模板消息
                  wx.request({
                    url: api.sendMsg2(this.data.gb_id, this.data.time),
                    success:(res)=>{
                      console.log(res)
                    }
                  })
                }
              }
            })
            //发送模板消息
            wx.request({
              url: api.sendMsg(this.data.detail.goods_name,this.data.ord_id,this.data.price,this.data.prepayid,app.globalData.openid),
              success:(res)=>{
                console.log(res)
              }
            })
            setTimeout(()=>{
              console.log('1.5秒后跳转')
              wx.reLaunch({
                url: `../detail_order/detail_order?goods_id=${this.data.goods_id}&gb_id=${this.data.gb_id}`,
              }) 
            },1000)
          
          },
          fail: (res) => {
            console.log('支付失败', res)
            wx.showModal({
              title: '取消支付',
              content: '是否放弃本次交易',
              success: (res) => {
                if (res.confirm) {
                  setTimeout(() => {
                    wx.switchTab({
                      url: '../home/home',
                    })
                  }, 1000)
                }
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      name: options.name,
      phone: options.phone,
      ord_id: options.ord_id,
      price: options.price,
      time: options.time,
      goods_id: options.goods_id,
      gb_id:options.gb_id
    })
    //商品详情
    wx.request({
      url: api.getKcDetail(this.data.goods_id),
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.detail
        })
      }
    })
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