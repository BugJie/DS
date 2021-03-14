<template>
  <div id="app">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '../index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rights" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="info" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 所有的权限列表
      rights: [],
    };
  },
  // 实例创建后的狗子函数
  created() {
    //  获取所有的权限列表
    this.getrightslist();
  },
  methods: {
    //  获取权限列表
    getrightslist() {
      this.axios.get("/api/rights/list").then((res) => {
        console.log(res.data);
        if (res.meta.status != 200) {
          return this.$message.error("获取权限列表失败");
        }
        this.rights = res.data;
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  padding: 10px;
  width: 100%;
  height: 100%;
  //   卡片试图区域
  .el-card {
    margin-top: 20px;
    .el-tag--light {
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
