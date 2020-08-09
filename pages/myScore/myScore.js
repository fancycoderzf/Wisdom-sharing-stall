const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: false
  },

  addScore: function () {
    var that = this
    var nowScore = that.data.myScore
    nowScore++
    that.setData({
      myScore: nowScore
    })
  },

  setNavigationBar: function () {
    wx.setNavigationBarTitle({
      title: '我的积分',
    })
  },
  getScore: function () {
    var that = this
    db.collection('apply')
      .where({
        _openid: wx.getStorageSync('openid')
      })
      .get({
        success: function (res) {
          var score = res.data[0].nowScore
          that.setData({
            myScore: score,
            check: true
          })
          wx.hideLoading({})
        },
        fail: function (res) {
          console.log("我失败了")
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setNavigationBar()
    this.getScore()
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
    wx.showLoading({
      title: '加载中',
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