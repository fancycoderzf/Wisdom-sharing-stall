import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    applyed: false,
    //系统默认值设为true
    //是否提交过申请
    brand: "",
    type: "",
    name: "",
    idcard: "",
    tel: "",
    condition: "",
    createTime: "",
    reapply: true
  },
  showApply: function (res) {
    //console.log(res.detail.length)
    if (res.detail.length == 2) {
      //console.log("展开面板")
      this.search()
      setTimeout(() => {
        wx.hideLoading();
        if (this.data.applyed) {
          //console.log("拿到数据了呀")
          this.setData({
            activeNames: res.detail,
          });
        } else {
          Notify({
            type: 'warning',
            message: '当前尚未收到申请,请重试'
          })
        }
      }, 1000)
    } else {
      //此处主要是如果搜到数据而且展开面板之后可以调用这里折叠面板
      this.setData({
        activeNames: res.detail,
      });
    }
  },

  search() {
    var that = this
    wx.showLoading({ //弹出框显示内容，当出现hideloading时消失
      title: '加载中',
    })
    db.collection('apply')
      .where({
        _openid: wx.getStorageSync('openid')
      })
      .get({
        success(res) {
          //console.log(res.data.length)
          if (res.data.length == 0) {
            //console.log("执行了")
            that.setData({
              applyed: false
            })
          } else {
            if (res.data[0].condition == "-1") {
              that.setData({
                reapply: false
              })
            }
            that.setData({
              applyed: true,
              brand: res.data[0].brand,
              type: res.data[0].type,
              name: res.data[0].principal.name,
              idcard: res.data[0].principal.idcard,
              tel: res.data[0].principal.tel,
              createTime: res.data[0].createTime.toLocaleString(),
              condition: res.data[0].condition
            })
          }

        },
        fail() {
          console.log("当前用户没有提交过申请或请求数据失败")
        }
      })
  },
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: function (res) {
        var openid = res.result.openid
        wx.setStorageSync('openid', openid)
        //本地缓存当前用户的openid
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
    this.getOpenid()
    //获得用户的openid
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
        active: 0
      });
    }
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

  },
  gotoPage: function () {
    wx.navigateTo({
      url: '/pages/message/message?brand=' + this.data.brand + '&type=' + this.data.type + '&name=' + this.data.name + '&idcard=' + this.data.idcard + '&tel=' + this.data.tel + '&createTime=' + this.data.createTime + '&condition=' + this.data.condition
    })
  }

})