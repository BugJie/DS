<template>
  <div  id="main"></div>
</template>

<script>
//通过this.$echarts来使用
export default {
  name: "FuncFormsBase",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list:[]
    };
  },

  mounted() {
    this.drawLine();
    this.axios.get("/api/reports/type/1").then((res) => {
      console.log(res);
      this.list = res.list;
    });
  },
  methods: {
    drawLine() {
      var echarts = require("echarts");

      var myChart = echarts.init(document.getElementById("main"));

      myChart.setOption({
        title: {
          text: "用户来源",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        legend: {
          data: ["华东", "华南", "华北", "华西", "其他"],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],

        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "华东",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "华北",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "华南",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "华西",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 49111, 51801, 55320],
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
#main {
  background-color: #fff;
  padding: 10px;
}
</style>