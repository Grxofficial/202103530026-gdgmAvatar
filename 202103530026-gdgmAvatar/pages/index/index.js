// pages/wechat_logo/wechat_logo.js
const app = getApp();
var context = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'/images/MvrPXpKDDFRkefb3be497b93f89fd60e4596eb6b6b38.png',
    save: false,
    hat: {
      url: '/images/gmlogowx.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.drawAvatar('frist')
  },

  getUserProfile(e) {
    const that = this
    wx.getUserProfile({
      desc: '用于给你的头像添加小挂件', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        // console.log(res.userInfo.avatarUrl)
        // console.log(res.userInfo.nickName)
        //转高清头像
        const Hdurl = headimgHD(res.userInfo.avatarUrl)
        console.log(Hdurl)
        wx.downloadFile({
          url: Hdurl, //仅为示例，并非真实的资源
          success (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            // console.log(res.tempFilePath)
            that.setData({
              src: res.tempFilePath
            })
            that.drawAvatar()
          }
        })
      }
    })
  },

  getUserInfo: function (e) {
    const that = this
    console.log(e.detail.rawData)
    //json字符串转对象
    const strtobj = JSON.parse(e.detail.rawData)
    //默认头像路径
    console.log(strtobj.avatarUrl)
    //转高清头像
    const Hdurl = headimgHD(strtobj.avatarUrl)
    console.log(Hdurl)
    wx.downloadFile({
      url: Hdurl, //仅为示例，并非真实的资源
      success (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        // console.log(res.tempFilePath)
        that.setData({
          src: res.tempFilePath
        })
        that.drawAvatar()
      }
    })
  },

  // 选择头像图片
  upload() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
        that.drawAvatar()
      }
    })
  },

  // 绘制头像背景
  drawAvatar(isdraw) {
    var that = this;
    var p = that.data;
    context = wx.createCanvasContext('myAvatar', this);
    context.clearRect(0, 0, 256, 256)
    context.drawImage(p.src, 0, 0, 256, 256);
    context.draw(true);
    context.save();
    context.drawImage(p.hat.url, 0, 0, 256, 256);
    context.draw(true);
    context.save();
    if (!isdraw) {
      this.setData({
        save: true
      })
    }
  },

  // 保存图片
  saveImg() {
    wx.canvasToTempFilePath({
      canvasId: 'myAvatar',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功'
            })
          },
          fail(res) {
            wx.showToast({
              title: '取消保存...',
              icon: 'none'
            })
          }
        })
      }
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

  }
})
function headimgHD (imageUrl) {
  imageUrl = imageUrl.split('/');        //把头像的路径切成数组
  //把大小数值为 46 || 64 || 96 || 132 的转换为0
  if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
      imageUrl[imageUrl.length - 1] = 0;
  }
  imageUrl = imageUrl.join('/');   //重新拼接为字符串
  return imageUrl;
}