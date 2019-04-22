// pages/home/home.js
const app = getApp()
const api =require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,//默认显示授权蒙层
    isSeleK:true,//默认选中拼团课程
    isSeleG:false,//默认未选中拼团商品
    imgUrl: api.BASE_IMG
  },

  //获取用户微信信息
  getUserInfo(res){
    console.log(res)
    if(res.detail.userInfo){
      app.globalData.userInfo = res.detail.userInfo
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
      this.setData({
        isShow:false
      })
    }
  },
  //选择分类
  chooseClass(e){
    console.log(e)
    if(e.currentTarget.dataset.status == 0){
      this.setData({
        isSeleK:true,
        isSeleG:false
      })
      wx.request({
        url: api.getKcList(),
        success: (res) => {
          console.log(res)
          this.setData({
            kcList: res.data.re
          })
        }
      })
    }else{
      // wx.navigateTo({
      //   url: '../text/text',
      // })
      // wx.request({
      //   url: api.getGoodsList(),
      //   success:(res)=>{
      //     console.log(res)
      //     this.setData({
      //       kcList:res.data.re
      //     })
      //   }
      // })
      this.setData({
        isSeleK:false,
        isSeleG:true
      })
      // this.setData({
      //   kcList:''
      // })
    }
  },
  //去商品详情
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `../kcdetail/kcdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取手机高度
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.screenHeight)
        this.setData({
          Height: res.screenHeight
        })
        app.globalData.Height = res.screenHeight
      },
    })
    //获取拼团课程
    wx.request({
      url: api.getKcList(),
      success:(res)=>{
        console.log(res)
        this.setData({
          kcList:res.data.re
        })
      }
    })
    //获取推荐商品(轮播图)
    wx.request({
      url: api.tuijian(),
      success:(res)=>{
        console.log(res)
        var tjList = res.data.re.map((item=>{
          return {
            imgs: JSON.parse(item.images),
            id:item.id
          }
        }))
        console.log(tjList)
        this.setData({
          tjList:tjList
        })
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
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(res)
        if(res.data){
          this.setData({
            isShow:false
          })
        }
      },
    })
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