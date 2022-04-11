<template>
  <!-- 添加或修改能耗信息对话框 -->
  <el-dialog :title="title" :visible.sync="openDetailed" width="1000px" append-to-body :before-close="cancelDetailed"
    v-if="openDetailed">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题:" prop="expertdbTitle">
        <div>{{ form.expertdbTitle }}</div>
      </el-form-item>

      <el-form-item label="分类:" prop="categoryName">
        <div>{{ categoryName }}</div>
      </el-form-item>

      <!-- 配图 -->
      <el-form-item label="配图:" prop="urls">
        <el-carousel height="200px" style="width:500px;" v-show="hasImg">
          <el-carousel-item v-for="url in urls" :key="url" style="width: 500px; height: 200px; margin:0;">
            <el-image :src="url" :preview-src-list="urls" style="width:400px;height:200px;" :key="url"></el-image>
          </el-carousel-item>
        </el-carousel>
        <div v-show="!hasImg">无图片</div>
      </el-form-item>

      <el-form-item label="文档:" prop="docList">
        <el-button @click="downloadDoc">文档下载</el-button>
      </el-form-item>
      <el-form-item label="简介:" prop="expertdbBriefIntroduction">
        <div>{{ form.expertdbBriefIntroduction }}</div>
      </el-form-item>
      <el-form-item label="内容详情:" prop="expertdbDetails">
        <div class="ql-container ql-snow">
          <div class="ql-editor" v-html="form.expertdbDetails"></div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import { getImgProduction, getProduction } from '@/api/expertManage/production'
  import { getImgPest, getPest } from '@/api/expertManage/pest'
  import { getImgSeedling, getSeedling } from '@/api/expertManage/seedling'
  import { getToken } from "@/utils/auth"
  import { parseTime } from "@/utils/ruoyi"
  import "quill/dist/quill.snow.css";

  export default {
    name: 'Detailed',
    props: ['title', 'form', 'openDetailed', 'categoryName', 'from'],
    data() {
      return {
        // 是否有配图
        hasImg: true,
        // 图片列表
        urls: []
      }
    },
    methods: {
      // 下载文档
      downloadDoc() {
        this.$confirm('是否确认下载文档', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          this.loading = this.$loading({
            lock: true,
            text: "加载文档中",
            background: "rgba(0, 0, 0, 0.7)",
          })
          // 获取vue实例
          const that = this
          const url = process.env.VUE_APP_BASE_API + '/expert/file/download' + '?from=' + this.from + '&id=' + this.form.expertdbId
          const xhr = new XMLHttpRequest()
          xhr.open("get", url, true)  // get、post都可
          xhr.responseType = "blob"   // 转换流
          xhr.setRequestHeader("Authorization", "Bearer " + getToken())  // token键值对
          xhr.onload = async function () {
            if (this.status == 200) {
              let blob = this.response
              let a = document.createElement("a")
              let url = window.URL.createObjectURL(blob)
              a.href = url
              a.download = parseTime(new Date()) + '.docx'  // 文件名
              await a.click()
            } else if (this.status === 403) {
              that.$message({
                message: '无文档下载',
                type: 'warning'
              })
            }
            that.loading.close()
          }
          xhr.send()
        })
      },
      // 取消按钮
      cancelDetailed() {
        this.$emit('cancelDetailed')
      },
    },
    // 获取图片列表
    watch: {
      openDetailed: {
        handler: function (val, oldval) {
          if (val) {
            const from = this.from
            let getImg, imgs = []
            if (from.includes('production')) getImg = getImgProduction
            else if (from.includes('pest')) getImg = getImgPest
            else getImg = getImgSeedling
            getImg(this.form.expertdbId).then(res => {
              let content = res.content, type = res.type
              if (content.length === 0) {
                this.hasImg = false
              }
              else {
                this.hasImg = true
              }
              for (let i = 0; i < content.length; i++) {
                imgs.push(`data:image/${type[i]};base64,${content[i]}`)
              }
              this.urls = imgs
            }, err => {
              console.log(err)
            })
          } else {
            this.urls = []
          }
        }
      }
    }
  }
</script>
<style scoped>

</style>