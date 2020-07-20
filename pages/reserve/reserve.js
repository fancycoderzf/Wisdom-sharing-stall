// pages/reserve/reserve.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoLatitude: "",
    photoLongitude: "",
    latitude: "",
    longitude: "",
    scale: 15,
  },
  onFocus: function () {
    this.setData({
      photoLatitude: this.data.latitude,
      photoLongitude: this.data.longitude
    })
  },
  // 控制地图缩放级别
  onIncreaseScale() {
    let scale = this.data.scale;
    if (scale === 20) {
      return;
    }
    scale++;
    this.setData({
      scale: scale
    });
  },
  onDecreaseScale() {
    let scale = this.data.scale;
    if (scale === 3) {
      return;
    }
    scale--;
    this.setData({
      scale: scale
    });
  },
  postAddress: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting['scope.userLocation']) {
                this.getAddress()
              }
            }
          })
        } else {
          this.getAddress()
        }
      }
    })
  },
  //如果成功的话就获得用户地理位置
  getAddress: function () {
    var that = this
    wx.getLocation({
      //获得当前用户的经纬度信息
      //小程序要求数据格式
      type: 'gcj02',
      isHighAccuracy: true,
      highAccuracyExpireTime: 4000,
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          photoLatitude: res.latitude,
          photoLongitude: res.longitude
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      });
    }
    this.getAddress()
    this.onFocus()
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