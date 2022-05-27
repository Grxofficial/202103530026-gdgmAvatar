// pages/myindex/myindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body_height: '',
    head_img: ''
  },
  //
  page_jump: function (e) {
    //在index.wxml页面的a标签定义page_jump点击事件，并传递url参数，使页面跳转至url参数的页面
    // console.log(e.currentTarget.dataset.url)
    const url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url + '?ann=' + this.data.announcement
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.request({
      url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
      success: function (res){
        console.log(res)
        // console.log(res.data.images[0].url)
        that.setData({
          head_img: 'https://www.bing.com' + res.data.images[0].url + '?' + new Date().getTime()
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this
    wx.getStorage({
      key: 'announcement',
      success: function(res) {
        // console.log(res)
        that.setData({
          announcement: res.data
        })
      },
      fail: function (res){
        that.setData({
          announcement: '暂无公告…'
        })
      }
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