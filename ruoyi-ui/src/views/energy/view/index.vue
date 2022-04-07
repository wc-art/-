<template>
  <div>
    <div class="about">
      <span style="margin-left: 10px;">年份：</span>
      <div class="block">
        <el-date-picker v-model="value" type="year" placeholder="选择年" @change="update">
        </el-date-picker>
      </div>
      <span class="detailed">(按住鼠标左右滑动和滚轮滚动可移动缩放折线图)</span>
    </div>
    <div class="graph-table" v-loading="loading">
      <el-card class="box-card" v-for="(item,index) in name" :key="item">
        <graph :values="values[index]" :gid="item" v-if="childData"></graph>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Graph from './Graph'
  import { energyInfo } from '@/api/energy/view'

  export default {
    name: "EnergyView",
    components: {
      Graph
    },
    data() {
      return {
        // 年份日期
        value: '',
        // y轴值
        values: [[11, 233, 23, 234], [1231, 32, 4234, 43], [2344, 4234, 111], [3123, 452]],
        // x轴值
        name: ["用水量/(立方)", "用电量/(度)", "用气量/(吨)", "用煤量/(吨)"],
        // 加载页面是否加载
        loading: false,
        // 图表显示
        childData: true
      };
    },
    methods: {
      async update() {
        const now = new Date()
        if (this.value.getFullYear() > now.getFullYear()) {
          this.$message.error('请选择过去的某一年')
          this.value = now.getFullYear()
          return
        }
        // 到这应该请求数据
        this.loading = true
        await energyInfo({
          year: this.value.getFullYear()
        }).then(res => {
          const energyName = ["electricity_amount", "naturalgas_amount", "coal_amount", "water_amount"]
          const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
          for (let i = 0; i < res.length; i++) {
            let value = [],currentIndex = 0
            for(let j = 0; j < months.length; j++) {
              const t = res[i]
              if(t[currentIndex]&& t[currentIndex].month === months[j]) {
                value.push(t[currentIndex][energyName[i]])
                currentIndex++
              } else {
                value.push(0)
              }
            }
            this.values.shift()
            this.values.push(value)
          }
          this.loading = false
        }, err => {
          console.log('日期请求数据出现问题', err)
        })
        this.childData = false
        this.$nextTick(() => {
          this.childData = true
        })
      }
    },
    mounted() {
      this.value = new Date()
      this.update()
    },
  }
</script>

<style scoped>
  .about {
    display: flex;
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 20px;
  }

  .detailed {
    font-size: 10px;
    margin-left: 50px;
    color: rgba(red, green, blue, 0.1)
  }

  span {
    text-align: center;
    line-height: 35px;
  }

  .graph-table {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .clearfix {
    height: 0px;
  }

  .box-card {
    margin: 5px 5px;
    height: 400px;
    flex: 40%;
  }
</style>