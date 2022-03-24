import request from '@/utils/request'

export default {

    //添加课程信息
    addCourseInfo(courseInfo){
        return request({
            url:`/eduservice/course/addCourseInfo`,
            method: 'post',
            data:courseInfo //requestbody 以 json传输的时候需要定义
            
        })
    },
}