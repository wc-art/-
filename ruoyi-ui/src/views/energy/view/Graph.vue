<template>
  <div :id="gid"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['values', 'gid'],
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      const values = this.values
      this.chart = echarts.init(document.getElementById(this.gid))
      const data = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      let option = {
        title: {
          text: `${this.gid.substring(0, this.gid.indexOf('/'))}`,
          left: '50%',
          right: '50%'
        },
        xAxis: {
          name: '日期',
          nameGap: 0,
          type: 'category',
          data,
          axisPointer: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          name: this.gid,
          type: 'value',
          min: 'dataMin',
          max: Math.max(...values) > 10 ? 'dataMax' : 10,
          nameTextStyle: {
            padding: [0, 0, 0, 50]
          }
        },
        legend: {
          data: ['amount(吨) vs date(年/月)']
        },
        // 鼠标移动到显示标签效果
        tooltip: {
          trigger: 'axis',
          formatter: `{b} ${this.gid}: {c}`
        },
        // 网格式效果
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            data: values,
            type: 'line',
            areaStyle: {
              color: '#1890FF',
            },
            lineStyle: {
              color: 'rgb(90,117,200)'
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            type: 'inside',
            showDetail: true,
            z: 100
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
</script>
<style scoped>
  div {
    height: 350px;
    width: 100%;
  }
</style>