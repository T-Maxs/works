// components/k-swiper/k-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: {
      type: Array,
      value: []
    },
    wdh: {
      type: Number,
      value: 340
    },
    w: {
      type: Number,
      value: 100
    }
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
    handelImg:function(e) {
      console.log(e.currentTarget.dataset.goodsid)
      let real_id = "../../pages/goods-detial/goods-detial?goods_id="+e.currentTarget.dataset.goodsid
      console.log(real_id)
      wx.navigateTo({
        url:  real_id,
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: e=> {
          // complete
          console.log(e)
        }
      })
      if (this.properties.wdh === 340) return;
      const urls = this.properties.swiperList.map(res => res.pics_big);
      const current = e.currentTarget.dataset.url;
      // console.log(current);
      wx.previewImage({
        urls,
        current
      })
      
    }
  }
})