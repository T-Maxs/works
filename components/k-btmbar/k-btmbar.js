// components/k-btmbar/k-btmbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    addCart(){
      this.triggerEvent("addCart")
    },
    getpay:function(){
      wx.showToast({
        title:'暂时不支持付款哦',
        icon:'none'
      })
    }
  }
})
