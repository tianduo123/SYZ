// pages/home/home.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true, //默认显示授权蒙层
    isSeleK: true, //默认选中拼团课程
    isSeleG: false, //默认未选中拼团商品
    imgUrl: api.BASE_IMG,
    kcpage: 0, //拼团课程页码
    goodspage: 0, //拼团商品页码
    pageSize: 10, //每页加载的条数
    kchasmore: '', //是否还有拼团课程
    goodshasmore: '', //是否还有拼团商品
    kcList: [], //拼团课程数组
    goodsList: [] //拼团商品数组
  },

  //获取用户微信信息
  getUserInfo(res) {
    console.log(res)
    if (res.detail.userInfo) {
      app.globalData.userInfo = res.detail.userInfo
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
      this.setData({
        isShow: false
      })
    }
  },
  //获取拼团课程列表
  getkcList() {
    wx.request({
      url: api.getKcList(this.data.kcpage, 0, app.globalData.BASE_ID),
      success: (res) => {
        console.log('这是拼团课程列表', res)
        if (res.data.status == 1 && res.data.re.length < this.data.pageSize) {
          //如果拿到数据且拿到的数据条数<10,那么就没有下一页了
          this.setData({
            kchasmore: false,
            kcList: this.data.kcList.concat(res.data.re)
          })
          console.log('这是去重前的数组', this.data.kcList)
          //----下面是一段非常牛批的代码，我也看不懂-----
          var hash = {}
          this.setData({
            kcList: this.data.kcList.reduce((preVal, curVal) => {
              hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
              return preVal
            }, [])
          })
          console.log('去重后的数组', this.data.kcList)
          //-------------------------------------------
        } else if (res.data.status == 1 && res.data.re.length == this.data.pageSize) {
          //如果拿到数据且拿到的数据条数==10,那么说明还有下一页
          this.setData({
            kchasmore: true,
            kcpage: this.data.kcpage + 1,
            kcList: this.data.kcList.concat(res.data.re)
          })
        } else if (res.data.status == 0) {
          //请求失败，没有拿到数据，那么说明没有下一页了
          this.setData({
            kchasmore: false,
            kcList: false
          })
        }
      }
    })
  },
  //获取拼团商品列表
  getgoodsList() {
    wx.request({
      url: api.getKcList(this.data.goodspage, 1, app.globalData.BASE_ID),
      success: (res) => {
        console.log('这是拼团商品列表', res)
        if (res.data.status == 1 && res.data.re.length < this.data.pageSize) {
          //获取数据成功且获取的条数<每页加载的条数，那么说明没有下一页了
          this.setData({
            goodshasmore: false,
            goodsList: this.data.goodsList.concat(res.data.re)
          })
          //----下面是一段非常牛批的代码，我也看不懂-----
          var hasj = {}
          this.setData({
            goodsList: this.data.goodsList.reduce((preVal, curVal) => {
              hasj[curVal.id] ? '' : hasj[curVal.id] = true && preVal.push(curVal);
              return preVal
            }, [])
          })
          console.log('去重后的数组', this.data.goodsList)
          //-------------------------------------------
        } else if (res.data.status == 1 && res.data.re.lenght == this.data.pageSize) {
          //获取数据成功且获取的条数==每页加载的条数，那么说明还有下一页
          this.setData({
            goodshasmore: true,
            goodspage: this.data.goodspage + 1,
            goodsList: this.data.goodsList.concat(res.data.re)
          })
        } else if (res.data.status == 0) {
          //说明没有商品
          this.setData({
            kchasmore: false,
            goodsList: false
          })
        }
      }
    })
  },
  //选择分类
  chooseClass(e) {
    console.log(e)
    if (e.currentTarget.dataset.status == 0) {
      //拼团课程
      this.setData({
        isSeleK: true,
        isSeleG: false
      })
      this.getkcList()
    } else {
      //拼团商品
      this.setData({
        isSeleK: false,
        isSeleG: true
      })
      this.getgoodsList()
    }
  },
  //去商品详情
  toDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `../kcdetail/kcdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('转发传参',options)
    if(options.admin_id){
      app.globalData.BASE_ID = options.admin_id
    }else{
      console.log('转发没有传参数')
    }
    console.log('全局数据---',app.globalData)
    // console.log('生元宝传过来的数据',options)
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
    this.getkcList()
    //获取拼团课程轮播图
    wx.request({
      url: api.tuijian(app.globalData.BASE_ID),
      success: (res) => {
        // console.log(res)
        var arr = res.data.re.filter((item) => {
          return item.prom_type == 1
        })
        var tjList = arr.map((item => {
          return {
            imgs: JSON.parse(item.images),
            id: item.id
          }
        }))
        // console.log('过滤后的拼团数组',tjList)
        this.setData({
          tjList: tjList
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
    console.log('生员宝传过来的的id是--',app.globalData.BASE_ID)
    console.log('默认id是--15')
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        if (res.data) {
          this.setData({
            isShow: false
          })
        }
      },
    })
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
    console.log('下拉刷新加载数据')
    wx.showLoading({
      title: '努力加载中',
      success: () => {
        //获取拼团课程轮播图
        wx.request({
          url: api.tuijian(app.globalData.BASE_ID),
          success: (res) => {
            // console.log(res)
            var arr = res.data.re.filter((item) => {
              return item.prom_type == 1
            })
            var tjList = arr.map((item => {
              return {
                imgs: JSON.parse(item.images),
                id: item.id
              }
            }))
            // console.log('过滤后的拼团数组',tjList)
            this.setData({
              tjList: tjList
            })
          }
        })
        //获取拼团课程
        this.getkcList()
        //获取拼团商品
        this.getgoodsList()
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
    console.log('用户上拉加载下一页数据')
    //判断当前分类是拼团课程还是拼团商品
    if (this.data.isSeleK) {
      //拼团课程
      if (this.data.kchasmore) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(() => {
          this.getkcList()
          wx.hideLoading()
        }, 1500)
      } else {
        wx.showToast({
          title: '没有下一页了哦',
          icon: 'none'
        })
      }
    } else {
      //拼团商品
      if (this.data.goodshasmore) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(() => {
          this.getgoodsList()
          wx.hideLoading()
        }, 1500)
      } else {
        wx.showToast({
          title: '没有下一页了哦',
          icon: 'none'
        })
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})