
import request, {
  uploadRequest
}   from '../src/utils/http'
import  getEnvironmentUrl   from  '../src/utils/environment'

// 查询所有字典值(Map格式）
export const getDictList = () => {
  return request({
    url: 'dict/getAllMap',
    method: 'GET'
  })
}
export const VUE_APP_FILE_UPLOAD = getEnvironmentUrl(3)
export const baseImageUrl =
  'https://wcepod.rokin.cn/fileweb/app_carfree/crm_images/' // 静态图片路径

// 获取文件上传token
export const getFileToken = (account = '2000', pwd = '6666') => {
  return request({
    completeUrl: VUE_APP_FILE_UPLOAD +
      'file-auth/getFileAuth' +
      `?account=${account}&pwd=${pwd}`
  })
}

// 获取人员
export const getAllUserList = (data) => {
  return request({
    url: 'master/cmd-user/getByPage',
    data: data || {},
    methods: 'POST'
  })
}

// 发送短信
export const sendMes = (data) => {
  return request({
    url: 'message-sender/sms/message/send',
    data: data || {},
    methods: 'POST'
  })
}

// 查重工具
export const checkToolName = (data) => {
  return request({
    url: 'crm/crm-check-setting/pageRepeatData',
    data: data || {},
    methods: 'POST'
  })
}
// 上传图片(单个)
export const uploadFile = (data) => {
  return uploadRequest({
    completeUrl: "https://fileupload-uat.rokin.cn/file-upload/fileBatchUploadAllPeople?uploadSceneId=9",
    header: {
      'Content-Type:': 'multipart/form-data;boundary=boundaryLineString',
      // 'Authorization': "Bearer " + uni.getStorageSync('token'),
    },
    imageUrl: data.imageUrl,
    token: data.token
  })
}
//上传图片（多个）
export const uploadFilesList = (data) => {
  return uploadRequest({
    completeUrl: VUE_APP_FILE_UPLOAD + 'file-upload/fileBatchUploadAllPeople?uploadSceneId=9',
    filesList: data.filesList,
    token: data.token
  })
}

/**
 * @description 分页获取常用语列表
 */
export const getCommonWordList = () => {
  return request({
    url: 'crm/crm-common-words/getPageList',
    data: {
      current: 1,
      size: 50,
      co: {
        commonWord: undefined
      }
    }
  })
}

//地图定位
export const getReGeo = data => {
  return request({
    url: 'integration/ic-map/getReGeo',
    method: 'post',
    data
  })
}