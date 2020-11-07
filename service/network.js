import { baseUrl } from "./config";
// 同时发送异步代码的次数
let ajaxTimes = 0;
export default function request(option) {
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + option.url,
      method: option.method || "get",
      data: option.data || {},
      success: resolve,
      fail: reject,
      complete: function () {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //  关闭正在等待的图标
          wx.hideLoading();
        }
      }
    })
  })
}