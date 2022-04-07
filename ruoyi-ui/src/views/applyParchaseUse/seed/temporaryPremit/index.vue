<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="70px"
    >
      <el-form-item label="订单分配表" prop="orderAllocationId" label-width="85px">
        <el-select
          v-model="queryParams.orderAllocationId"
          placeholder="请选择类型"
          clearable
          size="small"
        >
          <el-option
            v-for="order in order_allocation"
            :key="order"
            :value="order"
            :label="order"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产厂长审批状态" prop="approvalStatusProduct" label-width="130px">
        <el-input
          v-model="queryParams.approvalStatusProduct"
          placeholder="请输入生产厂长审批状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="技术厂长审批状态" prop="approvalStatusTechnology" label-width="130px">
        <el-input
          v-model="queryParams.approvalStatusTechnology"
          placeholder="请输入技术厂长审批状态"
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
      <el-form-item label="蔬菜类型" prop="cropTypeId">
        <el-select
          v-model="queryParams.cropTypeId"
          placeholder="请选择类型"
          clearable
          size="small"
        >
          <el-option
            v-for="type in vegertables_type"
            :key="type.cropTypeId"
            :value="type.cropTypeId"
            :label="type.cropType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="种子类型" prop="seedType">
        <el-select
          v-model="queryParams.seedType"
          placeholder="请选择种子类型"
          clearable
          size="small"
        >
          <el-option
            v-for="type in seed_type"
            :key="type.dictValue"
            :label="type.dictLabel"
            :value="type.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="品种名称" prop="varietyName">
        <el-input
          v-model="queryParams.varietyName"
          placeholder="请输入品种名称"
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
      <el-form-item label="订单编号" prop="orderId" width="110">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请人" prop="userId">
        <el-input
          v-model="queryParams.userId"
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
          <el-option label="请选择字典生成" value="" />
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:apply:add']"
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
          v-hasPermi="['system:apply:edit']"
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
          v-hasPermi="['system:apply:remove']"
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
          v-hasPermi="['system:apply:export']"
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
      :data="applyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <!-- <el-table-column label="主码" align="center" prop="seedApplyId" /> -->
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="种子类型" align="center" prop="seedType" />
      <el-table-column label="品种名称" align="center" prop="varietyName" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
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
      <el-table-column label="申请人" align="center" prop="userId" />
      <el-table-column
        label="生产厂长审批状态"
        align="center"
        prop="approvalStatusProduct"
        width="130"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusProduct] }}
          </span>
          <div style="display: flex">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleThroughProduct(scope.row)"
              v-hasPermi="['system:product:permit']"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughProduct(scope.row)"
              v-hasPermi="['system:product:permit']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="技术厂长审批状态"
        align="center"
        prop="approvalStatusTechnology"
        width="130"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusTechnology] }}
          </span>
          <div style="display: flex">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleThroughTechno(scope.row)"
              v-hasPermi="['seed:temporary:edit']"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughTechno(scope.row)"
              v-hasPermi="['seed:temporary:edit']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="领用状态" align="center" prop="consumeStatus">
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.consumeStatus] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="130"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:apply:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:apply:remove']"
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

    <!-- 添加或修改种子申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单分配表编号" prop="orderAllocationId">
          <el-select
            v-model="form.orderAllocationId"
            placeholder="请选择类型"
            clearable
            size="small"
          >
            <el-option
              v-for="order in order_allocation"
              :key="order"
              :value="order"
              :label="order"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蔬菜类型" prop="cropTypeId">
          <el-select
            v-model="form.cropTypeId"
            placeholder="请选择类型"
            clearable
            size="small"
          >
            <el-option
              v-for="type in vegertables_type"
              :key="type.cropTypeId"
              :value="type.cropTypeId"
              :label="type.cropType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种子类型" prop="seedType">
          <el-select v-model="form.seedType" placeholder="请选择种子类型">
            <el-option
              v-for="type in seed_type"
              :key="type.dictValue"
              :label="type.dictLabel"
              :value="type.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品种名称" prop="varietyName">
          <el-input v-model="form.varietyName" placeholder="请输入品种名称" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model.number="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间"
          >
          </el-date-picker>
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
  listTemporary,
  getTemporary,
  delTemporary,
  addTemporary,
  updateTemporary,
  exportTemporary,
} from "@/api/applyParchaseUse/seed/temporary";
import { vegetableType } from "@/api/applyParchaseUse/seed/type";
import { getListAllocation } from "@/api/order/allocation";

