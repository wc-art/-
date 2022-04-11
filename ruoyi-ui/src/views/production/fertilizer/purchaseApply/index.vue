<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
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
      <el-form-item label="订单类型" prop="orderType">
        <el-select
          v-model="queryParams.orderType"
          placeholder="请选择订单类型"
          clearable
          size="small"
        >
          <el-option label="代育加工" value="代育加工" />
          <el-option label="全部委托 " value="全部委托" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择订单状态"
          clearable
          size="small"
        >
          <el-option label="接单" value="接单" />
          <el-option label="实施中 " value="实施中" />
          <el-option label="完成 " value="完成" />
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['system:fertilizerApply:export']"
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
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="客户编号" align="center" prop="customerId" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
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
        label="化肥采购申请"
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
            v-hasPermi="['system:fertilizerApply:add']"
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

    <!-- 添加或修改基质申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="化肥类型" prop="fertilizerTypeId">
          <el-select
            v-model="form.fertilizerTypeId"
            placeholder="请选择化肥类型"
          >
            <el-option
              v-for="type in fertilizer_type"
              :key="type.fertilizerTypeId"
              :value="type.fertilizerTypeId"
              :label="type.fertilizerType"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="化肥名称" prop="fertilizerNameId">
          <el-select
            v-model="form.fertilizerNameId"
            placeholder="请选择化肥名称"
          >
            <el-option
              v-for="name in fertilizer_name"
              :key="name.fertilizerNameId"
              :value="name.fertilizerNameId"
              :label="name.fertilizerName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="NPK含量">
          <el-input
            v-model="form.npkContent"
            type="textarea"
            placeholder="请输入NPK含量"
          />
        </el-form-item>
        <el-form-item label="肥料品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入肥料品牌" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="预计使用时间" prop="planUseTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.planUseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预计使用时间"
          >
          </el-date-picker>
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
  listNews,
  getNews,
  delNews,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
} from "@/api/order/order";
import {
  addFertilizerApply,
  updateFertilizerApply,
} from "@/api/production/fertilizer/purchaseApply";
import { listFertilizerType } from "@/api/production/fertilizer/fertilizerType";
import { listFertilizerName } from "@/api/production/fertilizer/fertilizerName";
import { vegetableType } from "@/api/production/seed/cropType";

export default {
  name: "Order",
  components: {},
  data() {
    return {
      //化肥类型
      fertilizer_type: [],
      //化肥种类
      fertilizer_name: [],
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
        orderIds: [],
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
      form2: {},
      allocationform: {},
      fulfillmentform: {},
      // 表单校验
      rules: {
        fertilizerTypeId: [
          { required: true, message: "化肥类型不能为空", trigger: "change" },
        ],
        fertilizerNameId: [
          { required: true, message: "化肥名称不能为空", trigger: "change" },
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
        planUseTime: [
          { required: true, message: "预计使用时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    Promise.all([
      this.getVegertables(),
      this.getFertilizerTypes(),
      this.getFertilizerNames(),
    ]).then((res) => {
      this.getList();
    });
    this.getDicts("seed_type").then((response) => {
      this.seed_type = response.data;
    });
  },
  beforeMount() {
    this.getList();
  },
  methods: {
    //格式化蔬菜名称
    formdata_vegertable(data) {
      let type_map = new Map();
      this.vegertables_type.forEach((type) => {
        type_map.set(type.cropTypeId, type.cropType);
      });
      data.forEach((type) => {
        let type_name = type_map.get(type.cropTypeId);
        type.cropType = type_name;
      });
    },
    //查询蔬菜类型
    getVegertables() {
      return new Promise((resolve, rejected) => {
        vegetableType().then((response) => {
          this.vegertables_type = response.data;
          resolve();
        });
      });
    },
    //查询化肥类型
    getFertilizerTypes() {
      return new Promise((resolve, rejected) => {
        listFertilizerType().then((response) => {
          this.fertilizer_type = response.rows;
          resolve();
        });
      });
    },
    //查询化肥名称
    getFertilizerNames() {
      return new Promise((resolve, rejected) => {
        listFertilizerName().then((response) => {
          this.fertilizer_name = response.rows;
          resolve();
        });
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
        fertilizerPurchaseApplyId: null,
        fertilizerTypeId: null,
        fertilizerNameId: null,
        npkContent: null,
        brand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
        note: null,
        planUseTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核采购生产资料",
        menuName3: "化肥审核",
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["warehouse_keeper"],
      };
      this.resetForm("form");
      this.resetForm("form2");
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
      this.title = "添加化肥采购申请";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.stromaPurchaseApplyId != null) {
            updateFertilizerApply(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFertilizerApply(this.form).then((response) => {
              addNews(this.form2).then((response) => {
                bus.$emit("getTodoNum");
              });
              this.msgSuccess("申请成功");
              this.open = false;
              this.getList();
              this.$router.push(
                "/production/purchaseApply/fertilizerApplyDetail"
              );
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.orderId || this.ids;
      this.$confirm("是否确认删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
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
      queryParams.orderIds = [];
      if (this.ids.length == 0) {
        for (let i = 0; i < this.orderList.length; i++) {
          queryParams.orderIds.push(this.orderList[i].fertilizerPurchaseApplyId);
        }
      } else if (this.ids.length != 0) {
        queryParams.orderIds = this.ids;
      }
      this.$confirm("是否确认导出订单数据项?", "提示", {
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
