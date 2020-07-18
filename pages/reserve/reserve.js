// pages/reserve/reserve.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoLatitude: "",
    photoLongitude: "",
    photoStreet: ""
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
    var that = this
    wx.getLocation({
      //小程序要求数据格式
      type: 'gcj02',
      success: function (res) {
        //console.log("请求数据了")
        //console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        //console.log(app.qqmapsdk),
        app.qqmapsdk.reverseGeocoder({
          //输入坐标，返回对应文字信息
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            //console.log("我成功了")
            console.log(res)
            if (res.message == 'query ok') {
              //console.log(res)
              var address = res.result.address
              that.setData({
                photoLatitude: latitude,
                photoLongitude: longitude,
                photoStreet: address,
              })
              //that.chooseImg();
            }
          },
          fail: function (res) {
            console.log("我没了，为啥呀？" + res)
          },
          complete: function () {
            //console.log("我完成了，但是为啥呢？")
          }
        })
      },
    })
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