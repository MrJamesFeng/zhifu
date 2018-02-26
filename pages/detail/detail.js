// pages/detail/detail.js

var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    databody:[],
    comments:[],
    shareBoxDisplay:"none",
    modalHidden:true,
    modalValue:"",
    winHeight:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // console.log(options)
  wx.getSystemInfo({
    success: (res)=> {
      this.setData({ winHeight: res.screenHeight})
    },
  })
  var id = options["id"];
    util.AJAX("news/" + id,(res)=>{
      console.log(res)
      var body = res.body;
      body = body.match(/<p>.*?<\/p>/g);
      // console.log(body)
      var ss = [];
      for (var i = 0, len = body.length; i < len; i++) {
        ss[i] = /<img.*?>/.test(body[i]);
        if (ss[i]) {
          body[i] = body[i].match(/(http:|https:).*?\.(jpg|jpeg|gif|png)/);
        } else {
          body[i] = body[i].replace(/<p>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/<strong>/g, '')
            .replace(/<\/strong>/g, '')
            .replace(/<a.*?\/a>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&ldquo;/g, '"')
            .replace(/&rdquo;/g, '"');
        }
      }
      // 重新写入数据
      this.setData({
        databody: body,
        title: res.title
      });
      // console.log(this.data)
      util.AJAX("story/" + id + "/short-comments",(res)=>{
        this.setData({ comments: res.comments})
        // console.log(this.data)
      })
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
  shareAction:function(e){
    
    this.setData({ shareBoxDisplay:"block"})
  },
  shareModel:function(e){
    // console.log(e)
    
    this.setData({ modalHidden: false, modalValue: e.currentTarget.dataset.source})
  },
  shareClose:function(e){
    this.setData({ shareBoxDisplay: "none" })
  },
  modalChange:function(e){
    // console.log("modalChange")
    this.setData({ modalHidden: true })
    
  }

})