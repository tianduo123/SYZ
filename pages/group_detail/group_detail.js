// pages/group_detail/group_detail.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG
  },
  //去付款

  pay_order() {
    console.log('立即支付')
    wx.request({
      url: api.makeOrder(this.data.orderDetail.ord_bh, app.globalData.openid, this.data.detail.pin_price),
      success: (res) => {
        console.log(res)
        if(res.data.status==0){
          //拼团失败
          wx.showModal({
            title: '拼团失败',
            content: res.data.msg,
            success:(res)=>{
              if(res.confirm){
                setTimeout(()=>{
                  wx.switchTab({
                    url: '../home/home',
                  })
                },1000)
              }else{
                console.log('用户点击了取消')
              }
            }
          })
        }else{
          this.setData({
            prepayid: res.data.prepayid
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
                url: api.isOk(this.data.orderDetail.gb_id),
                success: (res) => {
                  console.log(res)
                  if (res.data.status == 1) {
                    //拼团成功,发送拼团成功的模板消息
                    wx.request({
                      url: api.sendMsg2(this.data.orderDetail.gb_id, this.data.orderDetail.start_time),
                      success: (res) => {
                        console.log(res)
                      }
                    })
                  }
                }
              })
              //发送支付成功模板消息
              wx.request({
                url: api.sendMsg(this.data.detail.goods_name, this.data.orderDetail.ord_bh, this.data.detail.pin_price, this.data.prepayid, app.globalData.openid),
                success: (res) => {
                  console.log(res)
                }
              })
              setTimeout(() => {
                console.log('1.5秒后跳转')
                wx.reLaunch({
                  url: `../detail_order/detail_order?goods_id=${this.data.detail.id}&gb_id=${this.data.orderDetail.gb_id}`,
                })
              }, 1000)

            },
            fail: (res) => {
              console.log('支付失败', res)
              wx.showModal({
                title: '取消支付',
                content: '是否放弃本次交易',
                success:(res)=>{
                  if(res.confirm){
                    setTimeout(()=>{
                      wx.switchTab({
                        url: '../home/home',
                      })
                    },1000)
                  }
                }
              })
            }
          })
        }
    
      }
    })
  },


  //联系机构
  phone(){
    wx.makePhoneCall({
      phoneNumber: '123123123',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order_status:options.status,
      gb_id:options.gb_id
    })
    //获取商品详情
    wx.request({
      url: api.getKcDetail(options.goods_id),
      success:(res)=>{
        console.log(res)
        this.setData({
          detail:res.data.detail
        })
      }
    })
    //获取订单详情
    wx.request({
      url: api.orderDetail(options.bh),
      success:(res)=>{
        console.log(res)
        this.setData({
          orderDetail:res.data.re
        })
        if (res.data.re.gb_status==1){
          this.setData({
            cha: res.data.re.gb_num - res.data.re.gb_num_s
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