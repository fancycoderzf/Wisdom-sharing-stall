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
    seatList: [],
    selectedSeat: [],
    scaleValue: 1,
    hidden: "hidden",
    maxSelect: 1,
    timer: null,
    show: false
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
    let that = this;
    that.setData({
      //screenHeight : 屏幕高度 statusBarHeight ： 状态栏高度
      seatArea: getApp().globalData.screenHeight - getApp().globalData.statusBarHeight - (500 * getApp().globalData.screenWidth / 750),
      rpxToPx: getApp().globalData.screenWidth / 750
    });
    this.getIcon()
    that.setData({
      id: options.id,
      name: options.name,
      startTime: options.startTime,
      closeTime: options.closeTime,
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
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getStallData',
      // 传给云函数的参数
      data: {
        id: that.data.id
      },
      success: function (res) {
        let seatList = that.prosessSeatList(res.result.data);
        that.setData({
          seatList: seatList,
          seatTypeList: that.data.seatTypeList,
          selectedSeat: [],
          hidden: "hidden",
        });
        //计算X和Y坐标最大值
        that.prosessMaxSeat(seatList);
        //按每排生成座位数组对象
        that.creatSeatMap()
      },
      fail: console.error
    })




  },
  //解决官方bug
  handleScale: function (e) {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    let timer = setTimeout(() => {
      this.setData({
        seatArea: this.data.seatArea
      });
    }, 200)
  },

  // 根据seatList 生成一个类map的对象 key值为gRow坐标 value值为gRow为key值的数组
  creatSeatMap: function () {
    let seatList = this.data.seatList
    var obj = {}
    for (let index in seatList) {
      let seatRowList = seatList[index].gRow
      if (seatRowList in obj) {
        // 原本数组下标
        seatList[index].orgIndex = index
        obj[seatRowList].push(seatList[index])
      } else {
        let seatArr = []
        // 原本数组下标
        seatList[index].orgIndex = index
        seatArr.push(seatList[index])
        obj[seatRowList] = seatArr
      }
    }
    this.setData({
      seatMap: obj
    })
  },

  prosessSeatList: function (response) {
    //修改这个地方
    let resSeatList = response
    resSeatList.forEach(element => {
      // 获取座位的类型的首字母
      let firstNumber = element.type.substr(0, 1)
      // 加载座位的图标
      let seatType = this.data.seatTypeList;
      for (const key in seatType) {
        // 加载每个座位的初始图标defautIcon 和 当前图标 nowIcon
        if (element.type === seatType[key].type) {
          element.nowIcon = seatType[key].icon
          element.defautIcon = seatType[key].icon
        }
        // 根据首字母找到对应的被选中图标
        if (firstNumber + '-1' === seatType[key].type) {
          element.selectedIcon = seatType[key].icon
        }
        // 根据首字母找到对应的被选中图标
        if (firstNumber + '-2' === seatType[key].type) {
          element.soldedIcon = seatType[key].icon
        }
      }
      // 如果座位是已经售出 和 维修座位 加入属性canClick 判断座位是否可以点击
      if (element.defautIcon === element.soldedIcon) {
        element.canClick = false
      } else {
        element.canClick = true
      }
    })
    return resSeatList
  },

  //计算最大座位数,生成影厅图大小
  prosessMaxSeat: function (value) {
    let seatList = value
    let maxY = 0;
    for (let i = 0; i < seatList.length; i++) {
      let tempY = seatList[i].gRow;
      if (parseInt(tempY) > parseInt(maxY)) {
        maxY = tempY;
      }
    }
    let maxX = 0;
    for (var i = 0; i < seatList.length; i++) {
      var tempX = seatList[i].gCol;
      if (parseInt(tempX) > parseInt(maxX)) {
        maxX = tempX;
      }
    }
    let seatRealWidth = parseInt(maxX) * 70 * this.data.rpxToPx
    let seatRealheight = parseInt(maxY) * 70 * this.data.rpxToPx
    let seatScale = 1;
    let seatScaleX = 1;
    let seatScaleY = 1;
    let seatAreaWidth = 630 * this.data.rpxToPx
    let seatAreaHeight = this.data.seatArea - 200 * this.data.rpxToPx
    if (seatRealWidth > seatAreaWidth) {
      seatScaleX = seatAreaWidth / seatRealWidth
    }
    if (seatRealheight > seatAreaHeight) {
      seatScaleY = seatAreaHeight / seatRealheight
    }
    if (seatScaleX < 1 || seatScaleY < 1) {
      seatScale = seatScaleX < seatScaleY ? seatScaleX : seatScaleY
    }
    this.setData({
      maxY: parseInt(maxY),
      maxX: parseInt(maxX),
      seatScale: seatScale,
      seatScaleHeight: seatScale * 70 * this.data.rpxToPx
    });
  },

  // 点击每个座位触发的函数
  clickSeat: function (event) {
    let index = event.currentTarget.dataset.index;
    if (this.data.seatList[index].canClick) {
      if (this.data.seatList[index].nowIcon === this.data.seatList[index].selectedIcon) {
        this.processSelected(index)
      } else {
        this.processUnSelected(index)
      }
    }
    if (this.data.selectedSeat.length == 0) {
      this.setData({
        hidden: "hidden"
      });
    }

    let _selectedSeatList = this.data.selectedSeat
    let totalPrice = 0
    for (const key in _selectedSeatList) {
      let price = parseInt(_selectedSeatList[key].price);
      totalPrice += price;
    }
    this.setData({
      totalPrice: totalPrice
    })
  },
  // 处理已选的座位
  processSelected: function (index) {
    let _selectedSeatList = this.data.selectedSeat
    let seatList = this.data.seatList
    // 改变这些座位的图标为初始图标 并 移除id一样的座位
    seatList[index].nowIcon = seatList[index].defautIcon
    for (const key in _selectedSeatList) {
      if (_selectedSeatList[key].id === seatList[index].id) {
        _selectedSeatList.splice(key, 1)
      }
    }
    this.setData({
      selectedSeat: _selectedSeatList,
      seatList: seatList
    })
  },
  // 处理未选择的座位
  processUnSelected: function (index) {
    let _selectedSeatList = this.data.selectedSeat
    let seatList = this.data.seatList
    if (_selectedSeatList.length >= this.data.maxSelect) {
      wx.showToast({
        title: '最多只能选择' + this.data.maxSelect + '个座位哦~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 改变这些座位的图标为已选择图标
    seatList[index].nowIcon = seatList[index].selectedIcon
    // 记录 orgIndex属性 是原seatList数组中的下标值
    seatList[index].orgIndex = index
    // 把选择的座位放入到已选座位数组中
    let temp = {
      ...seatList[index]
    }
    _selectedSeatList.push(temp)
    this.setData({
      selectedSeat: _selectedSeatList,
      seatList: seatList,
      hidden: ""
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