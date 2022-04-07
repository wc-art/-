<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div>
          <span>请选择日期 ：</span>
          <el-date-picker unlink-panels v-model="value1" type="daterange" align="center" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-header>
      <el-main>
        <el-row class="graph-table">
          <el-col :span="12">
            <el-card class="box-card">
              <div id="1" style="height:  350px"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div id="2" style="height:  350px"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="graph-table">
          <el-col :span="12">
            <el-card class="box-card">
              <div id="3" style=" height:  350px;"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div id="4" style="height:  350px;"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  // 转换时间字符串
  function getDateRange(start, end) {
    function getDate(datestr) {
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1], temp[2]);
      return date;
    }
    var arr = [];
    var startTime = getDate(start);
    var endTime = getDate(end);
    while (endTime.getTime() - startTime.getTime() >= 0) {
      var year = startTime.getFullYear();
      var month =
        startTime.getMonth().toString().length == 1
          ? "0" + startTime.getMonth().toString()
          : startTime.getMonth();
      var day =
        startTime.getDate().toString().length == 1
          ? "0" + startTime.getDate()
          : startTime.getDate();
      // console.log(year + "-" + month + "-" + day);
      arr.push(year + "-" + month + "-" + day);
      startTime.setDate(startTime.getDate() + 1);
    }
    return arr;
  }
  import echarts from "echarts";
  import { orderview } from "@/api/view/orderview";
  export default {
    name: "orderview",
    components: {},
    data() {
      //默认一个月内数据
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      // 当前日期
      let systemDate = date.year + "-" + date.month + "-" + date.date;

      var beforedate = new Date(nowDate);
      beforedate.setDate(nowDate.getDate() - 30);
      // 30天前
      let systemDateBegin = `${beforedate.getFullYear()}-${beforedate.getMonth() + 1 < 10
        ? `0${beforedate.getMonth() + 1}`
        : beforedate.getMonth() + 1
        }-${beforedate.getDate()}`;
      return {
        //选择时间范围不超过六个月
        choiceDate0: "",
        pickerOptions: {
          // 设置不能选择的日期
          onPick: ({ maxDate, minDate }) => {
            this.choiceDate0 = minDate.getTime();
            if (maxDate) {
              this.choiceDate0 = "";
            }
          },
          disabledDate: (time) => {
            let choiceDateTime = new Date(this.choiceDate0).getTime();
            const minTime = new Date(choiceDateTime).setMonth(
              new Date(choiceDateTime).getMonth() - 6
            );
            const maxTime = new Date(choiceDateTime).setMonth(
              new Date(choiceDateTime).getMonth() + 6
            );
            const min = minTime;
            const newDate =
              new Date(new Date().toLocaleDateString()).getTime() +
              24 * 60 * 60 * 1000 -
              1;
            const max = newDate < maxTime ? newDate : maxTime;
            //如果已经选中一个日期 则 返回 该日期前后一个月时间可选
            if (this.choiceDate0) {
              return time.getTime() < min || time.getTime() > max;
            }
            //若一个日期也没选中 则 返回 当前日期以前日期可选
            return time.getTime() > newDate;
          },
        },
        value1: [systemDateBegin, systemDate],
        myChart: null,
        option1: {
          tooltip: {},
          title: {
            text: "新增实生苗的数量",
            left: "center",
          },
          xAxis: {
            data: [
              "2022-01-13",
              "2022-01-14",
              "2022-01-15",
              "2022-01-16",
              "2022-01-17",
              "2022-01-18",
              "2022-01-19",
            ],
            name: "日期",
          },
          yAxis: {
            name: "数量(株)",
            max: 100
          },
          series: [
            {
              name: "数量(株)",
              type: "bar",
              labelLine: {
                show: true,
              },
              data: [0, 0, 2, 0, 100, 0, 0],
              itemStyle: {
                // 普通样式。
                normal: {
                  // 点的颜色。
                  color: "#1890FF",
                },
                // 高亮样式。
                emphasis: {
                  // 高亮时点的颜色。
                  color: "#6DD0E0",
                },
              },
            },
          ],
          dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 10, //滚动条开始位置（共100等份）
            end: 100, //结束位置（共100等份）
          },
        },
        option2: {
          tooltip: {},
          title: {
            text: "实生苗的出圃数量",
            left: "center",
          },
          xAxis: {
            data: [
              "2022-01-13",
              "2022-01-14",
              "2022-01-15",
              "2022-01-16",
              "2022-01-17",
              "2022-01-18",
              "2022-01-19",
            ],
            name: "日期",
          },
          yAxis: {
            name: "出圃数量",
            max: 100
          },
          series: [
            {
              name: "出圃数量",
              type: "bar",
              labelLine: {
                show: true,
              },
              data: [0, 5, 2, 0, 1, 0, 0],
              itemStyle: {
                // 普通样式。
                normal: {
                  // 点的颜色。
                  color: "#1890FF",
                },
                // 高亮样式。
                emphasis: {
                  // 高亮时点的颜色。
                  color: "#6DD0E0",
                },
              },
            },
          ],
          dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 10, //滚动条开始位置（共100等份）
            end: 100, //结束位置（共100等份）
          },
        },
        option3: {
          tooltip: {},
          title: {
            text: "新增嫁接苗的数量",
            left: "center",
          },
          xAxis: {
            data: [
              "2022-01-13",
              "2022-01-14",
              "2022-01-15",
              "2022-01-16",
              "2022-01-17",
              "2022-01-18",
              "2022-01-19",
            ],
            name: "日期",
          },
          yAxis: {
            name: "数量(株)",
            max: 100
          },
          series: [
            {
              name: "数量(株)",
              type: "bar",
              labelLine: {
                show: true,
              },
              data: [0, 0, 2, 0, 1, 6, 0],
              itemStyle: {
                // 普通样式。
                normal: {
                  // 点的颜色。
                  color: "#1890FF",
                },
                // 高亮样式。
                emphasis: {
                  // 高亮时点的颜色。
                  color: "#6DD0E0",
                },
              },
            },
          ],
          dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 10, //滚动条开始位置（共100等份）
            end: 100, //结束位置（共100等份）
          },
        },
        option4: {
          tooltip: {},
          title: {
            text: "嫁接苗的出圃数量",
            left: "center",
          },
          xAxis: {
            data: [
              "2022-01-13",
              "2022-01-14",
              "2022-01-15",
              "2022-01-16",
              "2022-01-17",
              "2022-01-18",
              "2022-01-19",
            ],
            name: "日期",
          },
          yAxis: {
            name: "出圃数量",
            max: 100
          },
          series: [
            {
              name: "出圃数量",
              type: "bar",
              labelLine: {
                show: true,
              },
              data: [0, 0, 2, 0, 1, 0, 1],
              itemStyle: {
                // 普通样式。
                normal: {
                  // 点的颜色。
                  color: "#1890FF",
                },
                // 高亮样式。
                emphasis: {
                  // 高亮时点的颜色。
                  color: "#6DD0E0",
                },
              },
            },
          ],
          dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 10, //滚动条开始位置（共100等份）
            end: 100, //结束位置（共100等份）
          },
        },
      };
    },
    watch: {
      value1: function (newQuestion, oldQuestion) {
        let range = getDateRange(this.value1[0], this.value1[1]);
        this.option1.xAxis.data = range;
        this.option2.xAxis.data = range;
        this.option3.xAxis.data = range;
        this.option4.xAxis.data = range;
        // =console.log(this.option1.xAxis.data);
        this.$nextTick(() => {
          this.draw("1");
          this.draw("2");
          this.draw("3");
          this.draw("4");
        });
      },
    },
    created() {
      this.draw("1");
      this.draw("2");
      this.draw("3");
      this.draw("4");
    },
    computed: {},
    methods: {
      draw(id) {
        orderview({
          start: this.value1[0],
          end: this.value1[1],
          type: parseInt(id),
        }).then((res) => {
          switch (parseInt(id)) {
            case 1:
              this.option1.xAxis.data = res.data.dateList;
              this.option1.series[0].data = res.data.number;
              let Max1 = Math.max(...res.data.number)
              if (Max1 != 0) {
                this.option1.yAxis.max = Math.max(...res.data.number)
              } else {
                this.option1.yAxis.max = 100
              }
              break;
            case 2:
              this.option2.xAxis.data = res.data.dateList;
              this.option2.series[0].data = res.data.number;
              let Max2 = Math.max(...res.data.number)
              if (Max2 != 0) {
                this.option2.yAxis.max = Math.max(...res.data.number)
              } else {
                this.option2.yAxis.max = 100
              }
              break;
            case 3:
              this.option3.xAxis.data = res.data.dateList;
              this.option3.series[0].data = res.data.number;
              let Max3 = Math.max(...res.data.number)
              if (Max3 != 0) {
                this.option3.yAxis.max = Math.max(...res.data.number)
              } else {
                this.option3.yAxis.max = 100
              }
              break;
            case 4:
              this.option4.xAxis.data = res.data.dateList;
              this.option4.series[0].data = res.data.number;
              let Max4 = Math.max(...res.data.number)
              if (Max4 != 0) {
                this.option4.yAxis.max = Math.max(...res.data.number)
              } else {
                this.option4.yAxis.max = 100
              }
              break;
            default:
              break;
          }
          // console.log("a", this.option1);
          this.$nextTick(() => {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById(id));

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(this["option" + id]);
          });
        });
      },
    },
  };
</script>

<style scoped>
  .graph-table {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }


  .box-card {
    margin: 5px 5px;
    height: 400px;
    flex: 40%;
  }
</style>