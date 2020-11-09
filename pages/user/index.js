// pages/user/index.js
import {
  getSetting,
  openSetting,
  chooseAddress
} from "../../utils/util.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collects:[
      {
        text:"收藏的店铺",
        num:0
      },
      {
        text:"收藏的商品",
        num:0,
        url:"/pages/collect/collect"
      },
      {
        text:"关注的商品",
        num:0
      },
      {
        text:"我的足迹",
        num:0
      }
    ],
  },
  //添加修改收件地址
  addCity:function() {
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
  //处理支付操作，但是目前需要企业才能够进行支付操作，只是模拟支付功能。
  handlePay:function() {
    wx.navigateTo({
      url: '../pay/pay',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    // wx.showToast({
    //   title: '暂时不可以进行支付功能哦！',
    //   icon: 'none'
    // })
  },
  //关于收藏商品店铺跳转逻辑
  navigatePage:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: function(res){
        // success
      },
      fail: function() {
          wx.showToast({
            title: '暂时未提供该功能',
            icon: 'none'
          })
      },
      complete: function() {
        // complete
        wx.showToast({
          title: '暂时未提供该功能',
          icon: 'none'
        })
      }
    })
  },
  //登录按钮
  handleGetUserInfo(e) {
    console.log(e);
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      userInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect');
    const numCollect = `collects[1].num`;
    if(userInfo.nickName){
      this.setData({
        userInfo,
        [numCollect]:collect.length
      })
    }
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