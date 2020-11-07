// components/k-tabbar/k-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    barTitles:{
      type:Array,
      value:[]
    },
    curIndex:{
      type:Number,
      value:0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // curIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    togTitle(e){
      // console.log(e.currentTarget.dataset.id);
      let index = e.currentTarget.dataset.id;
      // this.setData({
      //   curIndex:index
      // })
      this.triggerEvent("togTab",{index})
    }
  },
 
})
