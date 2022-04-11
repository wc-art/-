<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="申请编号" prop="plugApplyId">
        <el-input
          v-model="queryParams.plugApplyId"
          placeholder="请输入申请编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领用量" prop="consumeAmount">
        <el-input
          v-model="queryParams.consumeAmount"
          placeholder="请输入领用量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领用时间" prop="consumeTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.consumeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择领用时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领用人" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入领用人"
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
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['consume:plugcon:edit']"
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
          v-hasPermi="['consume:plugcon:remove']"
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
          v-hasPermi="['consume:plugcon:export']"
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
      :data="plugconList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="领用编号" align="center" prop="plugConsumeId" />
      <el-table-column label="申请编号" align="center" prop="plugApplyId" />
      <el-table-column label="领用量" align="center" prop="consumeAmount" />
      <el-table-column
        label="领用时间"
        align="center"
        prop="consumeTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.consumeTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领用人" align="center" prop="userName" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改查看领用信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请编号" prop="plugApplyId">
          <el-input v-model="form.plugApplyId" placeholder="请输入申请编号" />
        </el-form-item>
        <el-form-item label="领用量" prop="consumeAmount">
          <el-input v-model="form.consumeAmount" placeholder="请输入领用量" />
        </el-form-item>
        <el-form-item label="领用时间" prop="consumeTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.consumeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择领用时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="领用人" prop="userId">
          <el-input v-model="form.userName" placeholder="请输入领用人" />
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
  listPlugcon,
  getPlugcon,
  delPlugcon,
  addPlugcon,
  updatePlugcon,
  exportPlugcon,
} from "@/api/consume/plugcon";

export default {
  name: "Plugcon",
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
      // 查看领用信息表格数据
      plugconList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        exportIds: [],
        pageNum: 1,
        pageSize: 10,
        plugApplyId: null,
        consumeAmount: null,
        consumeTime: null,
        userId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        plugApplyId: [
          { required: true, message: "申请编号不能为空", trigger: "blur" },
        ],
        consumeAmount: [
          { required: true, message: "领用量不能为空", trigger: "blur" },
          {
            type: "number",
            message: "请输入非负数",
            trigger: "blur",
            transform(value) {
              if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
                return true;
              } else {
              }
            },
          },
        ],
        consumeTime: [
          { required: true, message: "领用时间不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "领用人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询查看领用信息列表 */
    getList() {
      this.loading = true;
      listPlugcon(this.queryParams).then((response) => {
        this.plugconList = response.rows;
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
        plugConsumeId: null,
        plugApplyId: null,
        consumeAmount: null,
        consumeTime: null,
        userId: null,
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
      this.ids = selection.map((item) => item.plugConsumeId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加查看领用信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const plugConsumeId = row.plugConsumeId || this.ids;
      getPlugcon(plugConsumeId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改查看领用信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.plugConsumeId != null) {
            updatePlugcon(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlugcon(this.form).then((response) => {
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
      const plugConsumeIds = row.plugConsumeId || this.ids;
      this.$confirm("是否确认删除查看领用信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delPlugcon(plugConsumeIds);
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
      queryParams.exportIds = [];
      if (this.ids.length == 0) {
        for (let i = 0; i < this.plugconList.length; i++) {
          queryParams.exportIds.push(this.plugconList[i].plugConsumeId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出查看领用信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportPlugcon(queryParams);
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
