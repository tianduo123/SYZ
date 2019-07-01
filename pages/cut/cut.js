// pages/cut/cut.js
const app = getApp()
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.BASE_IMG,
    pages: 0, //当前页码
    pageSize: 10, //每页加载的商品条数
    hasMore: true, //是否还有下一页商品（默认有）
    cutList: [], //砍价商品组数
    isShow:true,//默认显示授权蒙层
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
  //获取砍价商品列表
  getCutList(){
    wx.request({
      url: api.cutList(this.data.pages,app.globalData.BASE_ID,app.globalData.openid),
      success: (res) => {
        console.log('这是商品列表', res)
        if (res.data.status == 1 && res.data.re.length < this.data.pageSize) {
          //如果请求成功且拿到的商品条数<10,那么就没有下一页了
          this.setData({
            hasMore: false,
            cutList:this.data.cutList.concat(res.data.re)
          })
          // console.log('去重前的数组',this.data.cutList)
          // -----牛逼的数组去重------
          var newArr = []
          for(var i=0;i<this.data.cutList.length;i++){
            var flag = true 
            for(var j=0;j<newArr.length;j++){
              if(this.data.cutList[i].id == newArr[j].id){
                flag = false
              }
            }
            if(flag){
              newArr.push(this.data.cutList[i])
            }
          }
          this.setData({
            cutList:newArr
          })
          console.log('去重后的数组是',newArr)

          //---------去重结束-----------------
          
        } else if (res.data.status == 1 && res.data.re.length >= this.data.pageSize) {
          //如果请求成功且拿到的商品条数>10,那么就有下一页
          this.setData({
            hasMore: true,
            pages: this.data.pages + 1
          })
          console.log('合并后的新数组是', this.data.cutList.concat(res.data.re))
          this.setData({
            cutList: this.data.cutList.concat(res.data.re)
          })
          var newArr = []
          for (var i = 0; i < this.data.cutList.length; i++) {
            var flag = true
            for (var j = 0; j < newArr.length; j++) {
              if (this.data.cutList[i].id == newArr[j].id) {
                flag = false
              }
            }
            if (flag) {
              newArr.push(this.data.cutList[i])
            }
          }
          this.setData({
            cutList: newArr
          })
          // console.log('去重后的数组是',newArr)
        }else if(res.data.status==0){
          //请求的页数没有商品请求失败
          this.setData({
            hasMore:false,
            cutList:[]
          })
        }
        console.log('重新获取到的砍价商品',this.data.cutList)
      }
    })
  },
  //砍价商品详情
  cutPrice(e) {
    console.log(e)
    wx.navigateTo({
      url: `../cut_detail/cut_detail?goodsId=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取砍价轮播
    wx.request({
      url: api.tuijian(app.globalData.BASE_ID),
      success: (res) => {
        // console.log(res)
        //过滤出砍价轮播
        var arr
        arr = res.data.re.filter((item) => {
          return item.prom_type == 2
        })
        // console.log('过滤后的数组', arr)
        this.setData({
          bannerList: arr.map((item) => {
            return {
              id: item.id,
              img: JSON.parse(item.images)
            }
          })
        })
        // console.log('遍历后的数组',this.data.bannerList)
      }
    })
    //获取砍价商品列表
    this.getCutList()
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
    //从缓存中获取微信用户信息
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
    console.log('用户下拉，刷新砍价商品列表')
    wx.showLoading({
      title: '努力加载中',
      success:()=>{
        //获取砍价商品列表
        this.getCutList()
        //获取砍价轮播
        wx.request({
          url: api.tuijian(app.globalData.BASE_ID),
          success: (res) => {
            // console.log(res)
            //过滤出砍价轮播
            var arr
            arr = res.data.re.filter((item) => {
              return item.prom_type == 2
            })
            // console.log('过滤后的数组', arr)
            this.setData({
              bannerList: arr.map((item) => {
                return {
                  id: item.id,
                  img: JSON.parse(item.images)
                }
              })
            })
            // console.log('遍历后的数组',this.data.bannerList)
          }
        })
      }
    })
    setTimeout(()=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
    },1500)
 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('上拉加载下一页')
    //判断是否有下一页数据
    if(this.data.hasMore){
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(()=>{
        this.getCutList()
        wx.hideLoading()
      },1500)
    }else{
      wx.showToast({
        title: '没有下一页了',
        icon:'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})