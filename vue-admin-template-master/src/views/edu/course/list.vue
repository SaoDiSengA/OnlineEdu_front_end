<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <!-- inline是否在一行显示 -->
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
        <!-- v-model 双向绑定 -->
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table

      :data="list"

      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="80" />

      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==="Normal"?'已发布':'未发布' }}
          <!-- 两个等号比较值，三个等号比较类型和值 -->
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/editTeacher/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/teacher/editTeacher/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
//引用teacher.js
import course from '@/api/edu/course.js'

export default {
  data(){    //定义变量和初始值
    return{
      list:null,//查询之后接口返回集合
      page:1,//当前页
      limit:10,//每页记录数
      courseQuery:{
        name:'',
        level:'',
        begin:'',
        end:''      //可以不写
      }, // 条件封装对象
      total:0//总记录数
    }
  },
  created(){ //页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods:{
    getList(){
      course.getListCourse().then(
          res => {
            this.list = res.data.list
          }
        )//请求成功
        .catch(error => {
          console.log(error)
        })//请求失败
    },
    resetData(){
      this.courseQuery = {}
      this.getList()
    },
    removeDataById(id){
      this.$confirm('此操作将删除课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourse(id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList(this.page)
          })//请求成功
      })
    }
  }
}

</script>

