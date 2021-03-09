// pages/goods_list/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    tabNames: [{
      id: 0,
      name: "综合",
      isActive: true
    }, {
      id: 1,
      name: "销量",
      isActive: false
    }, {
      id: 2,
      name: "价格",
      isActive: false
    }],
    //商品列表查询参数
    queryInfo: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    },
    total: 0,
    goodsList: [],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.queryInfo.cid = options.cid || ""
    this.data.queryInfo.query = options.query || ""
    //初始化页面数据
    this.getGoodsList(this.data.queryInfo)
  },
  
  //tab栏点击事件
  tabsItemChange(e) {
    const {index} = e.detail;
    let {tabNames} = this.data;
    tabNames.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    })
    this.setData({
      tabNames
    })
  },
  
  //获取商品列表数据
  async getGoodsList(queryInfo) {
    const res = await request({url: "/goods/search", data: queryInfo});
    if (res.data.meta.status != 200) return console.log(res.data.meta.msg);
    const goods = res.data.message.goods;
    console.log(goods);
    let total = res.data.message.total;
    this.setData({
      //拼接
      goodsList: [...this.data.goodsList, ...goods],
      total: total
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
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.data.queryInfo.pagenum = 1
    this.setData({
      //重置数组,刷新数据
      goodsList: [],
    });
    this.getGoodsList(this.data.queryInfo);
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
    wx.stopPullDownRefresh();
  },
  
  /**
   * 页面上拉触底事件的处理函数
   * 触底获取下一页数据
   */
  onReachBottom: function () {
    const queryInfo = this.data.queryInfo
    let total = this.data.total;
    if (queryInfo.pagenum >= total / 10) {
      wx.showToast({
        title: "没有下一页数据了"
      })
      return
    }
    queryInfo.pagenum++;
    this.setData({
      queryInfo
    });
    this.getGoodsList(queryInfo)
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})