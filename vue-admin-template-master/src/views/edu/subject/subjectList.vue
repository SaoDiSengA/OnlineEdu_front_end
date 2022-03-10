<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="list"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subjects'
export default {
  data() {
    return {
      filterText: '',
      list: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created(){
      this.getSubjectList()
      console.log(this.list)
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getSubjectList(){
        subject.getSubjectList().then(res => {
            this.list = res.data.list
        })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    }
  }
}
</script>