export default {
  name: "Apply",
  components: {},
  data() {
    return {
      //申请状态转换
      approvalStatus: {
        0: "审核中",
        1: "审核通过",
        2: "审核不通过",
      },

      //订单分配表编号
      order_allocation: [],
      //蔬菜类型
      vegertables_type: [],
      //种子类型
      seed_type: [],
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
      // 种子申请表格数据
      applyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        orderAllocationId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
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
      // 表单校验
      rules: {
        orderAllocationId: [
          {
            required: true,
            message: "外码来自order_allocation订单分配表不能为空",
            trigger: "blur",
          },
        ],
        cropTypeId: [
          { required: true, message: "外码不能为空", trigger: "blur" },
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" },
        ],
        orderId: [{ required: true, message: "外码不能为空", trigger: "blur" }],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          {type:'number',message:'申请量必须为数字'}
        ],
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "申请人，外码不能为空", trigger: "blur" },
        ],
        approvalStatusProduct: [
          {
            required: true,
            message:
              "生产厂长审批状态:0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
        approvalStatusTechnology: [
          {
            required: true,
            message:
              "技术厂长审批状态:0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
        consumeStatus: [
          {
            required: true,
            message: "领用状态：未领用 | 已领用不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getVegertables();
    this.getListAllocation();
    this.getList();
    this.getDicts("seed_type").then((response) => {
      this.seed_type = response.data;
    });
  },
  methods: {
    //生产厂长审核通过
    handleThroughProduct(row) {
      this.reset();
      console.log(row);
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      let data = {};
      data.seedApplyTemporaryId = seedApplyTemporaryId;
      data.approvalStatusProduct = 1;
      updateTemporary(data).then((response) => {
        console.log(response);
        this.getList();
      });
    },
    //生产厂长审核不通过
    handleNotThroughProduct(row) {
      this.reset();
      console.log(row);
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      let data = {};
      data.seedApplyTemporaryId = seedApplyTemporaryId;
      data.approvalStatusProduct = 2;
      updateTemporary(data).then((response) => {
        console.log(response);
        this.getList();
      });
    },
    //技术厂长审核通过
    handleThroughTechno(row) {
      this.reset();
      console.log(row);
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      let data = {};
      data.seedApplyTemporaryId = seedApplyTemporaryId;
      data.approvalStatusTechnology = 1;
      updateTemporary(data).then((response) => {
        console.log(response);
        this.getList();
      });
    },
    //技术厂长不审核通过
    handleNotThroughTechno(row) {
      this.reset();
      console.log(row);
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      let data = {};
      data.seedApplyTemporaryId = seedApplyTemporaryId;
      data.approvalStatusTechnology = 2;
      updateTemporary(data).then((response) => {
        console.log(response);
        this.getList();
      });
    },
    //得到所有订单编号
    getListAllocation() {
      getListAllocation().then((response) => {
        this.order_allocation = response.rows;
        console.log(this.order_allocation);
      });
    },
    //格式化蔬菜名称
    formdata_vegertable(data) {
      let vegert_type_map = new Map();
      this.vegertables_type.forEach((type) => {
        vegert_type_map.set(type.cropTypeId, type.cropType);
      });
      data.forEach((type) => {
        let vegert_name = vegert_type_map.get(type.cropTypeId);
        type.cropType = vegert_name;
      });
    },
    //查询蔬菜类型
    getVegertables() {
      vegetableType().then((response) => {
        this.vegertables_type = response.data;
      });
    },
    /** 查询种子申请列表 */
    getList() {
      this.loading = true;
      listTemporary(this.queryParams).then((response) => {
        this.applyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_vegertable(this.applyList);
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
        seedApplyId: null,
        orderAllocationId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: 0,
        approvalStatusTechnology: 0,
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
      this.ids = selection.map((item) => item.seedApplyTemporaryId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加种子申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log("daww");
      this.reset();
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      getTemporary(seedApplyTemporaryId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改种子临时申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.seedApplyId != null) {
            updateTemporary(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemporary(this.form).then((response) => {
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
      const seedApplyIds = row.seedApplyId || this.ids;
      this.$confirm(
        '是否确认删除种子申请编号为"' + seedApplyIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return getTemporary(seedApplyIds);
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
      this.$confirm("是否确认导出所有种子申请数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportTemporary(queryParams);
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
