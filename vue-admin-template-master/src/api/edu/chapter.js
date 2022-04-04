import request from '@/utils/request'

export default {
  // 根据id获取章节和小节列表
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
  // 添加章节
  addChapter(chapter) {
    return request({
      url: `/eduservice/chapter/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  // 修改  查，改
  getChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      url: `/eduservice/chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  // 删除
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/${chapterId} `,
      method: 'delete'
    })
  }
}
