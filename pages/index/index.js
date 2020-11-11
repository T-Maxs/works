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
    swiperList: [{
        "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
        "open_type": "navigate",
        "goods_id": 55596,
        "navigator_url": "/pages/goods_detail/main?goods_id=129"
      }, {
        "image_src": "https://api-hmugo-web.itheima.net/pyg/banner2.png",
        "open_type": "navigate",
        "goods_id": 17928,
        "navigator_url": "/pages/goods_detail/main?goods_id=395"
      }, {
        "image_src": "https://api-hmugo-web.itheima.net/pyg/banner3.png",
        "open_type": "navigate",
        "goods_id": 55760,
        "navigator_url": "/pages/goods_detail/main?goods_id=38"
    }],
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
    this._homeFloor();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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