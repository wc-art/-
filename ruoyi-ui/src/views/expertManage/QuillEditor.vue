<template>
  <div>
    <!-- 图片上传组件辅助 -->
    <el-upload class="avatar-uploader quill-img" :action="uploadImgUrl" name="file" :headers="headers"
      :show-file-list="false" :on-success="quillImgSuccess" :on-error="uploadError" :before-upload="quillImgBefore"
      accept='.jpg,.jpeg,.png,.gif'></el-upload>

    <!-- 富文本组件 -->
    <quill-editor class="editor" v-model="content" ref="quillEditor" :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  import katex from 'katex'
  window.katex = katex

  import Quill from 'quill'
  import { quillEditor } from "vue-quill-editor";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import ImageResize from 'quill-image-resize-module'  //添加
  Quill.register('modules/imageResize', ImageResize)  //添加

  //为quill添加字体（需要增加一个对应的font.css文件，并在项目的main.js文件中引入进而生效）
  const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  const Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单 
  Quill.register(Font, true);
  //quill图片可拖拽上传,可复制粘贴
  import { ImageDrop } from 'quill-image-drop-module';
  Quill.register('modules/imageDrop', ImageDrop);


  // 自定义字号的大小
  const sizes = ["10px", false, "16px", "18px", "20px", "22px", "26px", "28px", "30px"];
  const Size = Quill.import("formats/size");
  Size.whitelist = sizes;


  // 工具栏配置
  const toolbarOptions = [
    [{ font: fonts }],                                // 字体样式
    ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
    ["blockquote", "code-block"],                    // 引用  代码块
    [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
    [{ indent: "-1" }, { indent: "+1" }],            // 缩进
    // [{ size: ["small", false, "large", "huge"] }],   // 字体大小
    [{ size: sizes }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
    [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
    [{ align: [] }],                                 // 对齐方式
    ["clean"],                                       // 清除文本格式
    ["link", "image", "video", "formula"]                       // 链接、图片、视频
  ];

  export default {
    name: 'QuillEditor',
    props: {
      /* 编辑器的内容 */
      value: {
        type: String
      },
      /* 图片大小 */
      maxSize: {
        type: Number,
        default: 4000 //kb
      },
      // 分类
      from: {
        type: String
      }
    },
    components: { quillEditor },
    data() {
      return {
        // 图片url数组
        // imgUrls: [],
        // 编辑器内容
        content: this.value,
        // 编辑器配置项
        editorOption: {
          theme: "snow", // or 'bubble'
          placeholder: "请输入内容",
          modules: {
            imageResize: {   //添加
              displayStyles: {   //添加
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']   //添加
            },
            formula: true,
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector(".quill-img input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        },
        uploadImgUrl: `${process.env.VUE_APP_BASE_API}/expert/txt/image/upload`, // 上传的图片服务器地址
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      };
    },
    watch: {
      value: function () {
        this.content = this.value;
      }
    },
    methods: {
      // onEditorBlur() {
      //   //失去焦点事件
      //   this.$emit('uploadDetails', this.imgUrls)
      // },
      onEditorFocus() {
        //获得焦点事件
      },
      onEditorChange() {
        //内容改变事件
        // this.$emit("input", this.content);
      },

      // 富文本图片上传前
      quillImgBefore(file) {
        let fileType = file.type;
        if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
          return true;
        } else {
          this.$message.error('请插入图片类型文件(jpg/jpeg/png)');
          return false;
        }
      },

      quillImgSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.quillEditor.quill;
        // 如果上传成功
        if (res.code == 200) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          console.log('url', res.msg)
          // this.imgUrls.push(url)
          quill.insertEmbed(length, "image", res.msg);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
      },
      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.$message.error("图片插入失败");
      }
    },
    mounted() {
      const titleConfig = {
        'ql-bold': '加粗',
        'ql-color': '颜色',
        'ql-font': '字体',
        'ql-code': '插入代码',
        'ql-italic': '斜体',
        'ql-link': '添加链接',
        'ql-background': '背景颜色',
        'ql-size': '字体大小',
        'ql-strike': '删除线',
        'ql-script': '上标/下标',
        'ql-underline': '下划线',
        'ql-blockquote': '引用',
        'ql-header': '标题',
        'ql-indent': '缩进',
        'ql-list': '列表',
        'ql-align': '文本对齐',
        'ql-direction': '文本方向',
        'ql-code-block': '代码块',
        'ql-formula': '公式',
        'ql-image': '图片',
        'ql-video': '视频',
        'ql-clean': '清除字体样式'
      }
      const oToolBar = document.querySelector('.ql-toolbar'),
        aButton = oToolBar.querySelectorAll('button'),
        aSelect = oToolBar.querySelectorAll('select')
      aButton.forEach(function (item) {
        if (item.className === 'ql-script') {
          item.value === 'sub' ? item.title = '下标' : item.title = '上标'
        } else if (item.className === 'ql-indent') {
          item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进'
        } else {
          item.title = titleConfig[item.classList[0]]
        }
      })
      aSelect.forEach(function (item) {
        item.parentNode.title = titleConfig[item.classList[0]]
      })
    },
  };
</script>

<style>
  .editor {
    white-space: pre-wrap !important;
    line-height: normal !important;
    /* height: 192px; */
  }

  .ql-editor {
    min-height: 450px;
    max-height: 1000px;
  }

  .quill-img {
    display: none;
  }

  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "Normar";
  }

  /* .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "small";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "large";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "huge";
  } */

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }

  /* 字号设置 */
  /* 默认字号 */
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: "14px";
    font-size: 14px;
  }

  .ql-size-14px {
    font-size: 14px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: "10px";
    font-size: 10px;
  }

  .ql-size-10px {
    font-size: 10px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16px";
    font-size: 16px;
  }

  .ql-size-16px {
    font-size: 16px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18px";
    font-size: 18px;
  }

  .ql-size-18px {
    font-size: 18px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20px";
    font-size: 20px;
  }

  .ql-size-20px {
    font-size: 20px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before {
    content: "22px";
    font-size: 22px;
  }

  .ql-size-22px {
    font-size: 22px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
    content: "26px";
    font-size: 26px;
  }

  .ql-size-26px {
    font-size: 26px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
    content: "28px";
    font-size: 28px;
  }

  .ql-size-28px {
    font-size: 28px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
    content: "30px";
    font-size: 30px;
  }

  .ql-size-30px {
    font-size: 30px;
  }
  /* 字体种类样式 */
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
    content: "宋体";
    font-family: "SimSun";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
    content: "黑体";
    font-family: "SimHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft-YaHei"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft-YaHei"]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
    content: "楷体";
    font-family: "KaiTi";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
    content: "仿宋";
    font-family: "FangSong";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
    content: "Arial";
    font-family: "Arial";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Times-New-Roman"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Times-New-Roman"]::before {
    content: "Times New Roman";
    font-family: "Times New Roman";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
    content: "sans-serif";
    font-family: "sans-serif";
  }

  .ql-font-SimSun {
    font-family: "SimSun";
  }

  .ql-font-SimHei {
    font-family: "SimHei";
  }

  .ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
  }

  .ql-font-KaiTi {
    font-family: "KaiTi";
  }

  .ql-font-FangSong {
    font-family: "FangSong";
  }

  .ql-font-Arial {
    font-family: "Arial";
  }

  .ql-font-Times-New-Roman {
    font-family: "Times New Roman";
  }

  .ql-font-sans-serif {
    font-family: "sans-serif";
  }
</style>