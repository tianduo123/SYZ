// pages/sub_order/sub_order.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG
  },
  //提交订单
  submit(e) {
    console.log('用户信息是',app.globalData.userInfo)
    console.log('openid是',app.globalData.openid)
    console.log(e)
    if (!e.detail.value.phone) {
      wx.showToast({
        title: '请输入学员姓名',
        icon: 'none',
      })
    } else if (!(/^1[34578]\d{9}$/.test(e.detail.value.phone))) {
      wx.showToast({
        title: '手机号码错误',
        icon: 'none'
      })
    } else {
      //参团/开团生成订单(需先判断是开团还是参团)
      if (this.data.type == 0) {
        console.log('参团')
        wx.request({
          url: api.makeGroup(),
          method:'POST',
          data:{
            admin_id: 15,
            openid: app.globalData.openid,
            headimgurl: app.globalData.userInfo.avatarUrl,
            nickname: app.globalData.userInfo.nickName,
            name: e.detail.value.name,
            phone: e.detail.value.phone,
            comment: e.detail.value.msg,
            goods_id: this.data.goods_id,
            ord_price: this.data.ord_price,
            gb_num: this.data.gb_num,
            gb_id: this.data.gb_id,
            type: 0,
            ord_goods: this.data.ord_goods
          },
          header: {
            'content-type': "application/x-www-form-urlencoded" // 默认值
          },
          success: (res) => {
            console.log(res)
            //判断开团是否成功 Y --> 跳转支付页面 N --> 错误提示
            if (res.data.status == 0) {
              wx.showToast({
                title: '一个未知错误，请重新下单',
                icon: 'none'
              })
            } else if (res.data.status == 1) {
              console.log('参团成功')
              wx.navigateTo({
                url: `../confirm_order/confirm_order?name=${e.detail.value.name}&phone=${e.detail.value.phone}&ord_id=${res.data.order.ord_bh}&price=${res.data.order.ord_price}&time=${res.data.order.start_time}&goods_id=${this.data.goods_id}&gb_id=${res.data.order.gb_id}`,
              })
            } else if (res.data.status == 2) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            } else if (res.data.status == 3) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            } else if (res.data.status == 4) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            } else if (res.data.status == 5) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          }
        })
      } else {
        console.log('开团')
        wx.request({
          url: api.makeGroup(),
          method: "POST",
          data: {
            admin_id: 15,
            openid: app.globalData.openid,
            headimgurl: app.globalData.userInfo.avatarUrl,
            nickname: app.globalData.userInfo.nickName,
            name: e.detail.value.name,
            phone: e.detail.value.phone,
            comment: e.detail.value.msg,
            goods_id: this.data.goods_id,
            ord_price: this.data.ord_price,
            gb_num: this.data.gb_num,
            gb_id: 0,
            type: 1,
            ord_goods: this.data.ord_goods
          },
          header: {
            'content-type': "application/x-www-form-urlencoded" 
          },
          success: (res) => {
            console.log(res)
            //判断开团是否成功 Y --> 跳转支付页面 N --> 错误提示
            if (res.data.status == 0) {
              wx.showToast({
                title: '一个未知错误，请重新下单',
                icon: 'none'
              })
            } else if (res.data.status == 1) {
              console.log('拼团成功')
              wx.navigateTo({
                url: `../confirm_order/confirm_order?name=${e.detail.value.name}&phone=${e.detail.value.phone}&ord_id=${res.data.order.ord_bh}&price=${res.data.order.ord_price}&time=${res.data.order.start_time}&goods_id=${this.data.goods_id}&gb_id=${res.data.order.gb_id}`,
              })
            } else if (res.data.status == 2) {
              wx.showToast({
                title: '该商品有未完成的订单哦',
                icon: 'none'
              })
            } else if (res.data.status == 3) {
              wx.showToast({
                title: '该商品有未完成的订单哦',
                icon: 'none'
              })
            } else if (res.data.status == 4) {
              wx.showToast({
                title: '该商品团已满，请浏览其他商品吧',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      gb_id: options.gb_id,
      type: options.status,
      goods_id: options.goods_id,
      ord_price: options.ord_price,
      gb_num: options.gb_num,
      ord_goods: options.ord_goods
    })
    //商品详情
    wx.request({
      url: api.getKcDetail(options.goods_id),
      success:(res)=>{
        console.log(res)
        this.setData({
          detail:res.data.detail
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