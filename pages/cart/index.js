import {getSetting, chooseAddress, openSetting, showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    allPrice: "",
    totalNum: 0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车列表数据
  },
  
  
  //获取用户地址
  async handleGetAddress() {
    try {
      const res1 = await getSetting();
      if (!res1.authSetting['scope.address']) {
        await openSetting();
      }
      const res2 = await chooseAddress()
      this.setData({
        address: res2
      })
      // 5 存入到缓存中
      wx.setStorageSync("address", this.data.address);
      console.log(this.data.address)
    } catch (e) {
      console.log(e)
    }
  },
  
  //初始化底部栏全选与价格
  setCart(cart) {
    //判断修改全选
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    //修改价格
    //计算总价格
    let allPrice = 0;
    let totalNum = 0;
    cart.forEach(value => {
      //首先判断是否勾选
      if (!value.checked) {
        return
      }
      allPrice += value.goods_price * value.num;
      totalNum += value.num;
    })
    this.setData({
      cart,
      allPrice,
      allChecked,
      totalNum
    })
  },
  
  //勾选按钮
  handleChangeChecked(e) {
    //获取传入的商品id
    let goodsId = e.currentTarget.dataset.id
    let cart = this.data.cart;
    let index = cart.findIndex(v => v.goods_id === goodsId)
    cart[index].checked = !cart[index].checked
    
    //重新计算全选与价格
    this.setCart(cart);
  },
  
  //勾选全选按钮
  handleChangeAllChecked() {
    let cart = this.data.cart;
    let allChecked = this.data.allChecked;
    let flag = false;
    //判断全选按钮
    if (!allChecked) {
      //全选为true,则点击该方法为取消全选
      flag = true
      cart.forEach(v => {
        //需要全选 并判断商品件数是否为0
        if (v.num === 0) {
          v.num = 1;
        }
      })
    }
    cart.forEach(v => v.checked = flag)
    
    this.setCart(cart)
  },
  
  //修改数量
  handleChangeNum(e) {
    let cart = this.data.cart;
    let goodsId = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    //查找对应商品
    let index = cart.findIndex(v => v.goods_id === goodsId)
    
    if (type === "add") {
      cart[index].num++;
      cart[index].checked = true;
    }
    if (type === "reduce") {
      if (cart[index].num !== 0) {
        cart[index].num--;
        cart[index].checked = true;
      }
      if (cart[index].num === 0) {
        cart[index].checked = false;
      }
    }
    this.setCart(cart)
  },
  
  //结算
  async handlePay() {
    //判断商品
    if (this.data.totalNum === 0) {
      await showToast({title:"您还没有选购商品"});
      return ;
    }
    //判断地址
    if (!this.data.address.userName) {
      await showToast({title:"您还没有选中地址"});
      return ;
    }
    //跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
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
    //获取缓存中的地址
    const address = wx.getStorageSync("address");
    //获取本地存储的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    //计算全选
    //every数组方法,会遍历接收一个回调函数,每一个回调函数都返回true则every方法的返回值为true,
    //只要遍历中有一个函数返回false,则不再执行且返回false
    //注意:空数组调用every函数,返回值也是true
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    //计算总价格
    let allPrice = 0;
    //计算总件数
    let totalNum = 0;
    cart.forEach(value => {
      //首先判断是否勾选
      if (!value.checked) {
        return
      }
      allPrice += value.goods_price * value.num;
      totalNum += value.num;
    })
    this.setData({
      address,
      cart,
      allChecked,
      allPrice,
      totalNum
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