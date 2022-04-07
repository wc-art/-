<template>
  <div>

  </div>
</template>
<script>
  import bus from '@/utils/bus'
  import { startBackup, isSuccess } from '@/api/backup/backup'
  import { getToken } from '@/utils/auth'
  import { parseTime } from '@/utils/ruoyi'

  export default {
    name: 'downloadSql',
    data() {
      return {
        sql: '',
      }
    },
    mounted() {
      this.$confirm('是否确认下载所有sql文件', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 加载页面
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 开始备份
        const res = await startBackup()
        loading.close()
        console.log(res)
        const notify = this.$notify({
          title: '请求数据',
          // 插入html文本
          dangerouslyUseHTMLString: true,
          message: '<strong>正在请求数据库完整数据，数据可能较多，请稍等...</strong><div style="font-size:10px">关闭该消息视为取消请求</div>',
          // 关闭时的回调函数
          onClose() {
            clearInterval(timer)
            loading.close()
          },
          // 偏移量
          offset: 100,
          // 弹窗不关闭
          duration: 0
        });
        const timer = setInterval(async () => {
          const flag = await isSuccess()
          if (flag) {
            clearInterval(timer)
            const baseURL = process.env.VUE_APP_BASE_API
            // 获取vue实例
            const that = this
            const url = `${baseURL}/view/sqldowload?path=${flag}`
            const xhr = new XMLHttpRequest()
            xhr.open("get", url, true)  // get、post都可
            xhr.responseType = "blob"   // 转换流
            xhr.setRequestHeader("Authorization", "Bearer " + getToken())  // token键值对
            xhr.onload = async function () {
              if (this.status == 200) {
                notify.close()
                const blob = this.response
                const a = document.createElement("a")
                const url = window.URL.createObjectURL(blob)
                a.href = url
                a.download = parseTime(new Date()) + '.sql'  // 文件名
                await a.click()
              } else if (this.status === 403) {
                that.$message({
                  message: 'sql下载失败',
                  type: 'warning'
                })
              }
            }
            xhr.send()
          }
        }, 5000)
        bus.$emit('deleteCurrentTag', { name: 'Backup/downloadSql', path: '/backup/downloadSql' })
      }).catch(() => {
        bus.$emit('deleteCurrentTag', { name: 'Backup/downloadSql', path: '/backup/downloadSql' })
      })
    },
  }
</script>
<style>

</style>