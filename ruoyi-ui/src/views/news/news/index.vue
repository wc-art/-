<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="菜单名称1" prop="menuName1">
        <el-input
          v-model="queryParams.menuName1"
          placeholder="菜单名称1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="菜单名称2" prop="menuName2">
        <el-input
          v-model="queryParams.menuName2"
          placeholder="请输入菜单名称2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="菜单名称3" prop="menuName3">
        <el-input
          v-model="queryParams.menuName3"
          placeholder="请输入菜单名称3"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="0代表未审核1代表审核通过2代表审核不通过" prop="approvalStatus">-->
<!--        <el-select v-model="queryParams.approvalStatus" placeholder="请选择0代表未审核1代表审核通过2代表审核不通过" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="外码，审核人角色身份" prop="approvalBy">-->
<!--        <el-input-->
<!--          v-model="queryParams.approvalBy"-->
<!--          placeholder="请输入外码，审核人角色身份"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:news:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:news:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['system:news:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--		  :loading="exportLoading"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:news:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="newsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" />
      <el-table-column label="菜单名称1" align="center" prop="menuName1" />
      <el-table-column label="菜单名称2" align="center" prop="menuName2" />
      <el-table-column label="菜单名称3" align="center" prop="menuName3" />
      <el-table-column label="审核状态" align="center" prop="approvalStatus" />
<!--      <el-table-column label="外码，审核人角色身份" align="center" prop="approvalBy" />-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['system:news:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:news:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    &lt;!&ndash; 添加或修改消息提示对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="80px">-->
<!--        <el-form-item label="外码" prop="menuName1">-->
<!--          <el-input v-model="form.menuName1" placeholder="请输入外码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="外码" prop="menuName2">-->
<!--          <el-input v-model="form.menuName2" placeholder="请输入外码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="外码" prop="menuName3">-->
<!--          <el-input v-model="form.menuName3" placeholder="请输入外码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="0代表未审核-->
<!--1代表审核通过-->
<!--2代表审核不通过-->
<!--">-->
<!--          <el-radio-group v-model="form.approvalStatus">-->
<!--            <el-radio label="1">请选择字典生成</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="外码，审核人角色身份" prop="approvalBy">-->
<!--          <el-input v-model="form.approvalBy" placeholder="请输入外码，审核人角色身份" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { listNews, getNews, delNews, addNews, updateNews, exportNews } from "@/api/news/news";

export default {
  name: "News",
  components: {
  },
  data() {
    return {
      userRoles:[],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 消息提示表格数据
      newsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        menuName1: null,
        menuName2: null,
        menuName3: null,
        approvalStatus: null,
        approvalBy: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName1: [
          { required: true, message: "外码不能为空", trigger: "blur" }
        ],
        approvalStatus: [
          { required: true, message: "0代表未审核,1代表审核通过,2代表审核不通过不能为空", trigger: "blur" }
        ],
        approvalBy: [
          { required: true, message: "外码，审核人角色身份不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    console.log("当前用户的角色",this.$store.getters.roles)
    this.userRoles=this.$store.getters.roles
    this.getList();
  },
  methods: {
    /** 查询消息提示列表 */
    getList() {
      this.loading = true;
      this.newsList=[]
      listNews(this.queryParams).then(response => {
        console.log('请求消息数据列表',response)
        for(var i=0;i<this.userRoles.length;i++) {
          for(var j=0;j<response.rows.length;j++){
            if(this.userRoles[i]==response.rows[j].approvalBy){
              // delete response.rows[j].newsId
              this.newsList.push(response.rows[j])
            }
          }
        }
        this.total = this.newsList.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        newsId: null,
        menuName1: null,
        menuName2: null,
        menuName3: null,
        approvalStatus: 0,
        approvalBy: null,
        approvalBys: [],
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.newsId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加消息提示";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const newsId = row.newsId || this.ids
      getNews(newsId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改消息提示";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.newsId != null) {
            updateNews(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNews(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const newsIds = row.newsId || this.ids;
      this.$confirm('是否确认删除消息提示编号为"' + newsIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNews(this.form);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有消息提示数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportNews(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
