import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    goods_id: 0,
    goodsDetails: {}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.setData({
      goods_id
    });
    this.getGoodsDetails(this.data.goods_id);
  },
  
  //获取商品详情
  async getGoodsDetails(goods_id) {
    const res = await request({url: "/goods/detail", data: {goods_id}})
    
    if (res.data.meta.status != 200) {
      console.log(res.data.meta.msg);
    }
    const data = res.data.message;
    this.setData({
      goodsDetails: data
    })
    console.log(this.data.goodsDetails)
  },
  
  //点击图片放大
  handlePrevewImage(e) {
    const current = e.currentTarget.dataset.url;
    const urls = this.data.goodsDetails.pics.map(v => v.pics_mid)
    wx.previewImage({
      current,
      urls,
    })
  },
  
  //添加购物车
  handleCartAdd() {
    //1.首先判断缓存中的购物车
    let cart = wx.getStorageSync("cart") || [];
    //2.判断商品对象是否存在数组中
    let index = cart.findIndex(v => v.goods_id === this.data.goodsDetails.goods_id)
    //3.不在数组中,第一次添加
    if (index === -1) {
      //添加标识属性
      this.data.goodsDetails.num = 1;
      this.data.goodsDetails.checked = true;
      //将该商品添加到本地
      cart.push(this.data.goodsDetails)
    }else{
      //存在数组中,则商品数量+1
      cart[index].num++;
    }
    //判断完成后将数据重新保存到本地中
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title:"加入购物车成功",
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