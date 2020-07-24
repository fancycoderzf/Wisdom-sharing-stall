import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    name: "123",
    check: false,
    checkloading: false,
    message:"扫码摆摊",
  },
  scan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        console.log(res)
        var url = "/".concat(res.path)
        if (res.codeVersion == 6 || res.path != "") {
          wx.navigateTo({
            url: url,
            success: function () {
              console.log("跳转成功")
            },
            fail: function () {
              Notify({ type: 'warning', message: '页面跳转失败，请重试' });
            }
          })
        }
      }
    })
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
    wx.removeStorage({
      key: 'key1',
    })
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
              //console.log("成功登录")
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3
      });
    }
    wx.getStorage({
      key: 'key1',
      success(res){
        //console.log("mine读取",res.data)
        var con=res.data
        if(con)
        {
          that.setData({
            message:"扫码结束摆摊"
          })
        }
        else{
          that.setData({
            message:"扫码摆摊"
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