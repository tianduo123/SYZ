// pages/kcdetail/kcdetail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    imgUrl: api.BASE_IMG,
    countDownList: [],
    actEndTimeList: [],
    endTimeList: []
  },
  //返回首页
  toHome() {
    wx.switchTab({
      url: '../home/home',
    })
  },




  //打开遮罩层
  toMore() {
    console.log('打开遮罩')
    this.setData({
      isShow: true
    })
    //----------------------------------------------------------------------------
    //将wait里面每个人团的结束时间提取成一个数组，方便操作
    // let endTimeList = [];
    // console.log(this.data.groups)
    // console.log('当前时间是', new Date().getTime())
    // this.data.groups.forEach((item) => {
    //   endTimeList.push(item.end_time * 1000)
    // })
    // //将倒计时时间存到data中
    // this.setData({
    //   actEndTimeList: endTimeList
    // })
    // console.log(this.data.actEndTimeList)
    // //执行倒计时函数
    // this.countDown()
    //-----------------------------------------------------------------------------------------
  },
  //关闭遮罩层
  close() {
    console.log('关闭遮罩,需关闭定时器')
    this.setData({
      isShow: false
    })
  },

  //收藏
  like() {
    wx.request({
      url: api.like(this.data.goods_id, app.globalData.openid),
      success: (res) => {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '收藏成功',
          })
          this.setData({
            likeStatus: 1
          })
        } else {
          wx.showToast({
            title: '取消收藏',
          })
          this.setData({
            likeStatus: 0
          })
        }
      }
    })
  },

  //提交订单
  subOrder(e) {
    console.log('提交订单', e)

    wx.navigateTo({
      url: `../sub_order/sub_order?status=${e.currentTarget.dataset.status}&goods_id=${this.data.goods_id}&ord_price=${this.data.detail.pin_price}&gb_num=${this.data.detail.gb_num}&ord_goods=${this.data.detail.goods_name}&gb_id=${e.currentTarget.dataset.id}`,
      success: () => {
        //关闭遮罩层
        this.close()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo)
    console.log(options)
    this.setData({
      goods_id: options.id
    })
    //获取课程详情
    wx.request({
      url: api.getKcDetail(options.id),
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.detail,
          groups: res.data.wait,
          isOk: res.data.success,
          imgs: JSON.parse(res.data.detail.images)
        })
        //------------------------------------------------------------
        console.log(this.data.groups)
        let endTimeList = [];
        //将活动的结束时间参数提成一个单独的数组，方便操作
        this.data.groups.forEach(item => {
          endTimeList.push(item.end_time)
        })
        console.log(endTimeList)
        
        this.setData({
          actEndTimeList: endTimeList.map((item)=>{
            return item.replace(/-/g, "/")
          })
        });
        console.log(this.data.actEndTimeList)
        // 执行倒计时函数
        this.countDown();
        //-------------------------------------------------------------------
        var article = JSON.parse(this.data.detail.goods_jianjie);
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
    //判断当前商品是否被收藏
    wx.request({
      url: api.isLike(options.id, app.globalData.openid),
      success: (res) => {
        console.log(res)
        if (res.data.status == 0) {
          //未收藏
          this.setData({
            likeStatus: 0
          })
        } else {
          this.setData({
            likeStatus: 1
          })
        }
      }
    })

  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00',
          status:0
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.data.groups.forEach((item,index)=>{
      this.data.groups[index].djs = countDownArr[index]
    })
    // console.log(this.data.groups)
    this.setData({
      groups:this.data.groups
    })
    this.setData({
      countDownList: countDownArr
    })
    // console.log(this.data.countDownList)
    setTimeout(this.countDown, 1000);
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