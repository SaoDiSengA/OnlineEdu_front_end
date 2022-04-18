import request from '@/utils/request'

export default {
  // 添加章节
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data: video
    })
  },
  // 修改  查，改
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/${videoId}`,
      method: 'get'
    })
  },
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data: video
    })
  },
  // 删除小节
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId} `,
      method: 'delete'
    })
  },
  // 删除视频
  deleteAlyVod(id) {
    return request({
      url: `/eduvod/video/removeAlyVideo/${id} `,
      method: 'delete'
    })
  }
}
