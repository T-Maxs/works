// pages/goods-list/goods-list.js
import { goods } from "../../service/goodList"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 0,
    pagenum: 1,
    barTitles: [
      {
        id: 0,
        name: "综合"
      },
      {
        id: 1,
        name: "销量"
      },
      {
        id: 2,
        name: "价格"
      }
    ],
    goods: [
      { name: "综合", page: 0, list: [] },
      { name: "销量", page: 0, list: [] },
      { name: "价格", page: 0, list: [] },
    ],
    currentIndex: 0,
    pagesize:10
  },
  totalPages:1,
  // 获取商品列表
  _goods(cid, pagenum) {
    goods(cid, pagenum).then(res => {
      // console.log(res);
      // 获取 总条数
      const total = res.data.message.total;
      // 计算总页数
      this.totalPages = Math.ceil(total / this.data.pagesize);
      const index = this.data.currentIndex;
      const newList = [...this.data.goods[index].list,...res.data.message.goods];
      const list = `goods[${index}].list`
      this.setData({
        [list]: newList
      })
    })
  },
  // 导航栏回传
  togTab(event) {
    let index = event.detail.index;
    // console.log("点击了", index);
    this.setData({
      currentIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.cid
    })
    // console.log(this.data.cid);
    this._goods(this.data.cid, this.data.pagenum);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      currentIndex:0,
      goods:[
        { name: "综合", page: 0, list: [] },
        { name: "销量", page: 0, list: [] },
        { name: "价格", page: 0, list: [] },
      ],
      pagenum:1
    })
    this._goods(this.data.cid, this.data.pagenum);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("到底部了");
    // console.log(this.totalPages);
    if(this.data.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有更多啦~',
      })
    }else{
      // console.log("加载ing");
      let pagenum = this.data.pagenum;
      this.setData({
        pagenum:++pagenum
      })
      // console.log(this.data.pagenum);
      this._goods(this.data.cid, this.data.pagenum);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})