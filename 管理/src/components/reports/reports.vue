<template>
  <div id="app">
    <div class="reports">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '../index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: './reports' }">数据统计</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: './reports' }">数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 图表 -->
      <div id="main" style="width: 97%;height: 90%;">
          <echarts></echarts>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from './echarts.vue'
export default {
    
  props: {},
  data() {
    return {};
  },
  methods: {

  },
  components: {
      echarts
  },
};
</script>

<style scoped lang="less">
.reports{
    padding: 10px;
    width: 100%;
    height: 100%;
    background-color: #EAEDF1;
    #main{
        margin-top: 20px;
        margin-left: 20px;
        background-color: #ffffff;
    }
}
</style>
