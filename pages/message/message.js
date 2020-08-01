// pages/message/message.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brand: "",
        type: "",
        name: "",
        idcard: "",
        tel: "",
        condition: "",
        createTime: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //查看传递数据 是否成功
        //console.log(options);
        var condition = ""
        console.log(options.condition)
        switch (options.condition) {
            case "-1":
                condition = "申请失败"
                break;
            case "0":
                condition = "已提交"
                break;
            case "1":
                condition = "申请成功"
                break;
        }
        //更新此页面的data数据
        that.setData({
            brand: options.brand,
            type: options.type,
            name: options.name,
            idcard: options.idcard,
            tel: options.tel,
            condition: condition,
            createTime: options.createTime
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
    onShow: function (options) {

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