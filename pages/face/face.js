// pages/face/face.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      msg: null,
      winWidth: 0,
      winHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  save: function(){
      wx.canvasToTempFilePath({
        canvasId: 'canvas_BG',
        success: function(res){
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
          })
        }
      }, this)
  },
  onLoad: function (options) {
      var that = this
      wx.getSystemInfo({
        success: function(res){
          console.log(res)
          that.data.winWidth = res.windowWidth
          that.data.winHeight = res.windowHeight
        }
      })
     const cav = wx.createCanvasContext("canvas_BG");
     cav.drawImage("../../BackGround.jpg",0,0,that.data.winWidth, that.data.winHeight);
     //cav.drawImage("../../qrcode.jpg", 0, 0, 100, 100)
     //cav.drawImage(this.data.src, 0, 0, 200, 200);
     cav.setFontSize(15)
     cav.fillText("请输入内容", that.data.winWidth/2, 50);
     cav.draw()
     
     
  },

  formSubmit: function(e){
      this.data.msg = e.detail.value.Page1Text;
      console.log("---------------");
      const that = this;
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    //   data: {
    //     appid: 'wx336f042533bff9f1',
    //     secret: '03eac629952d72aac4e6d4a9b0537140'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     var Image64 = null;
    //     var src = null;
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=13_r8L7c3-zuQ3PEU8S_jR-Or7D5s77oj6nShCHtxhlfY2SysmaoCOVy1gKtzAkngsN9cBxO4D1oIiYPNdKMZDOfJNygQC1M9vil_U1zVLrS9MMg_T9n3M7pGEiHAxS2xLtFEmRR6jQ7OmqWnyuLMBjAGAWXM',
          method: 'POST',
          data: {
            scene: e.detail.value.Page1Text,
            page:'pages/index/index',
          },
          //responseType:'arraybuffer',
          success: function(res){
            //Image64 = wx.arrayBufferToBase64(res.data);
            //src = "data:image/png;base64," + Image64;
            //console.log(src);
            console.log(res.data)
            const cav = wx.createCanvasContext("canvas_BG");
             cav.drawImage("../../BackGround.jpg", 0, 0, that.data.winWidth, that.data.winHeight);
             //cav.drawImage(src, 0, 0, 200, 200);
            
             
             wx.downloadFile({
               url: 'http://106.75.97.12/temp/qrcode.jpg',
               success: function(res){
                 console.log(res);
                 cav.drawImage(res.tempFilePath, 0, 0, 100, 100);
                 cav.draw();
               },
               fail: function(res){
                 console.log(res)
               }
             })
             
          }
        })
      //}
    //})

      // wx.navigateTo({
      //   url: '../index/index?msg=' + this.data.msg
      // })

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
  bindtap: function(res){
    const cav = wx.createCanvasContext("canvas_BG");
    cav.drawImage("../../BackGround.jpg", 0, 0, this.data.winWidth, this.data.winHeight);
    //cav.drawImage("../../qrcode.jpg", 0, 0, 100, 100)
    
    cav.setFontSize(15)
    cav.fillText("", this.data.winWidth / 2, 50);
    cav.draw()
  },
  bindconfirm: function(event){
    const cav = wx.createCanvasContext("canvas_BG");
    cav.drawImage("../../BackGround.jpg", 0, 0, this.data.winWidth, this.data.winHeight);
    //cav.drawImage("../../qrcode.jpg", 0, 0, 100, 100)
    
    cav.setFontSize(15)
    cav.fillText(event.detail.value, this.data.winWidth / 2, 50);
    cav.draw()
  }
})