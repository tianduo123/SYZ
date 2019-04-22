// pages/text/text.js
// let goodsList = [{
//     actEndTime: '2019/05/01 10:00:43'
//   },
//   {
//     actEndTime: '2019/04/01 11:00:00'
//   },
//   {
//     actEndTime: '2019/06/01 12:45:56'
//   },
//   {
//     actEndTime: '2019/07/01 15:00:23'
//   },
//   {
//     actEndTime: '2019/05/23 17:00:22'
//   },
//   {
//     actEndTime: '2019/05/14 19:00:44'
//   },
//   {
//     actEndTime: '2019/05/21 21:00:34'
//   },
//   {
//     actEndTime: '2019/06/17 09:00:37'
//   },
//   {
//     actEndTime: '2019/03/21 05:00:59'
//   },
//   {
//     actEndTime: '2019/04/19 07:00:48'
//   },
//   {
//     actEndTime: '2019/04/28 03:00:11'
//   }
// ]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    actEndTimeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'https://syb.qhkltn.com/index.php/Api/pinke/pinkeDetail?id=9',
      success: (res) => {
        console.log(res)
        this.setData({
          goodsList: res.data.wait
        })
        console.log(this.data.goodsList)
        let endTimeList = [];
        //将活动的结束时间参数提成一个单独的数组，方便操作
        this.data.goodsList.forEach(item => {
          endTimeList.push(item.end_time)
        })
        this.setData({
          actEndTimeList: endTimeList
        });
        console.log(this.data.actEndTimeList)
        // 执行倒计时函数
        this.countDown();
      },

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
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDownList: countDownArr
    })
    console.log(this.data.countDownList)
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