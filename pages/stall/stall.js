// pages/stall/stall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTime:""
  },
  getTime: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getTime',
      success: function (res) {
        //console.log(res.result.time)
        //研究一下在本地进行倒计时的效果
        that.setData({
          nowTime:res.result.time
        })
      },
      fail: function () {
        console.log("无法获得用户openid")
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
    this.getTime()
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