// pages/stall/stall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //nowTime:"",
    day: "01 -01",
    h: "00",
    m: "00",
    s: "00",
    Con:true,
    message:"开始摆摊"
  },
  //插入1
  setInterval: function () {
    var that = this
    var s = that.data.s
    var m = that.data.m
    var h = that.data.h0
    s++
    //console.log("现在的时间球球了" + s + ":" + h + ":" + m)
    setInterval(function () { // 设置定时器
      s++
      if (s >= 60) {
        s = 0 //  大于等于60秒归零
        m++
        if (m >= 60) {
          m = 0 //  大于等于60分归零
          h++
          if (h < 10) {
            // 少于10补零
            that.setData({
              h: '0' + h
            })
          } else {
            that.setData({
              h: h
            })
          }
        }
        if (m < 10) {
          // 少于10补零
          that.setData({
            m: '0' + m
          })
        } else {
          that.setData({
            m: m
          })
        }
      }
      if (s < 10) {
        // 少于10补零
        that.setData({
          s: '0' + s
        })
      } else {
        that.setData({
          s: s
        })
      }
    }, 1000)
  },
  getTime: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getTime',
      success: function (res) {
        console.log(res.result)
        //研究一下在本地进行倒计时的效果
        that.setData({
          day: res.result.day,
          h: res.result.h,
          m: res.result.m,
          s: res.result.s
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
  removeS:function(){
    wx.removeStorage({
      key: 'key1'
  })
},
  onLoad: function (options) {
    wx.setStorage({
      data: true,
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
  ChangeCon:function(){
    var that=this
   wx.getStorage({
     key: 'key1',
     success(res){
       console.log(res.data)
       var con=res.data
       if(con){
         that.setData({
           message:"开始摆摊"
         })
       }
       else{
         that.setData({
           message:"结束摆摊"
         })
       }
       wx.setStorage({
         data: !con,
         key: 'key1',
         success(res){
           console.log("存储数据",!con)
         }
       })
     },
     //如果本地没有key1标签
     fail(){
      that.setData({
        Con:false,
        message:"结束摆摊"
      })
      wx.setStorage({
        data: that.data.Con,
        key: 'key1',
      })
     }
   })
   wx.switchTab({
     url: '/pages/mine/mine',
   })
  },

  onShow: function () {
    //获得当前的服务器时间
    this.getTime()
    //异步操作，1秒之后更新
    setTimeout(() => {
      this.setInterval()
    }, 1000)
    this.setInterval()
    //根据本地缓存获得当前状态
    
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