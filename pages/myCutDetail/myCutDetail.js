 // pages/myCutDetail/myCutDetail.js
 const app = getApp()
 const api = require('../../request/api.js')
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     source: '',
     imgurl: api.BASE_IMG,
     endTime: ''
   },

   //关闭砍价成功弹窗
   close() {
     // console.log('关闭弹窗')
     this.setData({
       isShow: false
     })
   },
   //商品详情
   getGoodsDetail() {
     wx.request({
       url: api.goodsDetail(app.globalData.openid, this.data.goodsId, app.globalData.BASE_ID),
       success: (res) => {
         console.log('当前砍价商品详情', res)
         this.setData({
           //唯一id
           bargain_id: res.data.bargain_id,
           //商品详情
           detail: res.data.detail,
           //谁帮我砍价列表
           cutList: res.data.bargainList,
           //当前价钱
           nowprice: res.data.now_price,
           //结束时间
           endTime: res.data.detail.dao_time
         })
         this.data.intervalid = setInterval(() => {
           var djs = new Date(this.data.endTime).getTime() - new Date().getTime()
           var h = parseInt(djs / 1000 / 60 / 60 % 24)
           var m = parseInt(djs / 1000 / 60 % 60)
           var s = parseInt(djs / 1000 % 60)
           console.log('倒计时时间戳', djs)
           console.log('倒计时', h + '小时' + m + '分钟' + s + '秒')
           this.setData({
             h: h,
             m: m,
             s: s
           })
           if(this.data.s<0){
             console.log('活动结束')
             clearInterval(this.data.intervalid)
             this.setData({
               h:0,
               m:0,
               s:0,
               isEnd:true
             })
           }
          //  if (this.data.s == 0 && this.data.m == 0 && this.data.h == 0) {
          //    console.log('倒计时结束')
          //    clearInterval(this.data.intervalid)
          //  } else if (this.data.s < 0 || this.data.m < 0 || this.data.h < 0) {
          //    console.log('活动结束')
          //    clearInterval(this.data.intervalid)
          //    this.setData({
          //      h: 0,
          //      m: 0,
          //      s: 0
          //    })
          //  }

         }, 1000)
       }
     })
   },
   //价格满意。立即下单
   makeOrder() {
     console.log('立即下单参数openid', app.globalData.openid)
     console.log('立即下单参数goodsId', this.data.goodsId)
     console.log('立即下单参数nowprice', this.data.nowprice)
     console.log('立即下单参数avatarurl', this.data.avatarurl)
     console.log('立即下单参数nickname', this.data.nickname)
     console.log('立即下单参数admin_id', app.globalData.BASE_ID)
     wx.showModal({
       title: '提交订单',
       content: '当前价格是' + this.data.nowprice + '元，是否提交订单',
       success: (res) => {
         if (res.confirm) {
           //用户点击了确定-->提交订单
           wx.request({
             url: api.makeCutOrder(app.globalData.openid, this.data.goodsId, this.data.detail.goods_name, this.data.nowprice, this.data.avatarurl, this.data.nickname, this.data.bargain_id, app.globalData.BASE_ID, ),
             success: (res) => {
               console.log('立即下单返回数据', res)
               if (res.data.status == 1) {
                 wx.showToast({
                   title: '提交成功',
                   success: () => {
                     setTimeout(() => {
                       wx.switchTab({
                         url: '../cut/cut',
                       })
                     }, 1000)
                   }
                 })
               } else {
                 wx.showToast({
                   title: '发生了一个未知错误,请稍后再试',
                   icon: 'none'
                 })
               }
             }
           })
         } else {
           //用户点击了取消
         }
       }
     })

   },

   //获取订单详情（从订单页进入）
   orderDetail() {
     wx.request({
       url: api.orderDetail(this.data.bh),
       success: (res) => {
         console.log('订单详情', res)
         this.setData({
           orderDetail: res.data.detail,
           cutList2: res.data.bargain_detail
         })
       }
     })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     console.log('请求来源', options)
     this.setData({
       source: options.source,
       isShow: options.isShow,
       cut_price: options.cut_price,
       goodsId: options.goods_id,
       bargain_id: options.bargain_id,
       bh: options.bh
     })
     //获取订单详情(从订单页进入)
     this.orderDetail()
     //获取商品详情
     this.getGoodsDetail()
     //从缓存中拿用户微信信息
     wx.getStorage({
       key: 'userInfo',
       success: (res) => {
         console.log(res)
         this.setData({
           avatarurl: res.data.avatarUrl,
           nickname: res.data.nickName
         })
       },
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
     console.log('用户下拉刷新')
     wx.showLoading({
       title: '努力加载中...',
       success: () => {
         //这里执行下拉刷新内容
         this.getGoodsDetail()
       }
     })
     setTimeout(() => {
       wx.hideLoading()
       wx.stopPullDownRefresh()
     }, 1500)
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function(res) {
     console.log('唯一标识bargain--', this.data.bargain_id)
     return {
       title: '快来帮我砍一刀吧,就差你啦',
       path: `/pages/shareCutDetail/shareCutDetail?&openid=${app.globalData.openid}&admin_id=15&goods_id=${this.data.goodsId}&bargain_id=${this.data.bargain_id}&avatarurl=${this.data.avatarurl}&nickname=${this.data.nickname}`
     }
   }
 })