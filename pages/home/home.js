// pages/home/home.js
const app = getApp(); //获取全局app.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autopaly: false,
    circular: true,
    interval: 2000,
    duration: 500,
    perviousMargin: 0,
    nextMargin: 0,
    imgUrls: ['http://www.afinance.cn/new/UploadFiles_2266/201203/20120331202316974.jpg',
      'http://dc.yesky.com/uploadImages/2010/057/ZJ62AI95JTQH_26.jpg',
      'http://sh.eastday.com/images/thumbnailimg/month_1605/201605200248492311.jpg'
    ],
  },


clickMe(){

  var data = {
    where: {
      recommend: 1
    },
    limit: 6,
  };
  app.api.goodsList(data, function (res) {
    page.setData({
      // recommend: res.data.list
    });
  });
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})