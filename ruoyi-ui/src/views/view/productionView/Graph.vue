<template>
  <div :id="gid"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['time', 'values', 'gid', 'originTime', 'endTime', 'xName', 'index'],
    data() {
      return {
        chart: null
      }
    },
    methods: {
      getDateString(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
      }
    },
    mounted() {
      const values = this.values.length === 0 ? [0, 0, 20, 100] : this.values
      const times = this.time.length === 0 ? [this.getDateString(this.originTime), this.getDateString(this.endTime)] : this.time
      this.chart = echarts.init(document.getElementById(this.gid))
      const data = []
      for (const t of times) {
        data.push(t.substring(0, 10))
      }
      let option = {
        title: {
          text: `${this.gid.substring(0, this.gid.indexOf('/'))}`,
          left: 'center'
        },
        xAxis: {
          name: this.xName,
          nameGap: 0,
          type: 'category',
          data,
          axisPointer: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            interval: this.index === 4 ? 0 : 'auto'
          }
        },
        yAxis: {
          name: this.gid,
          type: 'value',
          min: 'dataMin',
          max: Math.max(...values) > 100 ? 'dataMax' : Math.max(...values),
          nameTextStyle: {
            padding: [0, 0, 0, 50]
          }
        },
        legend: {
          data: ['amount(个) vs date(年/月/日)']
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
        dataZoom: {
          show: true,
          type: 'inside',
          showDetail: true,
          z: 100
        }

      }
      this.chart.setOption(option)
    }
  }
</script>