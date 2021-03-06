<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="参数名称" prop="parameterLaborName">
        <el-input
          v-model="queryParams.parameterLaborName"
          placeholder="请输入参数名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:labor:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:labor:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:labor:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['system:labor:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="laborList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="编号" align="center" prop="parameterLaborId" />
      <el-table-column
        label="参数名称"
        align="center"
        prop="parameterLaborName"
      />
      <el-table-column
        label="计量方式"
        align="center"
        prop="parameterMeasure"
      />
      <el-table-column
        label="参数值"
        align="center"
        prop="parameterLaborValue"
      />
      <el-table-column
        label="参数单位"
        align="center"
        prop="parameterLaborUnit"
      />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:labor:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:labor:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改劳动力参数管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数名称" prop="parameterLaborName">
          <el-input
            v-model="form.parameterLaborName"
            placeholder="请输入参数名称"
          />
        </el-form-item>
        <el-form-item label="计量方式" prop="parameterMeasure">
          <el-input
            v-model="form.parameterMeasure"
            placeholder="请输入计量方式"
          />
        </el-form-item>
        <el-form-item label="参数值" prop="parameterLaborValue">
          <el-input
            v-model.number="form.parameterLaborValue"
            placeholder="请输入参数值"
          />
        </el-form-item>
        <el-form-item label="参数单位" prop="parameterLaborUnit">
          <el-input
            v-model="form.parameterLaborUnit"
            placeholder="请输入参数单位"
          />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            v-model="form.note"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLabor,
  getLabor,
  delLabor,
  addLabor,
  updateLabor,
  exportLabor,
} from "@/api/system/labor";

export default {
  name: "Labor",
  components: {},
  data() {
    return {
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
      // 劳动力参数管理表格数据
      laborList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        pageNum: 1,
        pageSize: 10,
        parameterLaborName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parameterLaborName: [
          { required: true, message: "参数名称不能为空", trigger: "blur" },
        ],
        parameterMeasure: [
          { required: true, message: "计量方式不能为空", trigger: "blur" },
        ],
        parameterLaborValue: [
          { required: true, message: "参数值不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
        parameterLaborUnit: [
          { required: true, message: "参数单位不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询劳动力参数管理列表 */
    getList() {
      this.loading = true;
      listLabor(this.queryParams).then((response) => {
        this.laborList = response.rows;
        this.total = response.total;
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
        parameterLaborId: null,
        parameterLaborName: null,
        parameterMeasure: null,
        parameterLaborValue: null,
        parameterLaborUnit: null,
        note: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
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
      this.ids = selection.map((item) => item.parameterLaborId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加劳动力参数管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const parameterLaborId = row.parameterLaborId || this.ids;
      getLabor(parameterLaborId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改劳动力参数管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.parameterLaborId != null) {
            updateLabor(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLabor(this.form).then((response) => {
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
      const parameterLaborIds = row.parameterLaborId || this.ids;
      this.$confirm("是否确认删除该劳动力参数信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delLabor(parameterLaborIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出劳动力参数管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportLabor(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
  },
};
</script>
