// pages/goods-detial/goods-detial.js
import { goodsDetial } from "../../service/goodsDetial"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,
    goodsMain: {},
    likeShow: true
  },
  // 获取商品详情数据
  _goodsDetial(goodsId) {
    goodsDetial(goodsId).then(res => {
      // console.log(res.data.message);
      this.setData({
        goodsMain: res.data.message
      })
      // 判断是否收藏 初始化图片状态
      let collect = wx.getStorageSync('collect') || [];
      let index = collect.findIndex(v => v.goods_id === this.data.goodsMain.goods_id);
      if (index != -1) {
        this.setData({
          likeShow: false
        })
      } else {
        this.setData({
          likeShow: true
        })
      }
    })
  },
  //点击切换收藏状态
  togLike() {
    //默认设置为没收藏
    let flag = false;
    // 获取本地收藏数据
    let collect = wx.getStorageSync('collect') || [];
    // console.log(this.data.goodsId);
    // 查找是否已收藏
    let index = collect.findIndex(v => v.goods_id === this.data.goodsMain.goods_id);
    // console.log(index);
    if (index != -1) {
      // 已收藏 删除对应位置的信息
      collect.splice(index, 1);
      flag = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      // 未收藏 添加商品信息
      collect.push(this.data.goodsMain);
      flag = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // console.log(collect);
    // 保存数据到本地 已收藏需要删 为收藏需要增 所以最后需要重新保存
    wx.setStorageSync('collect', collect);
    // console.log(flag);
    // 设置图片状态
    this.setData({
      likeShow: !flag
    })
  },
  //加入购物车
  addCart(){
    console.log("点击了加入购物车");
    const cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.data.goodsMain.goods_id);
    if(index === -1){
      // 这里可以不用setdata 因为不是本页面需要渲染的数据可以不实时变化
      this.data.goodsMain.num = 1;
      this.data.goodsMain.checked = true;
      cart.push(this.data.goodsMain);
    }else{
      // 这里用index 是为了正确位置上增加数量
      cart[index].num++;
    }
    console.log(cart);
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon:"success",
      mark:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      goodsId: options.goods_id
    })
    // console.log(this.data.goodsId);
    this._goodsDetial(this.data.goodsId);

  },
// 分享设置
  onShareAppMessage(options){
    return {
      title:this.data.goodsMain.goods_name,
      path:'/pages/goods-detial/goods-detial?goods_id='+this.data.goodsId,
      imageUrl:this.data.goodsMain.goods_small_logo
    }
  },
})