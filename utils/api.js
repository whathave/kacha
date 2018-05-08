const api = (url, callBackSuccess, dataObj = {}, method = 'GET') => {
  wx.request({
    url: url,
    data: dataObj,
    method: method,
    success: function (res) {
      console.log(res)
      callBackSuccess(res);
    }
  })
}

export const getIndexImage = (callBackSuccess) => api('https://api.tuchong.com/feed-app', callBackSuccess)
export const getUserInfo = (dataObj, callBackSuccess) => api('https://tuchong.com/rest/sites/1529585/posts', callBackSuccess, dataObj)
export const getImageByType = (dataObj, callBackSuccess, type) => api(`https://api.tuchong.com/discover/${type}/category`, callBackSuccess, dataObj)
export const getImageByTypeNew = (dataObj, callBackSuccess, tag) => api(`https://tuchong.com/rest/tags/${tag}/posts`, callBackSuccess, dataObj)

