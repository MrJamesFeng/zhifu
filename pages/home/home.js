// pages/home/home.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    // hideLoading:false
    // stories:[],
    others:[],
    top_stories:[],
    screenHeight:0,
    screenWidth:0,
    dataList:[],
    dataListDateCurrent:0,
    dataListDateCount:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSystemInfo({
      success: (res) => { this.setData({ screenHeight: res["screenHeight"], screenWidth: res["screenWidth"]})},
    })

    // 精选
    util.AJAX("news/latest",(res)=>{
      console.log("精选")
      console.log(res)
      var dateData = {}
      var dataListDateCurrent = res["date"]
      dateData["dateDay"] = util.getFormatDate(dataListDateCurrent)["dateDay"]
      dateData["stories"] = res["stories"]
      this.setData({ top_stories: res["top_stories"], dataList: [dateData], dataListDateCurrent: dataListDateCurrent})
      // console.log(this.data)
      
    })

    // 日报
    util.AJAX("themes", (res)=> {
      // console.log("日报")
      // console.log(res)
      this.setData({ others: res["others"]})
      // console.log(this.data)

    });
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
  
  },

  changeType:function(e){
    var selectedType = e.currentTarget.dataset.type
    var currentTab = this.data.currentTab
    if(selectedType == currentTab){
      return
    }

    this.setData({ currentTab: selectedType})
  },

  
  scrolltolower:function(e){ 
    console.log(e)
    util.AJAX("news/before/" + this.data.dataListDateCurrent, (res)=> {
      console.log("news/before/")
      console.log(res)
      var dateData = {}
      var dataListDateCurrent = res["date"]
      dateData["dateDay"] = util.getFormatDate(dataListDateCurrent)["dateDay"]
      dateData["stories"] = res["stories"]
      this.setData({ dataList: this.data.dataList.concat(dateData), dataListDateCurrent: dataListDateCurrent })
      // console.log(this.data)
    })
  }
  
})