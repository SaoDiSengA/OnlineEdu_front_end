import request from '@/utils/request'

export default {
    getTeacherList(current,limit,teacherQuery){
        return request({
            // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换成json进行传递到接口里
            data:teacherQuery
        })
    },
    deleteTeacherId(id){
        return request({
            url:`/eduservice/teacher/${id}`,
            method: 'delete',
        })
    },
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method: 'post',
            data:teacher
        })
    }
}
