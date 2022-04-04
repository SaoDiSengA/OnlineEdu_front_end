import request from '@/utils/request'

export default {

  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data: courseInfo //requestbody 以 json传输的时候需要定义
    })
  },
  //查询所有讲师
  getTeacherList() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },
  //根据课程id查课程
  getCourse(id) {
    return request({
      url: `/eduservice/course/getCourse/${id}`,
      method: 'get'
    })
  },
  //修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo //requestbody 以 json传输的时候需要定义
    })
  }

}
