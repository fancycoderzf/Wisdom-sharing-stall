// pages/apply/index/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '步骤一',
        desc: '描述信息',
      },
      {
        text: '步骤二',
        desc: '描述信息',
      },
      {
        text: '步骤三',
        desc: '描述信息',
      },
    ],
    active: 0,
    isDisabled: true,
    checked: false,
    brand: "",
    //存储用户输入的品牌数据
    type: "",
    //用户选择的品牌数据
    sex: "",
    //用户输入的性别
    showType: false,
    typeDirection: "down",
    columns: ['食品类', '服装类', '图书类', '手工艺品类', '农产品类', '娱乐消遣类'],
    activeNames: ['1'],
    brandError: ""
  },
  open: function (res) {
    this.setData({
      activeNames: res.detail,
    });
  },
  selectType: function (res) {
    var that = this
    //console.log(res.detail)
    that.setData({
      type: res.detail.value,
      showType: false
    })
  },
  showType: function () {
    var that = this
    that.setData({
      showType: true
    })
  },
  closeType: function () {
    var that = this
    that.setData({
      showType: false
    })
  },
  change: function () {
    var that = this
    that.setData({
      active: 1
    })
  },
  apply: function () {
    var that = this
    if (that.data.brand == "") {
      that.setData({
       // brandError: "品牌名称不能为空"
      })
    } else {
      that.setData({
        brand: that.data.brand,
        active: 2
      })
      Dialog.alert({
        title: '提交申请',
        message: '您的申请已提交，将于3-5个工作日之内给予回复',
      }).then(() => {
        // on close
        wx.navigateBack({
          delta: 1
        })
        that.setData({
          active: 0
        })
      });
    }

  },
  onChange: function (res) {
    var that = this
    if (res.detail) {
      that.setData({
        checked: true,
        isDisabled: false
      })
    } else {
      that.setData({
        checked: false,
        isDisabled: true
      })
    }
  },
  brand: function (res) {
    console.log(res.detail)
    this.data.brand = res.detail
    if (res.detail == "" ) {
      this.setData({
        brandError: "品牌名称不能为空"
      })
    } else if (this.data.brandError != "") {
      this.setData({
        brandError: ""
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