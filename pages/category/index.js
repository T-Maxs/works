// pages/category/index.js
import {category} from "../../service/category"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftTitles:[],
    rightTitles:[],
    currIndex:0,
    stp:0
  },
  cates:[],
// 获取分类数据
  _category(){
    category().then(res => {
      // console.log(res); 
      this.cates = res.data.message;
      // 此时数据已经请求过来了 将它存储到本地
      wx.setStorageSync('cates', {time:Date.now(),data:this.cates})
      let index = this.data.currIndex;
      // console.log(index);
      let leftTitles = this.cates.map(res => res.cat_name);
      let rightTitles = this.cates[index].children;
      this.setData({
        leftTitles,
        rightTitles
      })
    })
  },
//左侧导航点击切换
  handleClick(e){
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    if(index === this.data.currIndex) return;
    this.setData({
      currIndex:index,
      stp:0
    })
    this._category();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    // 本地储存无数据则请求
    if(!Cates){
      this._category();
    }else{
      // 有数据再判断是否过期
      // 测试过十秒过期则重新请求数据 1000 * 10 
      if(Date.now()- Cates.time > 1000 * 1000 ){
        this._category();
      }else{
        // 没过期就使用旧数据 
        // console.log("使用旧数据");
        this.cates = Cates.data;
        let index = this.data.currIndex;
        let leftTitles = this.cates.map(res => res.cat_name);
        let rightTitles = this.cates[index].children;
        this.setData({
          leftTitles,
          rightTitles
        })
      }
    }
    
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