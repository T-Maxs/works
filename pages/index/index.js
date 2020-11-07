//index.js
import {
  homeSwiper,
  homeCates,
  homeFollor
} from "../../service/home"
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [{
      'name': '电器',
      'image_src': 'https://api-hmugo-web.itheima.net/pyg/icon_index_nav_4@2x.png'
    }, {
      'name': '秒杀',
      'image_src': 'https://api-hmugo-web.itheima.net/pyg/icon_index_nav_3@2x.png'
    }, {
      'name': '超市',
      'image_src': 'https://api-hmugo-web.itheima.net/pyg/icon_index_nav_2@2x.png'
    }, {
      'name': '母婴',
      'image_src': 'https://api-hmugo-web.itheima.net/pyg/icon_index_nav_1@2x.png'
    }],
    floors: []
  },
  // 获取轮播图数据
  _homeSwiper() {
    homeSwiper().then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  // 获取分类导航数据
  _homeCates() {
    // homeCates().then(res => {
    //   // console.log(res);
    //   this.setData({
    //     catesList: res.data.message
    //   })
    //   console.log(this.data.catesList)
    // })
  },
  // 获取楼层数据
  _homeFloor() {
    homeFollor().then(res => {
      // console.log(res);
      this.setData({
        floors: res.data.message
      })
      console.log(this.data.floors)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._homeSwiper();
    this._homeCates();
    this._homeFloor();
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