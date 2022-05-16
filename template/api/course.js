import request from '@/utils/request'
export default {
  //条件查询带分页
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data:searchObj
    })
  },
  //讲师详情方法
  getTeacherInfo(id){
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}
