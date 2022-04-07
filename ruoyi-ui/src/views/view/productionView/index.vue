<template>
  <div>
    <div class="about">
      <span style="margin-left: 10px;">生产资料：</span>
      <el-select v-model="val" placeholder="请选择" @change="update">
        <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val">
        </el-option>
      </el-select>
      <span style="margin-left: 10px;">日期：</span>
      <div class="block">
        <el-date-picker v-model="value" type="daterange" align="right" unlink-panels range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="update">
        </el-date-picker>
      </div>
      <span class="detailed">(按住鼠标左右滑动和滚轮滚动可移动缩放折线图)</span>
    </div>
    <div class="graph-table" v-loading="loading">
      <el-card class="box-card" v-for="(item,index) in name" :key="item" ref="graph">
        <graph :time="times[index]" :values="values[index]" :gid="item" :originTime="value[0]" :endTime="value[1]"
          v-if="childData" :xName="xName[index]" :index="index" style="height: 350px;">
        </graph>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Graph from '@/views/view/productionView/Graph.vue'

  import { production } from '@/api/view/productionView.js'

  export default {
    components: {
      Graph
    },
    data() {
      return {
        options: [{
          val: 'seed',
          label: '种子'
        }, {
          val: 'stroma',
          label: '基质'
        }, {
          val: 'plug',
          label: '穴盘'
        }, {
          val: 'pesticide',
          label: '农药'
        }, {
          val: 'regulator',
          label: '调节剂'
        }, {
          val: 'fertilizer',
          label: '化肥'
        }, {
          val: 'graftingclip',
          label: '嫁接夹'
        }, {
          val: 'graftinglabel',
          label: '嫁接签'
        }, {
          val: 'blade',
          label: '刀片'
        }, {
          val: 'greenhousefilm',
          label: '棚膜'
        }, {
          val: 'carton',
          label: '纸箱'
        }],
        val: 'seed',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: [],
        values: [[11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535], [11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535], [11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535], [11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535], [11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535], [11, 233, 342, 4324, 55, 4234, 23, 342, 0, 45, 36, 63, 636, 636, 736, 535]],
        times: [['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'], ['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'], ['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'], ['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'], ['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'], ['2022-01-11', '2022-01-12', '2022-02-03', '2022-03-04', '2022-32-32', '2022-05', '2022-05-21'],],
        name: ["入库量/(个)", "领用量/(个)", "临时领用量/(个)", "退回量/(个)", "库存量/(个)", "采购费用/(元)"],
        xName: ['日期', '日期', '日期', '日期', '名称', '日期'],
        loading: false,
        childData: true
      };
    },
    methods: {
      async update() {
        const now = new Date()
        if (this.value[1] > now) {
          this.$message.error('请选择过去的某个时间段')
          this.value = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()]
          return
        }
        else if (this.value[1] - this.value[0] >= 31104000000 / 2) {
          this.$message.error('最长时间间隔为6个月')
          this.value = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()]
          return
        }
        // 到这应该请求数据
        this.loading = true
        await production({
          productiontype: this.val,
          origintime: `${this.value[0].getFullYear()}-${this.value[0].getMonth() + 1}-${this.value[0].getDate()} 00:00:00`,
          endtime: `${this.value[1].getFullYear()}-${this.value[1].getMonth() + 1}-${this.value[1].getDate()} 00:00:00`
        }).then(res => {
          const productionName = [['purchase_amount', 'purchase_time'],
          ['consume_amount', 'consume_time'],
          ['consume_amount_temporary', 'consume_time'],
          ['return_amount', 'return_time'],
          [],
          ['total_price', 'purchase_time']]
          for (let i = 0; i < res.length; i++) {
            let time = []
            let value = []
            for (const t of res[i]) {
              if (i === 4) {
                value.push(...Object.values(t))
              } else {
                time.push(t[productionName[i][1]])
                value.push(t[productionName[i][0]])
              }
            }
            if (i === 4) time = ['种子', '基质', '穴盘', '农药', '调节剂', '化肥', '嫁接夹', '嫁接签', '刀片', '棚膜', '纸箱']
            this.values.shift()
            this.values.push(value)
            this.times.shift()
            this.times.push(time)
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
    async mounted() {
      this.value = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date()]
      this.update()
    }
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