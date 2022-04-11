<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="调节剂类型" prop="regulatorType" label-width="85px">
        <el-input
          v-model="queryParams.regulatorType"
          placeholder="请输入调节剂类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调节剂名称" prop="regulatorName" label-width="85px">
        <el-input
          v-model="queryParams.regulatorName"
          placeholder="请输入调节剂名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购自公司" prop="originCompany">
        <el-input
          v-model="queryParams.originCompany"
          placeholder="请输入购自公司"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请量" prop="applyAmount">
        <el-input
          v-model="queryParams.applyAmount"
          placeholder="请输入申请量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="领用状态" prop="consumeStatus">
        <el-select
          v-model="queryParams.consumeStatus"
          placeholder="请选择领用状态"
          clearable
          size="small"
        >
          <el-option label="未领用" value="0" />
          <el-option label="已领用" value="1" />
        </el-select>
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
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          plain-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['consume:regulatorap:add']"-->
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
      <!--          v-hasPermi="['consume:regulatorap:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['consume:regulatorap:remove']"
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
          v-hasPermi="['consume:regulatorap:export']"
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
      :data="regulatorapList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="申请编号"
        align="center"
        prop="regulatorApplyId"
      />
      <el-table-column
        label="订单分配号"
        align="center"
        prop="orderAllocationId"
        label-width="90px"
      />
      <el-table-column
        label="调节剂类型"
        align="center"
        prop="regulatorType"
        label-width="90px"
      />
      <el-table-column
        label="调节剂名称"
        align="center"
        prop="regulatorName"
        label-width="90px"
      />
      <el-table-column label="有效含量" align="center" prop="content" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="订单名" align="center" prop="orderName" />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column
        label="申请时间"
        align="center"
        prop="applyTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="userName" />
      <el-table-column
        label="生产厂长审批状态"
        align="center"
        prop="approvalStatusProduct"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalOptions[scope.row.approvalStatusProduct]["label"] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="技术厂长审批状态"
        align="center"
        prop="approvalStatusTechnology"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalOptions[scope.row.approvalStatusTechnology]["label"] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="领用状态" align="center" prop="consumeStatus">
        <template slot-scope="scope">
          <span>
            {{ consumeState[parseInt(scope.row.consumeStatus)]["label"] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setApplyBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleApply(scope.row)"
            v-hasPermi="['consume:regulatorcon:add']"
            >申请</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="退回"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setBackBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleBack(scope.row)"
            v-hasPermi="['consume:regulatorap:back']"
            >退回</el-button
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

    <!-- 添加或修改调节剂领用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="编号" prop="regulatorApplyId">
          <el-input v-model="form.regulatorApplyId" disabled />
        </el-form-item>
        <el-form-item label="订单分配号" prop="orderAllocationId">
          <el-input v-model="form.orderAllocationId" disabled />
        </el-form-item>
        <el-form-item label="调节剂类型" prop="regulatorTypeId">
          <el-input v-model="form.regulatorType" disabled />
        </el-form-item>
        <el-form-item label="调节剂名称" prop="regulatorNameId">
          <el-input v-model="form.regulatorName" disabled />
        </el-form-item>
        <el-form-item label="有效含量" prop="content">
          <el-input v-model="form.content" disabled />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" disabled />
        </el-form-item>
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form.orderId" disabled />
        </el-form-item>
        <el-form-item label="领用量" prop="consumeAmount">
          <el-input
            v-model="form.consumeAmount"
            placeholder="领用量需要和申请量保持一致"
            disabled
          />
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
          <el-input v-model="form.userName" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOpera">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  upCumStatus,
  back,
  upAmount,
  addRegulatorcon,
  getUserName,
  listRegulatorap,
  getRegulatorap,
  delRegulatorap,
  addRegulatorap,
  updateRegulatorap,
  exportRegulatorap,
} from "@/api/consume/regulatorap";
import Editor from "@/components/Editor";
import { addFertilizercon } from "@/api/consume/fertilizerap";

export default {
  name: "Regulatorap",
  components: {
    Editor,
  },
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
      //用户列表
      userList: [],
      // 调节剂领用表格数据
      regulatorapList: [],
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
        orderAllocationId: null,
        regulatorTypeId: null,
        regulatorNameId: null,
        regulatorType: null,
        regulatorName: null,
        content: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: null,
      },
      // 表单参数
      form: {},
      approvalOptions: [
        {
          label: "待审核",
          value: 0,
        },
        {
          label: "审核通过",
          value: 1,
        },
        {
          label: "审核不通过",
          value: 2,
        },
      ],
      consumeState: [
        {
          label: "未领用",
          value: "0",
        },
        {
          label: "已领用",
          value: "1",
        },
      ],
      // 表单校验
      rules: {
        orderAllocationId: [
          { required: true, message: "编号不能为空", trigger: "blur" },
        ],
        regulatorTypeId: [
          { required: true, message: "调节剂类型不能为空", trigger: "blur" },
        ],
        regulatorNameId: [
          { required: true, message: "调节剂名称不能为空", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
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
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getUserList();
  },

  watch: {
    "$route.path": function (newVal, oldVal) {
      if (newVal === "/production/consume/consume5/regulatorap") {
        this.getList();
      }
    },
  },

  methods: {
    /** 查询调节剂领用列表 */
    getList() {
      this.loading = true;
      listRegulatorap(this.queryParams).then((response) => {
        this.regulatorapList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    setApplyBtn(row) {
      if (
        row.approvalStatusProduct == 1 &&
        row.approvalStatusTechnology == 1 &&
        row.consumeStatus == "0"
      ) {
        return false;
      } else return true;
    },
    setBackBtn(row) {
      if (row.consumeStatus == "0") {
        return false;
      } else return true;
    },
    // 表单重置
    reset() {
      this.form = {
        regulatorApplyId: null,
        orderAllocationId: null,
        regulatorTypeId: null,
        regulatorNameId: null,
        content: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        userName: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: "0",
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
      this.ids = selection.map((item) => item.regulatorApplyId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 获取用户下拉框列表 */
    getUserList() {
      let list = [];
      getUserName().then((response) => {
        let status = null;
        for (var i = 0; i < response.rows.length; i++) {
          status = response.rows[i].value;
          list.push({ id: response.rows[i].key, name: status });
        }
      });
      this.userList = list;
    },
    getUserSelected(val) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === val) {
          this.form.userId = this.userList[i].id;
          this.form.userName = this.userList[i].name;
        }
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加调节剂领用";
    },
    /** 领用按钮操作 */
    handleApply(row) {
      this.reset();
      const regulatorApplyId = row.regulatorApplyId || this.ids;
      getRegulatorap(regulatorApplyId).then((response) => {
        this.form = response.data;
        this.form.createBy = this.$store.state.user.name;
        this.form.updateBy = this.$store.state.user.name;
        this.form.consumeAmount = response.data.applyAmount;
        this.form.consumeStatus = "1";
        this.open = true;
        this.title = "调节剂领用";
      });
    },
    /** 确定操作 */
    submitOpera() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.regulatorApplyId != null) {
            var code = 200;
            upAmount(this.form)
              .then((response) => {
                this.open = false;
                this.getList();
              })
              .catch((response) => {
                code = 500;
                //    this.msgError("库存不足")
              })
              .then((res) => {
                if (code == 200) {
                  upCumStatus(this.form.regulatorApplyId).then(
                    (response) => {}
                  );
                  addRegulatorcon(this.form).then((response) => {
                    this.msgSuccess("领用成功");
                    this.open = false;
                    this.getList();
                  });
                }
              });
          }
        }
      });
    },
    /** 退回按钮操作 */
    handleBack(row) {
      const regulatorApplyIds = row.regulatorApplyId || this.ids;
      this.$confirm("是否确认退回调节剂领用?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return back(regulatorApplyIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("退回成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const regulatorApplyId = row.regulatorApplyId || this.ids;
      getRegulatorap(regulatorApplyId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改调节剂领用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.regulatorApplyId != null) {
            updateRegulatorap(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRegulatorap(this.form).then((response) => {
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
      const regulatorApplyIds = row.regulatorApplyId || this.ids;
      this.$confirm("是否确认删除调节剂领用?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delRegulatorap(regulatorApplyIds);
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
        for (let i = 0; i < this.regulatorapList.length; i++) {
          queryParams.exportIds.push(this.regulatorapList[i].regulatorApplyId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出调节剂领用数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportRegulatorap(queryParams);
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
