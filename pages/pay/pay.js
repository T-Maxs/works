// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    priceAll: 0,
    numAll: 0
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
  //支付 因为要企业级id才行 暂无
  handlePay() {
    wx.showToast({
      title: '暂时不可以进行支付功能',
      icon: 'none'
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
    this.calculPrice();
  }

})