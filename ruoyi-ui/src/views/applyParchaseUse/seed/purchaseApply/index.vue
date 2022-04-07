<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单名称" prop="orderName">
        <el-input
          v-model="queryParams.orderName"
          placeholder="请输入订单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户编号" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          placeholder="请输入客户编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蔬菜类型编号" prop="cropTypeId">
        <el-input
          v-model="queryParams.cropTypeId"
          placeholder="请输入蔬菜类型编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="seedlingType">
        <el-select v-model="queryParams.seedlingType" placeholder="请选择苗类型嫁接苗 | 实生苗" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="砧木品种 实生苗不需要填写砧木" prop="stockBreed">
        <el-input
          v-model="queryParams.stockBreed"
          placeholder="请输入砧木品种 实生苗不需要填写砧木"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接穗品种" prop="scionBreed">
        <el-input
          v-model="queryParams.scionBreed"
          placeholder="请输入接穗品种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接单日期" prop="receiveorderDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.receiveorderDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择接单日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计出圃日期" prop="deliveryDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.deliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择预计出圃日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单数量" prop="orderAmount">
        <el-input
          v-model="queryParams.orderAmount"
          placeholder="请输入订单数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同单价" prop="contractPrice">
        <el-input
          v-model="queryParams.contractPrice"
          placeholder="请输入合同单价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型 代育加工 | 全部委托" prop="orderType">
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型 代育加工 | 全部委托" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态 接单 | 实施中 | 完成" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态 接单 | 实施中 | 完成" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-table
      v-loading="loading"
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="订单名称"
        align="center"
        prop="ordername"
        width="110"
      />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="客户编号" align="center" prop="customerId" />
      <el-table-column label="蔬菜类型" align="center" prop="cropTypeId" />
      <el-table-column label="苗类型" align="center" prop="seedlingType" />
      <el-table-column label="砧木品种" align="center" prop="stockBreed" />
      <el-table-column label="接穗品种" align="center" prop="scionBreed" />
      <el-table-column
        label="接单日期"
        align="center"
        prop="receiveorderDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.receiveorderDate, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预计出圃日期"
        align="center"
        prop="deliveryDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center" prop="orderAmount" />
      <el-table-column label="合同单价" align="center" prop="contractPrice" />
      <el-table-column label="订单要求" align="center" prop="requirement" />
      <el-table-column label="订单类型" align="center" prop="orderType" />
      <el-table-column label="订单状态" align="center" prop="status" />
      <el-table-column
        label="种子采购申请"
        align="center"
        class-name="small-padding fixed-width"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleAdd"
            v-hasPermi="['seed:apply:add']"
            width="100"
            >申请</el-button
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
          <el-input
            v-model.number="form.applyAmount"
            placeholder="请输入申请量"
          />
        </el-form-item>
        <el-form-item label="单位" prop="applyUnit">
          <el-input v-model="form.applyUnit" placeholder="请输入单位" />
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
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
} from "@/api/system/order";
import {
  listApply,
  getApply,
  delApply,
  addApply,
  updateApply,
  exportApply,
} from "@/api/applyParchaseUse/seed/purchaseApply";
import { vegetableType } from "@/api/applyParchaseUse/seed/type";

export default {
  name: "Order",
  components: {},
  data() {
    return {
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
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示订单分配弹出
      openAllocation: false,
      // 是否显示订单实施弹出
      openFulfillment: false,
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        pageNum: 1,
        pageSize: 10,
        orderName: null,
        customerId: null,
        cropTypeId: null,
        seedlingType: null,
        stockBreed: null,
        scionBreed: null,
        receiveorderDate: null,
        deliveryDate: null,
        orderAmount: null,
        contractPrice: null,
        requirement: null,
        orderType: null,
        status: null,
        note: null,
      },
      // 表单参数
      form: {},
      allocationform: {},
      fulfillmentform: {},
      // 表单校验
      rules: {
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" },
        ],
        seedType: [
          {
            required: true,
            message: "种子类型：接穗| 砧木不能为空",
            trigger: "change",
          },
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" },
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          { type: "number", message: "申请量必须为数字" },
        ],
        applyUnit: [
          { required: true, message: "单位不能为空", trigger: "blur" },
        ],
        approvalStatus: [
          {
            required: true,
            message: "审批状态:0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
        createBy: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        updateBy: [
          { required: true, message: "更新者不能为空", trigger: "blur" },
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getVegertables();
    this.getList();
    this.getDicts("seed_type").then((response) => {
      this.seed_type = response.data;
    });
  },
  methods: {
    //格式化蔬菜名称
    formdata_vegertable(data) {
      console.log("data", data);
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
        console.log("1111", this.vegertables_type);
      });
    },
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows;
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
        seedPurchaseApplyId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
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
      this.ids = selection.map((item) => item.orderId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加种子申请";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.seedApplyId != null) {
            updateApply(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApply(this.form).then((response) => {
              console.log(response);
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.$router.push("/production/purchaseApply/seed");
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.orderId || this.ids;
      this.$confirm(
        '是否确认删除订单编号为"' + orderIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delOrder(orderIds);
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
      this.$confirm("是否确认导出所有订单数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportOrder(queryParams);
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
