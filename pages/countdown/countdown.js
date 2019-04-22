// pages/countdown/countdown.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    actEndTimeList: [],
    groups: [{
      end_time: 1555646400,
      gb_num: "3",
      gb_num_s: "1",
      headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLpBNQ6Avib0kqcM8M3lVGDqjLnkOSMeBI8iaqyw2cOsvNu15g1KxJQZbJYqadZTXTAYXsN55EqqqBg/132",
      id: "21",
      nickname: "十年寒窗无人问.",
      openid: "omjPI5QrHkZTWzqujMBJjq-v8PCo",
      pay_time: 1555635466
    },
    //  {
    //    end_time: 1555646400,
    //   gb_num: "3",
    //   gb_num_s: "1",
    //   headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/ah1Qtp0mdOtLvLVfRqq26nngohkjYXgm09vM3EVNHC8ZdVtWykBKzdbcOichoLrEhBkHicZNFjEZiaeltBzH90wdg/132",
    //   id: "22",
    //   nickname: "那般",
    //   openid: "omjPI5fLOuG9KyMwfsN81s3a1vzE",
    //   pay_time: 1555636151
    // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //将wait里面每个人团的结束时间提取成一个数组，方便操作
    let endTimeList = [];
    this.data.groups.forEach((item) => {
      endTimeList.push(item.end_time*1000)
    })
    //将倒计时时间存到data中
    this.setData({
      actEndTimeList: endTimeList
    })
    console.log(this.data.actEndTimeList)
    //执行倒计时函数
    this.countDown()
  },
  //定义时间格式化函数
  timeFormat(param) {
    return param < 10 ? "0" + param : param
  },
  //定义倒计时函数
  countDown() {
    //获取当前时间戳，同时得到活动结束的时间数组
    let newTime = new Date().getTime()
    let endTimeList = this.data.actEndTimeList
    //定义倒计时时分秒的数组
    let countDownArr = []
    //对活动结束时间进行处理渲染到页面
    endTimeList.forEach((item) => {
      let endTime = item
      let obj = null
      console.log('活动结束时间',endTime,'当前时间',newTime)

      //判断活动是否结束
      if (endTime - newTime > 0) {
        console.log('未超时')
        let time = (endTime - newTime) / 1000;
        //获取天数、时、分、秒
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
        //活动时间已过
        console.log('活动时间已过')
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj)
      //渲染
      this.setData({
        countDownList: countDownArr
      })    
      //每1s执行一次倒计时函数
      setTimeout(this.countDown, 1000)
    })
    //
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