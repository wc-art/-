<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单名称" prop="orderName">
        <el-input
          v-model="queryParams.orderName"
          placeholder="请输入订单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作时间" prop="workTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.workTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择工作时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="工作地点" prop="workPlace">
        <el-input
          v-model="queryParams.workPlace"
          placeholder="请输入工作地点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="工作量" prop="workLoad">-->
<!--        <el-input-->
<!--          v-model="queryParams.workLoad"-->
<!--          placeholder="请输入工作量"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="工作量单位" prop="workUnit">-->
<!--        <el-input-->
<!--          v-model="queryParams.workUnit"-->
<!--          placeholder="请输入工作量单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="审批" prop="approval">-->
<!--        <el-input-->
<!--          v-model="queryParams.approval"-->
<!--          placeholder="请输入审批"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="生产过程" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入生产过程名称"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
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
      :data="processList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column
        label="工作时间"
        align="center"
        prop="workTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作地点" align="center" prop="workPlace" />
      <el-table-column label="工作量" align="center" prop="workLoad" />
      <el-table-column label="工作量单位" align="center" prop="workUnit" />
      <el-table-column label="审批" align="center" prop="approval" width="140px">
        <template slot-scope="scope">
        <span>
          {{approvalStatus[scope.row.approval]}}
        </span>
        </template>
      </el-table-column>
      <el-table-column label="生产过程" align="center" prop="type" >
      <template slot-scope="scope">
        <span>
          {{typeValue[scope.row.type]}}
        </span>
      </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listProcess,
  getProcess,
  delProcess,
  addProcess,
  updateProcess,
  exportProcess,
} from "@/api/view/processview";

export default {
  name: "Process",
  data() {
    return {
      approvalStatus:{
        0:'未审批',
        1:'审批通过',
        2:'未通过'
      },
      typeValue:{
        'artiseeding':'人工播种',
        'fertilizer':'施肥',
        'graftingclip':'嫁接',
        'loadplate':'装盘',
        'moveplate':'移盘',
        'mergeplate':'合盘',
        'machseeding':'机器播种',
        'packing':'装箱',
        'remosproutiller':'除萌蘖',
        'sepaseedling':'分苗',
        'stromamix':'基质调配',
        'takeoffhat':'脱帽',
      },
      // 遮罩层
      loading: true,
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
      // VIEW表格数据
      processList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userName: null,
        orderId: null,
        workTime: null,
        orderName: null,
        workPlace: null,
        workLoad: null,
        workUnit: null,
        note: null,
        approval: null,
        type: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [{ required: true, message: "$comment不能为空", trigger: "blur" }],
        userId: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        workTime: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        workPlace: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        workLoad: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        workUnit: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
        approval: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询VIEW列表 */
    getList() {
      this.loading = true;
      listProcess(this.queryParams).then((response) => {
        this.processList = response.rows;
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
        id: null,
        userId: null,
        userName: null,
        orderId: null,
        workTime: null,
        orderName: null,
        workPlace: null,
        workLoad: null,
        workUnit: null,
        note: null,
        approval: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        type: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加VIEW";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getProcess(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改VIEW";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateProcess(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProcess(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除VIEW编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delProcess(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.exportLoading = true;
        return exportProcess(queryParams);
      }).then(response => {
        this.download(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
