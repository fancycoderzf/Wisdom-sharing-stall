const db = wx.cloud.database()
var jsonData = require('../../data/json.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    startTime: "",
    closeTime: "",
    seatTypeList: "",
  },

  getNameAndTime: function () {
    const eventChannel = this.getOpenerEventChannel();
    var that = this
    //从上一个页面拿到数据
    eventChannel.on('startReserve', function (data) {
      that.setData({
        id: data.id
      })
    })
    db.collection('markers').where({
        _id: that.data.id
      })
      .get({
        success: function (res) {
          that.setData({
            name: res.data[0].name,
            startTime: res.data[0].start_time,
            closeTime: res.data[0].close_time,
          })
        }
      })
  },

  getIcon: function () {
    var that = this
    var res = jsonData.dataList
    if (res.errorCode == 0) {
      that.setData({
        seatTypeList: res.seatTypeList,
      })  
    }
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
    this.getNameAndTime()
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