// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bars:[{name:"体验问题",id:0},{name:"商品商家授权",id:1}],
    curIndex:0,
    changeId:10,
    changes:["功能建议","购买遇到问题","商品问题","其他"],
    textVal:'',
    imgs:[]
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
    // 文本域的输入的事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 点击选择图片
  handleChooseImg(){
    wx.chooseImage({
      count: 5,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:(result) =>{
        this.setData({
          imgs:[...this.data.imgs,...result.tempFilePaths]
        })
      }
    })
  },
  // 点击移除图片
  handleOff(e){
    console.log(e.currentTarget.dataset);
    let {index} = e.currentTarget.dataset;
    const {imgs} = this.data;
    imgs.splice(index,1);
    this.setData({
      imgs
    })
  },
   // 外网的图片的路径数组
   UpLoadImgs: [],
  // 提交
  handleSubmit(){
    const {textVal,imgs} = this.data;
    if(!textVal.trim()){
      wx.showToast({
        title:"输入不合法",
        icon:'none',
        mask:true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中ing...',
      mask:true
    })
    if(imgs.length > 0){
      imgs.map((value,index) =>{
        wx.uploadFile({
          // 被上传的路径
          filePath: value,
          // 文件名称
          name: 'imgFile',
          // 上传地址
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          // 顺带的文本信息
          formData:{},
          success:(result) =>{
            console.log(result);
            // 解析字符串成对象 调用里面的url
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            if(index === imgs.length - 1){
              wx.hideLoading();
              this.setData({
                textVal:'',
                imgs:[]
              })
              wx.navigateBack({
                delta: 1,
              });
            }
          }
        })

      })
    }else{
      console.log("只上传文字");
      wx.hideLoading();
      wx.navigateBack({
        delta: 1,
      });
    }
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