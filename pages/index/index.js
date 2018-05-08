//index.js
//获取应用实例
const app = getApp()
import { getIndexImage } from '../../utils/api.js'
Page({ 
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    angle: 100,
    picList: [],
    countDown: 5
  },
  onReady: function () {
    var _this = this;
    this.getImage()
    let countD = setInterval(function(){
      console.log(_this.data.countDown)
      _this.setData({
        countDown: -- _this.data.countDown
      })
    },1000)
    setTimeout(function () {
      _this.goUser();
      clearInterval(countD)
    }, 5000)
    wx.onAccelerometerChange(function (res) {
      //console.log(res)
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getImage() {
    let context = this
    let callBackSuccess = function (res){
      if (res.data.feedList.length) {
        context.setData({
          picList: [...context.data.picList, ...res.data.feedList]
        })
      }
    }
    getIndexImage(callBackSuccess)
  },
  goUser(){
    console.log(1)
    wx.switchTab({
      url: '../jx/jx'
    })
  }
})
