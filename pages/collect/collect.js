// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bars:[{name:"商品收藏",id:0}],
    curIndex:0,
    changeId:0,
    // changes:["全部","正在热卖","即将上线"],
    cart:[]
  },
   // 切换标签头
   togTab(e){
    let index = e.detail.index;
    this.setData({
      curIndex:index
    })
  },
  // 切换标签
  togChanges(e){
    // console.log(e.currentTarget.dataset.index);
    this.setData({
      changeId:e.currentTarget.dataset.index
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
    const cart = wx.getStorageSync("collect");
    this.setData({
      cart
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