// pages/cart/children/cartItem/cartItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    isPay:{
      type:Boolean,
      value:true
    },
    isCollect:{
      type:Boolean,
      value:true
    }
  },
// 判断是不是支付页面 如果是则不能跳转
  isPayPage(){
    if(isPay){
      return `/pages/goods-detial/goods-detial?goods_id=${item.goods_id}`
    }else{
      return '/pages/index/index'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    startX: 0,
    startY: 0,
  },
  // 开始滑动
  touchStart(e) {
    console.log('touchStart=====>', e);
    let dataList = [...this.data.dataList]
    dataList.forEach(item => {
    // 让原先滑动的块隐藏
      if (item.isTouchMove) {
        item.isTouchMove = !item.isTouchMove;
      }
    });
   // 初始化开始位置
    this.setData({
      dataList: dataList,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },
// 滑动~
  touchMove(e) {
    console.log('touchMove=====>', e);
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;
    let indexs = e.currentTarget.dataset.index;
    let dataList = [...this.data.dataList]
// 拿到滑动的角度，判断是否大于 30°，若大于，则不滑动
    let angle = this.angle({
      X: this.data.startX,
      Y: this.data.startY
    }, {
      X: moveX,
      Y: moveY
    });

    dataList.forEach((item, index) => {
      item.isTouchMove = false;
      // 如果滑动的角度大于30° 则直接return；
      if (angle > 30) {
        return
      }
	
	// 判断是否是当前滑动的块，然后对应修改 isTouchMove 的值，实现滑动效果
      if (indexs === index) {
        if (moveX > this.data.startX) { // 右滑
          item.isTouchMove = false;
        } else { // 左滑
          item.isTouchMove = true;
        }
      }
    })

    this.setData({
      dataList
    })
  },

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除
  delItem(e) {
    let id = e.currentTarget.dataset.id;
    let dataList = [...this.data.dataList];
    for (let i = 0; i < dataList.length; i++) {
      const item = dataList[i];
      item.isTouchMove = false;
      if (item.id === id) {
        dataList.splice(i, 1);
        break;
      }
    }

    this.setData({
      dataList
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handelChange(){
      this.triggerEvent("handelChange",this.properties.item.goods_id)
    },
    handelAdd(){
      this.triggerEvent("handelAdd",this.properties.item.goods_id)
    },
    handelSub(){
      this.triggerEvent("handelSub",this.properties.item.goods_id)
    }
  }
})
