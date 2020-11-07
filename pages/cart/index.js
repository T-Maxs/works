// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress
} from "../../utils/util.js"

// const Remove = require("../../service/remove.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    checkAll: true,
    priceAll: 0,
    numAll: 0
  },
  // 点击添加收货地址 获取地址权限
  addCity() {
    getSetting().then(res => {
      console.log(res);
      const scope = res.authSetting["scope.address"];
      console.log(scope);
      if (scope === false) {
        openSetting().then(res => {
          console.log(res);
        })
        return;
      }
      chooseAddress().then(res => {
        // console.log(res);
        let address = res;
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync('address', address);
      })
    })
  },
  //点击改变商品选择状态
  handelChange: function (e) {
    // console.log("改变了",e.detail);
    const id = e.detail;
    const cart = this.data.cart;
    let index = cart.findIndex(v => v.goods_id === id)
    cart[index].checked = !cart[index].checked;
    wx.setStorageSync('cart', cart)
    this.setData({
      cart
    })
    this.goodsAll();
    this.calculPrice();
  },
  // 点击增加数量
  handelAdd(e) {
    // console.log("增加了");
    const id = e.detail;
    const cart = this.data.cart;
    let index = cart.findIndex(v => v.goods_id === id)
    cart[index].num++;
    wx.setStorageSync('cart', cart)
    this.setData({
      cart
    })
    this.calculPrice();
  },
  // 点击减少数量
  handelSub(e) {

    // console.log("减少了");
    const id = e.detail;
    const cart = this.data.cart;
    console.log(cart)
    let index = cart.findIndex(v => v.goods_id === id);

    //判断商品购买的数量值是否小于0，小于即自己判断删除
    if (cart[index].num <= 1) {
      console.log(cart[index].num)
      this.data.cart.splice(index, 1)
    } else {
      cart[index].num--;
    }
    wx.setStorageSync('cart', cart)
    this.setData({
      cart: this.data.cart
    })
    this.calculPrice();

  },
  // 全选按钮
  handelAllChange() {
    const cart = this.data.cart;
    if (cart.length === 0) {
      this.setData({
        checkAll: false
      })
      return;
    }
    this.data.checkAll = !this.data.checkAll;
    // this.setData({
    //   checkAll:!checkAll
    // })
    cart.map(v => v.checked = this.data.checkAll);
    wx.setStorageSync('cart', cart)
    this.setData({
      cart
    })
    this.calculPrice();
  },
  // 判断商品是否全选了
  goodsAll() {
    const cart = this.data.cart;
    if (cart.length === 0) {
      this.setData({
        checkAll: false
      })
      return;
    }
    let index = cart.findIndex(v => v.checked === false);
    // 说明有没有选中的商品
    if (index !== -1) {
      this.setData({
        checkAll: false
      })
    } else {
      console.log(121);
      this.setData({
        checkAll: true
      })
    }
  },
  // 计算商品总价
  calculPrice() {
    const cart = this.data.cart;
    let price = 0;
    let num = 0;
    cart.map(v => {
      if (v.checked) {
        price += (v.goods_price * v.num)
        num += v.num;
      }
    });
    // console.log(price);
    this.setData({
      priceAll: price,
      numAll: num
    })
  },
  // 跳转到支付页面
  handlePay() {
    // 先判断是否有收货地址
    const address = this.data.address;
    const numAll = this.data.numAll;
    if (!address) {
      wx.showToast({
        title: '你还没有选择收货地址哦',
        icon: 'none'
      })
      return;
    }
    if (numAll === 0) {
      wx.showToast({
        title: '你还没有选中物品呀',
        icon: 'none',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address,
      cart
    })
    this.goodsAll();
    this.calculPrice();
  }
})