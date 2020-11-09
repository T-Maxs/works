// pages/search/search.js
import { searchGoods } from "../../service/search"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    query: '',
    histroy: [],
    text: ""
  },
  // 请求搜索相关商品数据
  _searchGoods(query) {
    searchGoods(query).then(res => {
      // console.log(res);
      const histroy = this.data.histroy;
      const index = histroy.findIndex(v => v === query);
      if (index === -1) {
        console.log("没有找到相同的历史记录 可以存");
        histroy.push(query);
        wx.setStorageSync('histroySearch', histroy);
        this.setData({
          histroy
        })
      }
      const goods = res.data.message;
      this.setData({
        goods
      })
    })
  },
  // 搜索组件回传过来的数据
  timeId: 0,
  handleInput(e) {
    this.setData({
      text: ''
    })
    // console.log(e.detail);
    const query = e.detail;
    // 防抖请求相应数据
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      // 如果删除了为空 则不保存
      if (query === '') {
        // console.log(query,"不合法");
        clearTimeout(this.timeId);
        return;
      };
      if (query === this.data.query) return;
      this.setData({
        query
      })
      this._searchGoods(query);
    }, 3000)
  },
  // 点击搜索时
  handleTrue(e) {
    const query = e.detail;
    if (query === this.data.query) return;
    this.setData({
      query
    })
    this._searchGoods(query);
  },
  // 点击历史标签时
  handleHistroy(e) {
    // console.log(e.currentTarget.dataset.text);
    const text = e.currentTarget.dataset.text;
    this.setData({
      text
    })
    this._searchGoods(text);
  },
  // 清空历史记录
  handleClear() {
    wx.setStorageSync('histroySearch', []);
    this.setData({
      histroy: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看地址中是否有参数
    console.log(options.name);
    const text = options.name;
    if (text) {
      this.setData({
        text
      })
      this._searchGoods(text);
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
    const histroy = wx.getStorageSync('histroySearch') || [];
    this.setData({
      histroy
    })
  },
})