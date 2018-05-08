//index.js
//获取应用实例
const app = getApp()
import { getImageByTypeNew } from '../../utils/api.js'
Page({
  data: {
    cilentHeight: 0,
    page: 1,
    isGetAll: false,
    picList: []
  },
  //事件处理函数
  bindViewTap: function () {
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
  getImage() {
    let context = this
    let successRes = function (res) {
      if (res.data.postList.length) {
        context.setData({
          picList: [...context.data.picList, ...res.data.postList]
        })
      } else {
        context.setData({
          isGetAll: true
        })
      }
    }
    getImageByTypeNew({
      page: context.data.page,
      count: 50,
    }, successRes, '精选')

  },
  lower() {
    this.data.page++
    if (!this.data.isGetAll) {
      this.getImage()
    }

  },
  imgPreview: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var srcB = []
    for (let i = 0; i < src.length; i++) {
      srcB.push('https://photo.tuchong.com/' + src[i].user_id + '/f/' + src[i].img_id + '.jpg')
    }
    console.log(srcB)
    //图片预览
    wx.previewImage({
      current: srcB[0], // 当前显示图片的http链接
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
