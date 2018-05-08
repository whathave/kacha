//index.js
//获取应用实例
const app = getApp()
import {getUserInfo} from '../../utils/api.js'
Page({
  data: {
    cilentHeight: 0,
    page: 1,
    isGetAll: false,
    picList: [],
    userInfo: {},
    userBg: ''
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onReady: function () {
    let context = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        context.setData({
          cilentHeight: res.windowHeight
        })
      }
    })

    this.getImage()
  },
  onLoad: function () {
  },
  getImage(){
    let context = this
    let successRes = function (res) {
      console.log(Object.values(res.data.sites))
      if (context.data.page == 1) {
        context.setData({
          userInfo: Object.values(res.data.sites)[0]
        }),
          context.setData({
            userBg: `https://s1.tuchong.com/sites/${Object.values(res.data.sites)[0].site_id.toString().substring(0, 3)}/${Object.values(res.data.sites)[0].site_id}/header.jpg`
          })
      }
      if (res.data.posts.length) {
        context.setData({
          picList: [...context.data.picList, ...res.data.posts]
        })
      } else {
        context.setData({
          isGetAll: true
        })
      }
    }
    getUserInfo({
      page: context.data.page,
      count: 20
    }, successRes)

  },
  lower(){
    this.data.page++
    if (!this.data.isGetAll){
      this.getImage()
    }
    
  },
  imgPreview: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var srcB = []
    for (let i = 0; i < src.length; i++ ){
      srcB.push(src[i].replace(/\/g\//, "/f/"))
    }
    //图片预览
    wx.previewImage({
      current: src[0].replace(/\/g\//, "/f/"), // 当前显示图片的http链接
      urls: srcB // 需要预览的图片http链接列表
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '带你一起看风景',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
