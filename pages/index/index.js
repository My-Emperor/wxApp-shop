import {request} from "../../request/index"

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    swiperList: [],
    //导航栏数据
    navList:[],
    //楼层数据
    floorList:[],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化时进行异步请求获取数据
    //获取swiper轮播图数据
    //通过promise封装后
    //获取swiperList数据
    this.getSwiperList();
    //获取navList数据
    this.getNavList();
    //获取楼层数据
    this.getfloorList();
    /**
     *
     wx.request({
      //请求地址
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      //请求参数
      data: {},
      //请求头
      header: {'content-type': 'application/json'},
      //请求方法
      method: 'GET',
      //返回值数据格式
      dataType: 'json',
      //返回数据类型
      responseType: 'text',
      //请求成功触发
      success: (res) => {
      },
      //请求失败触发
      fail: () => {
      },
      //请求不管成功与否都触发
      complete: () => {
      }
    })
     */
  },
  
  /**
   * 获取轮播图数据
   */
  getSwiperList(){
    request({
      //请求地址
      url: '/home/swiperdata',
      //请求参数
      data: {},
      //请求头
      header: {'content-type': 'application/json'},
      //请求方法
      method: 'GET',
      //返回值数据格式
      dataType: 'json',
      //返回数据类型
      responseType: 'text',
      //请求成功触发
    }).then(res => {
      const data = res.data;
      if (data.meta.status != 200) return console.log(data.meta.msg);
      this.setData({
        swiperList: data.message,
      })
    })
  },
  
  /**
   * 获取导航栏数据
   */
  getNavList(){
    request({url:"/home/catitems"}).then(res => {
      const data = res.data;
      console.log(data)
      if (data.meta.status != 200) return console.log(data.meta.msg);
      this.setData({
        navList: data.message,
      })
    })
  },
  
  /**
   * 获取楼层数据
   */
  getfloorList(){
    request({url:"/home/floordata"}).then(res => {
      const data = res.data;
      console.log(data)
      if (data.meta.status != 200) return console.log(data.meta.msg);
      this.setData({
        floorList: data.message,
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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