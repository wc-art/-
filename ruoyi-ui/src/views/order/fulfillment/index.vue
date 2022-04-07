<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="operationId">
        <el-input
          v-model="queryParams.operationId"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="beginDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="endDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['order:fulfillment:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:fulfillment:edit']"
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
          v-hasPermi="['system:fulfillment:remove']"
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
          v-hasPermi="['system:fulfillment:export']"
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
      :data="fulfillmentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <!--      <el-table-column label="编号" align="center" prop="orderFulfillmentId" />-->
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="操作类型" align="center" prop="operation" />
      <el-table-column
        label="开始时间"
        align="center"
        prop="beginDate"
        width="180"
      >
        <template slot-scope="scope">
          {{ BeginDate(scope.row) }}
          <span>{{ scope.row.beginDate }}</span>
          <!-- {{ parseTime(scope.row.beginDate, '{y}-{m}-{d}') }} -->
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        align="center"
        prop="endDate"
        width="180"
      >
        <template slot-scope="scope">
          {{ EndDate(scope.row) }}
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" align="center" prop="note" />
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
            v-hasPermi="['system:fulfillment:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:fulfillment:remove']"
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

    <!-- 添加或修改订单任务执行对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="操作类型" prop="operationId">
          <el-select
            v-model="form.operationId"
            placeholder="请选择操作类型"
            size="small"
          >
            <el-option
              v-for="(operation, index) in operationName"
              :key="index"
              :label="operation.operationName"
              :value="operation.operationId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginDate">
          <el-date-picker
            clearable
            size="small"
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker
            clearable
            size="small"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="说明" prop="note">
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
  listFulfillment,
  getFulfillment,
  delFulfillment,
  addFulfillment,
  updateFulfillment,
  exportFulfillment,
} from "@/api/order/fulfillment";
import { listOperation } from "@/api/order/operation";

export default {
  name: "Fulfillment",
  components: {},
  data() {
    return {
      operationName: [],
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
      // 订单任务执行表格数据
      fulfillmentList: [],
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
        orderId: null,
        operationId: null,
        beginDate: null,
        endDate: null,
        note: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        operationId: [
          { required: true, message: "操作名称不能为空", trigger: "blur" },
        ],
        beginDate: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        endDate: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getOperationList();
  },
  methods: {
    // 获取操作类型
    getOperationList() {
      listOperation().then((res) => {
        // console.log(res.rows);
        let data = res.rows;
        data.forEach((operation) => {
          this.operationName.push({
            operationId: operation.operationId,
            operationName: operation.operationName,
          });
        });
      });
    },
    // 截取开始日期字符串
    BeginDate(row) {
      const begindating = row.beginDate;
      const str = begindating.slice(0, 10);
      row.beginDate = str;
    },
    // 截取结束日期字符串
    EndDate(row) {
      const enddating = row.endDate;
      const strr = enddating.slice(0, 10);
      row.endDate = strr;
    },
    /** 查询订单任务执行列表 */
    getList() {
      this.loading = true;
      listFulfillment(this.queryParams).then((response) => {
        this.fulfillmentList = response.rows;
        this.total = response.total;
        this.loading = false;
        // console.log(this.fulfillmentList)
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
        orderFulfillmentId: null,
        orderId: null,
        operationId: null,
        beginDate: null,
        endDate: null,
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
      this.ids = selection.map((item) => item.orderFulfillmentId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单任务执行";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // console.log(row);
      this.reset();
      const orderFulfillmentId = row.orderFulfillmentId || this.ids;
      getFulfillment(orderFulfillmentId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单任务执行";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.orderFulfillmentId != null) {
            updateFulfillment(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFulfillment(this.form).then((response) => {
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
      const orderFulfillmentIds = row.orderFulfillmentId || this.ids;
      this.$confirm(
        '是否确认删除订单任务执行编号为"' + orderFulfillmentIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delFulfillment(orderFulfillmentIds);
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
        for (let i = 0; i < this.orderList.length; i++) {
          queryParams.exportIds.push(this.orderList[i].orderFulfillmentId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有订单任务执行数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportFulfillment(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
  },
  watch: {
    $route() {
      this.getList();
    },
  },
};
</script>
