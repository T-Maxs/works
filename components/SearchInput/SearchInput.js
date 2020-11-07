// components/SearchInput/SearchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框内容变化时
    handleInput(e){
      const {value} = e.detail;
        this.setData({
          value
        })
        // console.log(this.data.value);
        this.triggerEvent("handleInput",value)
    },
    // 点击搜索时
    handleTrue(){
      const value = this.data.value;
      this.triggerEvent("handleTrue",value)
    }
  }
})
