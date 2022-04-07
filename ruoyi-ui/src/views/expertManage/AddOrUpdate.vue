<template>
  <!-- 添加或修改能耗信息对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="1000px"
    append-to-body
    :before-close="cancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题：" prop="expertdbTitle">
        <el-input v-model="form.expertdbTitle" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="分类：" prop="categoryName">
        <el-button>{{ categoryName }}</el-button>
      </el-form-item>
      <el-form-item label="上传配图" prop="fileList">
        <el-upload
          ref="uploadImage"
          class="upload-demo"
          :action="uploadImgUrl"
          :file-list="fileList"
          list-type="picture"
          :before-remove="beforeRemove"
          :on-remove="onRemove"
          :auto-upload="false"
          accept=".jpeg,.jpg,.png,.gif"
          :headers="headers"
          :limit="5"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png/gif/jpeg文件,可上传多个
          </div>
        </el-upload>
      </el-form-item>

      <!-- 上传文档 尚未添加操作 -->
      <el-form-item label="上传文档" prop="docList">
        <el-upload
          class="upload-demo"
          ref="uploadDoc"
          accept=".doc,.docx"
          :file-list="docList"
          :action="uploadDocUrl"
          :show-file-list="true"
          :before-remove="beforeRemove"
          :auto-upload="false"
          :limit="1"
          :headers="headers"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传word文档文件且只能有一个
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item label="简介：" prop="expertdbBIntroduction">
        <el-input
          v-model="form.expertdbBriefIntroduction"
          type="textarea"
          placeholder="请输入简介"
        />
      </el-form-item>
      <el-form-item label="内容详情：" prop="expertdbDetails">
        <quill-editor
          :value="form.expertdbDetails"
          :from="from"
          @input="UpInput"
          @uploadDetails="getImgUrls"
        ></quill-editor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  addProduction,
  updateProduction,
  getImgProduction,
} from "@/api/expertManage/production";
import {
  addSeedling,
  updateSeedling,
  getImgSeedling,
} from "@/api/expertManage/seedling";
import { addPest, updatePest, getImgPest } from "@/api/expertManage/pest";
import QuillEditor from "./QuillEditor";
import { parseTime } from "@/utils/ruoyi";
import { getToken } from "@/utils/auth";
import { deleteImage } from "@/api/expertManage/downloadAndUpload"
export default {
  name: "AddOrUpdate",
  props: ["title", "form", "rules", "open", "categoryName", "from"],
  components: {
    // VueUeditorWrap
    QuillEditor,
  },
  data() {
    return {
      // 富文本编辑器的服务器上传所有图片路径数组
      imgUrls: [],
      // 图片上传路由
      uploadImgUrl: "",
      // 文件上传路由
      uploadDocUrl: "",
      // 图片列表
      fileList: [],
      // 文件
      docList: [],
      // 上传时携带token
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  methods: {
    // 删除用户编辑后服务器中的图片
    deleteImgs(imgUrls) {
      const htmlContent = this.form.expertdbDetails;
      const imgReg = /<img.*?(?:>|\/>)/gi;
      // 匹配src属性
      const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
      const arr = htmlContent.match(imgReg);
      let imgs = [];
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          var src = arr[i].match(srcReg)[1];
          imgs.push(src);
        }
      }
      for (let img of imgs) {
        if (imgUrls.indexOf(img) !== -1) {
          delete window.img;
        }
      }
    },
    // 获取服务器上传的所有url地址进行比对
    getImgUrls(imgUrls) {
      this.imgUrls = imgUrls;
    },
    // 富文本编辑器更新
    UpInput(msg) {
      this.form.expertdbDetails = msg;
    },
    // 移除文件之前
    beforeRemove(file) {
      return this.$confirm(`确定移除${file.name}`);
    },
    // 移除文件
    onRemove(file, fileList) {
      let index
      for(let i=0;i<this.fileList.length;i++) {
        if(this.fileList[i].uid === file.uid) {
          index = i
          break
        }
      }
      deleteImage({
        index,
        from: this.from,
        id: this.form.expertdbId
      }).then(res => {
        if(res) {
          this.$message({
            message: '图片删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('图片删除异常')
        }
      }).catch(err => {
        this.$message.error('图片删除异常')
      })
    },
    /** 提交按钮 */
    submitForm() {
      const from = this.from;
      let update, add;
      if (from.includes("production")) {
        update = updateProduction;
        add = addProduction;
      } else if (from.includes("quality")) {
        update = updateSeedling;
        add = addSeedling;
      } else {
        update = updatePest;
        add = addPest;
      }
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          // this.deleteImgs(this.imgUrls)
          if (this.form.expertdbId !== null) {
            // 修改选项时的操作
            this.uploadDocUrl = `${process.env.VUE_APP_BASE_API}/expert/wordfile/firstupload?id=${this.form.expertdbId}&from=${from}`;
            this.uploadImgUrl = `${process.env.VUE_APP_BASE_API}/expert/imagefile/firstupload?id=${this.form.expertdbId}&from=${from}`;
            await update(this.form).then(
              (response) => {
                this.msgSuccess("修改成功");
              },
              (err) => {
                console.log(err);
              }
            );
            // 上传配图和文档操作
            this.$refs.uploadImage.submit();
            this.$refs.uploadDoc.submit();
            this.$emit("cancel");
            this.$emit("getList");
          } else {
            // 新增时的操作
            this.form.createTime = parseTime(new Date());
            await add(this.form).then(
              (response) => {
                this.uploadDocUrl = `${process.env.VUE_APP_BASE_API}/expert/wordfile/firstupload?id=${response.data}&from=${from}`;
                this.uploadImgUrl = `${process.env.VUE_APP_BASE_API}/expert/imagefile/firstupload?id=${response.data}&from=${from}`;
                this.msgSuccess("新增成功");
              },
              (err) => {
                console.log(err);
              }
            );
            // 上传配图和文档操作
            this.$refs.uploadImage.submit();
            this.$refs.uploadDoc.submit();
            this.$emit("cancel");
            this.$emit("getList");
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.$emit("cancel");
      this.$emit("reset");
    },
    // base64编码格式转换为图片
    base64toFile(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);
      const options = {
        type: "image/jpeg",
        endings: "native",
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName + ".jpg", options); //返回文件流
    },
  },
  // 获取图片列表
  watch: {
    open: function (val, oldval) {
      if (val && this.form.expertdbId !== null) {
        const from = this.from;
        let getImg,
          imgs = [];
        if (from.includes("production")) getImg = getImgProduction;
        else if (from.includes("pest")) getImg = getImgPest;
        else getImg = getImgSeedling;
        getImg(this.form.expertdbId).then(
          (res) => {
            let content = res.content,
              type = res.type;
            if (content.length === 0) this.hasImg = false;
            for (let i = 0; i < content.length; i++) {
              const obj = {};
              obj["name"] = `${i + 1}.${type[i]}`;
              obj["url"] = `data:image/${type[i]};base64,${content[i]}`;
              imgs.push(obj);
            }
            this.fileList = imgs;
          },
          (err) => {
            console.log(err);
          }
        );

        // 获取vue实例
        const that = this;
        const url =
          process.env.VUE_APP_BASE_API +
          "/expert/file/download" +
          "?from=" +
          this.from +
          "&id=" +
          this.form.expertdbId;
        const xhr = new XMLHttpRequest();
        xhr.open("get", url, true); // get、post都可
        xhr.responseType = "blob"; // 转换流
        xhr.setRequestHeader("Authorization", "Bearer " + getToken()); // token键值对
        xhr.onload = async function () {
          if (this.status == 200) {
            let blob = this.response;
            let url = window.URL.createObjectURL(blob);
            const obj = {};
            obj["name"] = "文档.docx";
            obj["url"] = url;
            that.docList = [obj];
          }
        };
        xhr.send();
      }
      if (val && this.form.expertdbId === null) {
        this.docList = [];
        this.fileList = [];
      }
    },
  },
};
</script>