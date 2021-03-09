// pages/category/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //左侧分类数据
    leftMenuList: [],
    //右侧内容数据
    rightContentList: [],
    //选中的菜单索引
    activeIndex: 0,
    //右侧内容距离顶部的距离
    scrollTop:0
  },
  //接口返回的数据
  Cates: [],
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //本地存储 数据缓存
    //wx: wx.setStorageSync("key","value"); wx.getStorageSync("key");
    //web:localStorage.setItem("key","value") localStorage.getItem("key")
    const Cates = wx.getStorageSync("cates")
    console.log(Cates)
    //判断是否有本地存储数据
    if (!Cates) {
      //为空,重新获取数据
      this.getCategoryList();
    } else {
      //判断Cates中数据是否过期 (5min)
      if (Date.now() - Cates.time > 1000 * 300) {
        //过期 则重新发送请求
        console.log("过期")
        this.getCategoryList();
      } else {
        //没有过期
        console.log("数据没有过期")
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(value => value.cat_name);
        let rightContentList = this.Cates[this.data.activeIndex].children
        //给数据赋值
        this.setData({
          leftMenuList,
          rightContentList,
        });
      }
    }
  }
  
  ,
  
  /**
   * 获取分类数据
   */
  async getCategoryList() {
    const res = await request({url:"/categories"})
    if (res.data.meta.status != 200) return console.log(res.data.meta.msg);
    this.Cates = res.data.message;
    //存储到本地
    wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});
    console.log(this.Cates);
    //赋值
    this.setData({
      leftMenuList: this.Cates.map(value => value.cat_name),
      rightContentList: this.Cates[this.data.activeIndex].children
    });
    console.log(this.data.leftMenuList)
    console.log(this.data.rightContentList)
  },
  /**
   * 修改类别
   */
  handleItemTap(e) {
    const index = e.target.dataset.index;
    //重新设置scroll-view标签距离顶部的距离
    this.setData({
      activeIndex: index,
      rightContentList: this.Cates[index].children,
      scrollTop:0
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