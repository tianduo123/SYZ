// pages/cut_detail/cut_detail.js
const app = getApp()
const api = require('../../request/api.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: api.BASE_IMG,
    endTime: '',//结束倒计时
    isEnd:false//判断活动是否结束
  },
  //开始砍价
  cut() {
    console.log('openid是---', app.globalData.openid)
    wx.request({
      url: api.cut(this.data.goodsId, app.globalData.openid, this.data.avatarurl, this.data.nickname, app.globalData.BASE_ID),
      success: (res) => {
        console.log(res)
        //判断砍价状态 0-->失败 1-->砍价成功 2-->砍价活动结束 3-->您已参加过该商品的砍价 4-->砍价活动关闭
        if (res.data.status == 1) {
          this.setData({
            bargain_id: res.data.data.bargain_id
          })
          wx.navigateTo({
            url: `../myCutDetail/myCutDetail?source=1&isShow=true&cut_price=${res.data.data.down}&goods_id=${this.data.goodsId}&bargain_id=${res.data.data.bargain_id}`,
          })
        } else if (res.data.status == 3) {
          wx.showModal({
            title: '该商品您已经砍过价了哦',
            content: '是否跳转到我的砍价',
            success: (res) => {
              if (res.confirm) {
                //用户点击了确定-->跳转到我的砍价
                wx.navigateTo({
                  url: `../myCutDetail/myCutDetail?source=1&goods_id=${this.data.goodsId}&bargain_id=${this.data.bargain_id}`,
                })
              } else {
                //用户点击了取消
              }
            }
          })
        } else if (res.data.status == 4 || res.data.status == 2) {
          wx.showToast({
            title: '该活动已结束，看看其他商品吧',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '发生了一个未知错误，请稍后再试',
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        this.setData({
          nickname: res.data.nickName,
          avatarurl: res.data.avatarUrl
        })
      },
    })
    // console.log(app.globalData.userInfo)
    // console.log(app.globalData.BASE_ID)
    // console.log(options)
    this.setData({
      goodsId: options.goodsId,
      Height: app.globalData.Height
    })
    //根据goodsId获取商品详情
    wx.request({
      url: api.goodsDetail(app.globalData.openid, options.goodsId, app.globalData.BASE_ID),
      success: (res) => {
        console.log('商品详情', res)
        //判断当前用户砍没砍过这件商品
        if(res.data.bargainList.length>0){
          this.setData({
            hasCut:true
          })
        }else{
          this.setData({
            hasCut:false
          })
        }
        this.setData({
          detail: res.data.detail,
          endTime:res.data.detail.dao_time
        })
        this.data.intervalid = setInterval(() => {
          var djs = new Date(this.data.endTime).getTime() - new Date().getTime()
          var h = parseInt(djs / 1000 / 60 / 60 % 24)
          var m = parseInt(djs / 1000 / 60 % 60)
          var s = parseInt(djs / 1000 % 60)
          // console.log('倒计时时间戳',djs)
          // console.log('倒计时', h + '小时' + m + '分钟' + s + '秒')
          this.setData({
            h: h,
            m: m,
            s: s
          })
          // console.log(this.data.s)
          if(this.data.s<0){
            console.log('倒计时结束')
            clearInterval(this.data.intervalid)
            this.setData({
              h:0,
              m:0,
              s:0,
              isEnd:true
            })
          }
          // if (this.data.s ==0&&this.data.m==0&&this.data.h==0) {
          //   console.log('倒计时结束')
          //   clearInterval(this.data.intervalid)
          // }
          // else if (this.data.s < 0 || this.data.m < 0 || this.data.h < 0){
          //   console.log('活动结束')
          //   clearInterval(this.data.intervalid)
          //   this.setData({
          //     h:0,
          //     m:0,
          //     s:0
          //   })
          // }
        }, 1000)
        var article = JSON.parse(this.data.detail.goods_jianjie);
        WxParse.wxParse('article', 'html', article, this, 5);
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
    console.log('下拉刷新')

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