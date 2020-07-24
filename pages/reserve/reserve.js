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
    latitude: "33.27229",
    longitude: "113.009854",
    scale: 15,
    markers: [],
    show: false,
  },
  getLocation: function (res) {
    console.log(res.detail.latitude)
    console.log(res.detail.longitude)
  },
  onChangeSearch: function (res) {
    console.log(res)
    //this.data.address = res
  },
  onSearchAddress: function () {

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
  getStallLocation: function () {
    //获得模拟的摊位规划区数据，添加对应的标记
    var that = this
    var markersLatitude = []
    var markersLongitude = []
    var id = []
    var i = 0
    db.collection('markers').get({
      success: function (res) {
        //console.log(res.data.length)
        for (i; i < res.data.length; i++) {
          markersLatitude.push(res.data[i].latitude)
          markersLongitude.push(res.data[i].longitude)
          id.push(res.data[i]._id)
        }
        i = 0
        if (markersLatitude.length > 0) {
          var markers = []
          while (i < markersLatitude.length) {
            var marker = {
              id: "",
              iconPath: 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png',
              latitude: "",
              longitude: "",
              width: 30,
              height: 30
            }
            marker.id = id[i]
            marker.latitude = markersLatitude[i],
              marker.longitude = markersLongitude[i],
              markers.push(marker)
            i++
          }
          that.setData({
            markers: markers
          })
        }
      }
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  showDetail: function (res) {
    var id = res.markerId
    db.collection('markers').where({
        _id: id
      })
      .get({
        success: function (res) {
          this.setData({
            show: true
          })
          
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStallLocation()
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      });
    }
    //this.getAddress()
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