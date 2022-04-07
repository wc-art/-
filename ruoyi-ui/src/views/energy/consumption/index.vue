<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="年份" prop="year">
        <el-input
          v-model="queryParams.year"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-input
          v-model="queryParams.month"
          placeholder=""
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
          v-hasPermi="['energy:consumption:add']"
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
          v-hasPermi="['energy:consumption:edit']"
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
          v-hasPermi="['energy:consumption:remove']"
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
          v-hasPermi="['energy:consumption:export']"
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
      :data="consumptionList"
      :row-class-name="rowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="xh" />
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="月份" align="center" prop="month" />
      <el-table-column label="用电量" align="center" prop="electricityAmount" />
      <el-table-column label="单位" align="center" prop="electricityUnit" />
      <el-table-column label="用水量" align="center" prop="waterAmount" />
      <el-table-column label="单位" align="center" prop="waterUnit" />
      <el-table-column label="用气量" align="center" prop="naturalgasAmount" />
      <el-table-column label="单位" align="center" prop="naturalgasUnit" />
      <el-table-column label="用煤量" align="center" prop="coalAmount" />
      <el-table-column label="单位" align="center" prop="coalUnit" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="100px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['energy:consumption:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['energy:consumption:remove']"
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

    <!-- 添加或修改能耗信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年份" prop="year">
          <el-input v-model="form.year" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="月份" prop="month">
          <el-input v-model="form.month" placeholder="请输入月份" />
        </el-form-item>
        <el-form-item label="用电量" prop="electricityAmount">
          <el-input
            v-model="form.electricityAmount"
            placeholder="请输入用电量"
          />
        </el-form-item>
        <el-form-item label="单位" prop="electricityUnit">
          <el-input v-model="form.electricityUnit" placeholder="度" />
        </el-form-item>
        <el-form-item label="用水量" prop="waterAmount">
          <el-input v-model="form.waterAmount" placeholder="请输入用水量" />
        </el-form-item>
        <el-form-item label="单位" prop="waterUnit">
          <el-input v-model="form.waterUnit" placeholder="吨" />
        </el-form-item>
        <el-form-item label="用气量" prop="naturalgasAmount">
          <el-input
            v-model="form.naturalgasAmount"
            placeholder="请输入用气量"
          />
        </el-form-item>
        <el-form-item label="单位" prop="naturalgasUnit">
          <el-input v-model="form.naturalgasUnit" placeholder="立方" />
        </el-form-item>
        <el-form-item label="用煤量" prop="coalAmount">
          <el-input v-model="form.coalAmount" placeholder="请输入用煤量" />
        </el-form-item>
        <el-form-item label="单位" prop="coalUnit">
          <el-input v-model="form.coalUnit" placeholder="吨" />
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
  listConsumption,
  getConsumption,
  delConsumption,
  addConsumption,
  updateConsumption,
  exportConsumption,
} from "@/api/energy/consumption";

export default {
  name: "Consumption",
  data() {
    let patter = /(^$)|((^[1-9]\d*)|^0)(\.\d{0,4}){0,1}$/;
    let isCountNum = (rule, value, callback) => {
      if (value != null) {
        if (!patter.test(value)) {
          return callback(new Error("必须非负整数或至多保留四位小数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

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
      // 能耗信息表格数据
      consumptionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 更新时间时间范围
      daterangeUpdateTime: [],

      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        energyconsumptionIds: [],
        pageNum: 1,
        pageSize: 10,
        year: null,
        month: null,
        electricityAmount: null,
        electricityUnit: null,
        waterAmount: null,
        waterUnit: null,
        naturalgasAmount: null,
        naturalgasUnit: null,
        coalAmount: null,
        coalUnit: null,
        note: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      },

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        year: [
          { required: true, message: "年份不能为空", trigger: "blur" },
          {
            pattern: /^(20|29)\d{2}$/,
            message: "范围在2000-2999：",
            trigger: "blur",
          },
        ],
        // year: [
        //   {required: true, message: "年份不能为空", trigger: "blur"},
        //   {required: true, message: "年份必须为整数", "pattern":/^[0-9]*$/}
        // ],
        month: [
          { required: true, message: "月份不能为空", trigger: "blur" },
          {
            pattern: /^(0?[[1-9]|1[0-2])$/,
            message: "范围在1-12",
            trigger: "blur",
          },
        ],
        electricityAmount: [{ validator: isCountNum, trigger: "blur" }],
        waterAmount: [{ validator: isCountNum }],
        naturalgasAmount: [{ validator: isCountNum }],
        coalAmount: [{ validator: isCountNum }],
      },
    };
  },
  components: {},
  created() {
    this.getList();
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    /** 查询能耗信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      listConsumption(this.queryParams).then((response) => {
        this.consumptionList = response.rows;
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
        energyConsumptionId: null,
        year: null,
        month: null,
        electricityAmount: null,
        electricityUnit: null,
        waterAmount: null,
        waterUnit: null,
        naturalgasAmount: null,
        naturalgasUnit: null,
        coalAmount: null,
        coalUnit: null,
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
      this.daterangeCreateTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.energyConsumptionId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加能耗信息";
      this.form.createBy = this.$store.state.user.name;
      this.form.updateBy = this.$store.state.user.name;
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();

      const energyConsumptionId = row.energyConsumptionId || this.ids;
      getConsumption(energyConsumptionId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改能耗信息";
        this.form.updateBy = this.$store.state.user.name;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.energyConsumptionId != null) {
            updateConsumption(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConsumption(this.form).then((response) => {
              this.msgSuccess("新增成功");
              // this.msgError("输入有误！")
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const energyConsumptionIds = row.energyConsumptionId || this.ids;
      const xh = row.xh;
      this.$confirm('是否确认删除能耗信息编号为"' + xh + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delConsumption(energyConsumptionIds);
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
      queryParams.energyconsumptionIds = [];
      if (this.ids.length == 0) {
        for (let i = 0; i < this.consumptionList.length; i++) {
          queryParams.energyconsumptionIds.push(
            this.consumptionList[i].energyConsumptionId
          );
        }
      } else if (this.ids.length != 0) {
        queryParams.energyconsumptionIds = this.ids;
      }
      this.$confirm("是否确认导出所有能耗信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportConsumption(queryParams);
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
