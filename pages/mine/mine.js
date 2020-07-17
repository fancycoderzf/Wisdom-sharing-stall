// pages/mine/mine.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    name: "123",
    check: false,
    checkloading: false,
  },

  bindGetUser() {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                checkloading: true,
                check: true,
                name: res.userInfo.nickName,
                imgUrl: res.userInfo.avatarUrl
              })
            },
            fail: function () {
              console.log("获取用户信息失败")
            }
          })
        }
      },
      fail: function () {
        console.log("获取用户授权失败")
      }
    })
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
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              console.log("成功登录")
            },
            fail: function () {
              console.log("登录失败")
            }
          })
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                check: true,
                name: res.userInfo.nickName,
                imgUrl: res.userInfo.avatarUrl
              })
            },
            fail: function () {
              console.log("获取用户信息失败")
            }
          })
        }
      }
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