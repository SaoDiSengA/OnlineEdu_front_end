<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <el-form-item label="课程分类">
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择"
            @change="changeOneSubject">
            <el-option
              v-for="subject in subjectOneList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>

          <el-select
            v-model="courseInfo.subjectId"
            placeholder="请选择">
            <el-option
              v-for="subject in subjectTwoList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>
        </el-form-item>

        <!-- 课程讲师 TODO -->
        <el-form-item label="课程讲师">
          <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>

        <!-- 课程封面 TODO -->
        <el-form-item label="课程封面">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/fileoss'"
            class="avatar-uploader">
            <img :src="courseInfo.cover">
          </el-upload>
        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>

    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course"
import subjects from '@/api/edu/subjects'
import Tinymce from '@/components/Tinymce'    //引入主键
export default {
  components: { Tinymce },    //声明主键
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo:{
        title: '',
        subjectId: '',
        subjectParentId:'', //一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/1.jpg',
        price: 0
      },
      courseId:'',
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList:[],
      subjectOneList:[],
      subjectTwoList:[],
    }
  },

  created() {
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      this.showCourseInfo()
    }
    this.getOneSubject()
    this.getTeacherList()
  },

  methods: {
    //信息回显
    showCourseInfo(){
      course.getCourse(this.courseId).then(
        res => {
          //在courseId有信息，包含一级分类和2级分类的id
          this.courseInfo = res.data.courseInfoVo
          //查询所有的分类，包含一级二级
          subjects.getSubjectList()
            .then(res => {
              //获取所有一级分类
              this.subjectOneList = res.data.list
              //对一级分类列表进行遍历，比较当前一级id和所有一级id是否相同
              for (let index = 0; index < this.subjectOneList.length; index++) {
                //获取每个一级分类
                const oneSubject = this.subjectOneList[index]
                if(oneSubject.id == this.courseInfo.subjectParentId){
                  //获取一级中的二级
                  this.subjectTwoList = oneSubject.children
                }
              }
            })
        }
      )
    },
    //上传封面成功的方法
    handleAvatarSuccess(res,file){
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.courseInfo.cover = res.data.url
    },
    //上传之前调用的方法     文件类型，文件大小
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //点击某个一级分类，触发，显示对应二级分类
    changeOneSubject(value){    //框架中封装好的value 可以直接拿到id值
      this.courseInfo.subjectId = ''
      this.subjectOneList.forEach(element => {
        if(element.id === value){
          this.subjectTwoList = element.children
        }
      });
    },
    //查询所有一级分类
    getOneSubject(){
      subjects.getSubjectList().then(
        res => {
          this.subjectOneList = res.data.list
        }
      )
    },
    //查询所有讲师
    getTeacherList(){
      course.getTeacherList().then(
        res => {
          this.teacherList = res.data.items
        }
      )
    },

    addCourseInfo(){
      course.addCourseInfo(this.courseInfo).then(
        res => {
          //提示
          this.$message({
              type: 'success',
              message: '添加课程信息成功!'
          })
          //跳转
          this.$router.push({ path: '/course/chapter/' + res.data.courseId })
        }
      )
    },
    updateCourseInfo(){
      course.updateCourseInfo(this.courseInfo)
        .then(res => {
          //提示
          this.$message({
              type: 'success',
              message: '修改课程信息成功!'
          })
          //跳转
          this.$router.push({ path: '/course/chapter/' + this.courseId })
        })
    },
    saveOrUpdate() {
      //判断是添加还是修改
      if(!this.courseInfo.id){
        this.addCourseInfo()
      }else{
        this.updateCourseInfo()
      }
    }
  }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>