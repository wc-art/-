<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item
        label="订单分配号"
        prop="orderAllocationId"
        label-width="85px"
      >
        <el-select
          v-model="queryParams.orderAllocationId"
          placeholder="请选择订单分配号"
          clearable
          size="small"
        >
          <el-option
            v-for="(item, index) in order_allocation"
            :key="item"
            :value="item"
            :label="item"
            @keyup.enter.native="handleQuery"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="穴盘类型" prop="plugTypeId">
        <el-select
          v-model="queryParams.plugTypeId"
          placeholder="请选择穴盘类型"
        >
          <el-option
            v-for="type in plug_type"
            :key="type.plugTypeId"
            :value="type.plugTypeId"
            :label="type.plugType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="originPlace">
        <el-select v-model="queryParams.originPlace" placeholder="请选择产地">
          <el-option label="国产" value="国产" />
          <el-option label="进口 " value="进口" />
        </el-select>
      </el-form-item>
      <el-form-item label="穴盘品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入穴盘品牌"
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
      <el-form-item label="申请人" prop="userId">
        <el-select
          v-model="queryParams.userId"
          placeholder="请选择申请人"
          clearable
          size="small"
        >
          <el-option
            v-for="ID in user_ID"
            :key="ID.userId"
            :value="ID.userId"
            :label="ID.userName"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="生产厂长审批状态" prop="approvalStatusProduct">-->
      <!--        <el-select v-model="queryParams.approvalStatusProduct" placeholder="请选择生产厂长审批状态" clearable size="small">-->
      <!--          <el-option label="未审核" value="0" />-->
      <!--          <el-option label="审核通过" value="1" />-->
      <!--          <el-option label="不通过" value="2" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="技术厂长审批状态" prop="approvalStatusTechnology">-->
      <!--        <el-select v-model="queryParams.approvalStatusTechnology" placeholder="请选择技术厂长审批状态" clearable size="small">-->
      <!--          <el-option label="未审核" value="0" />-->
      <!--          <el-option label="审核通过" value="1" />-->
      <!--          <el-option label="不通过" value="2" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
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
      <!--          v-hasPermi="['plug:apply:add']"-->
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
      <!--          v-hasPermi="['plug:apply:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['plug:apply:remove']"
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
          v-hasPermi="['plug:apply:export']"
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
      <el-table-column
        label="订单分配号"
        align="center"
        prop="orderAllocationId"
        width="90px"
      />
      <el-table-column label="穴盘类型" align="center" prop="plugType" />
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column label="穴盘品牌" align="center" prop="brand" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="订单名称"
        align="center"
        prop="ordername"
        width="110"
      />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column label="库存量" align="center" prop="plugTypeId">
        <template slot-scope="scope">
          <span>{{
            (plugAmountList.filter(
              (item) =>
                item.plugTypeId == scope.row.plugTypeId &&
                item.originPlace == scope.row.originPlace &&
                item.brand == scope.row.brand &&
                item.originCompany == scope.row.originCompany
            )[0] || {})["storageAmount"] || 0
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        prop="applyTime"
        width="100px"
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
        width="130"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusProduct] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleThroughProduct(scope.row)"
              v-hasPermi="['plug:apply:permit1']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughProduct(scope.row)"
              v-hasPermi="['plug:apply:permit1']"
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
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleThroughTechno(scope.row)"
              v-hasPermi="['plug:apply:permit2']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughTechno(scope.row)"
              v-hasPermi="['plug:apply:permit2']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="领用状态" align="center" prop="consumeStatus">
        <template slot-scope="scope">
          <span>
            {{ consumeStatusList[scope.row.consumeStatus] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['plug:apply:edit']"-->
          <!--          >修改</el-button>-->
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['plug:apply:remove']"
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

    <!-- 添加或修改穴盘申请对话框 -->
    <!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
    <!--      <el-form ref="form" :model="form" :rules="rules" label-width="100px">-->
    <!--        <el-form-item label="订单分配号" prop="orderAllocationId" >-->
    <!--          <el-select v-model="form.orderAllocationId" placeholder="请选择订单分配号" >-->
    <!--            <el-option-->
    <!--              v-for="order in order_allocation"-->
    <!--              :key="order.orderAllocationId"-->
    <!--              :value="order.orderAllocationId"-->
    <!--              :label="order.orderAllocationId"-->
    <!--              @click.native="getOrderId"-->
    <!--            ></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="类型" prop="plugTypeId">-->
    <!--          <el-select v-model="form.plugTypeId" placeholder="请选择穴盘类型">-->
    <!--            <el-option-->
    <!--              v-for="type in plug_type"-->
    <!--              :key="type.plugTypeId"-->
    <!--              :value="type.plugTypeId"-->
    <!--              :label="type.plugType"-->
    <!--            ></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="产地" prop="originPlace">-->
    <!--          <el-select v-model="form.originPlace" placeholder="请选择产地">-->
    <!--            <el-option label="国产" value="国产"/>-->
    <!--            <el-option label="进口" value="进口"/>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="品牌" prop="brand">-->
    <!--          <el-input v-model="form.brand" placeholder="请输入穴盘品牌" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="公司" prop="originCompany">-->
    <!--          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="订单编号" prop="orderId">-->
    <!--          <el-select v-model="form.orderId" placeholder="请选择订单编号" >-->
    <!--            <el-option-->
    <!--              v-for="order in orderList"-->
    <!--              :key="order.orderId"-->
    <!--              :value="order.orderId"-->
    <!--              :label="order.orderId"-->
    <!--            ></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="申请量" prop="applyAmount">-->
    <!--          <el-input v-model.number="form.applyAmount" placeholder="请输入申请量" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="申请时间" prop="applyTime">-->
    <!--          <el-date-picker clearable size="small"-->
    <!--            v-model="form.applyTime"-->
    <!--            type="date"-->
    <!--            value-format="yyyy-MM-dd"-->
    <!--            placeholder="选择申请时间">-->
    <!--          </el-date-picker>-->
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
import {
  listNews,
  getNews,
  delNews,
  delNews1,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listApply,
  getApply,
  delApply,
  addApply,
  updateApply,
  exportApply,
} from "@/api/production/plug/apply";
import { listPlugType } from "@/api/production/plug/plugType";
import { listPlugAmount } from "@/api/production/plug/plugAmount";
import { getListAllocation } from "@/api/order/allocation";
import { listUser } from "@/api/system/user";

export default {
  name: "Apply",
  components: {},
  data() {
    return {
      plugAmountList: [],
      user_ID: [],
      //审核状态转换
      approvalStatus: {
        0: "未审核",
        1: "审核通过",
        2: "不通过",
      },
      consumeStatusList: {
        0: "未领用",
        1: "已领用",
      },
      //订单分配号
      order_allocation: [],
      //穴盘类型
      plug_type: [],
      //穴盘名称
      plug_name: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approvalStatusProducts: [],
      approvalStatusTechnologys: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 穴盘申请表格数据
      applyList: [],
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
        plugTypeId: null,
        originPlace: null,
        brand: null,
        originCompany: null,
        orderId: null,
        applyTime: null,
        userId: null,
        consumeStatus: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        orderAllocationId: [
          { required: true, message: "编号不能为空", trigger: "blur" },
        ],
        plugTypeId: [
          { required: true, message: "穴盘类型不能为空", trigger: "blur" },
        ],
        plugNameId: [
          { required: true, message: "穴盘名称不能为空", trigger: "blur" },
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
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
        approvalStatusProduct: [
          {
            required: true,
            message: "生产厂长审批状态不能为空",
            trigger: "blur",
          },
        ],
        approvalStatusTechnology: [
          {
            required: true,
            message: "技术厂长审批状态不能为空",
            trigger: "blur",
          },
        ],
        consumeStatus: [
          { required: true, message: "领用状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getListAllocation();
    Promise.all([
      this.getUserID(),
      this.getPlugTypes(),
      this.getplugAmountList(),
    ]).then((res) => {
      this.getList();
    });
  },

  methods: {
    //查询穴盘库存量
    getplugAmountList() {
      return new Promise((resolve, rejected) => {
        listPlugAmount(this.queryParams).then((response) => {
          this.plugAmountList = response.rows;
          console.log(this.plugAmountList);
          resolve();
        });
      });
    },
    //控制审核后上面修改删除按钮
    setTopBtn() {
      for (var i = 0; i < this.approvalStatusProducts.length; i++) {
        for (var j = 0; j < this.approvalStatusTechnologys.length; j++) {
          if (
            (this.approvalStatusProducts[i] != "0" ||
              this.approvalStatusTechnologys[j] != "0" ||
              this.single == true ||
              this.multiple == true) &&
            this.$store.getters.name != "admin"
          ) {
            return true;
          } else return false;
        }
      }
    },
    //控制审核后修改删除按钮
    setEditBtn(row) {
      if (
        (row.approvalStatusProduct != "0" ||
          row.approvalStatusTechnology != "0") &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //生产厂长审核后，不能再按通过和不通过按钮
    setpassBtn1(row) {
      if (
        row.approvalStatusProduct != "0" &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //技术厂长审核后，不能再按通过和不通过按钮
    setpassBtn2(row) {
      if (
        row.approvalStatusTechnology != "0" &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //生产厂长审核通过
    handleThroughProduct(row) {
      this.reset();
      this.form2.approvalBy = "production_director";
      let that = this;
      that.form2 = this.form2;
      const plugApplyId = row.plugApplyId || this.ids;
      let data = {};
      data.plugApplyId = plugApplyId;
      data.approvalStatusProduct = 1;
      this.$confirm("是否确认通过该穴盘审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateApply(data).then((response) => {
            delNews(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    //生产厂长审核不通过
    handleNotThroughProduct(row) {
      this.reset();
      this.form2.approvalBy = "production_director";
      let that = this;
      that.form2 = this.form2;
      const plugApplyId = row.plugApplyId || this.ids;
      let data = {};
      data.plugApplyId = plugApplyId;
      data.approvalStatusProduct = 2;
      this.$confirm("是否确认不通过该条穴盘审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateApply(data).then((response) => {
            delNews(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    //技术厂长审核通过
    handleThroughTechno(row) {
      this.reset();
      this.form2.approvalBy = "technical_director";
      let that = this;
      that.form2 = this.form2;
      const plugApplyId = row.plugApplyId || this.ids;
      let data = {};
      data.plugApplyId = plugApplyId;
      data.approvalStatusTechnology = 1;
      this.$confirm("是否确认通过该穴盘审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateApply(data).then((response) => {
            delNews(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    //技术厂长不审核通过
    handleNotThroughTechno(row) {
      this.reset();
      this.form2.approvalBy = "technical_director";
      let that = this;
      that.form2 = this.form2;
      const plugApplyId = row.plugApplyId || this.ids;
      let data = {};
      data.plugApplyId = plugApplyId;
      data.approvalStatusTechnology = 2;
      this.$confirm("是否确认不通过该条穴盘审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateApply(data).then((response) => {
            delNews(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    //得到所有订单编号
    getListAllocation() {
      getListAllocation().then((response) => {
        this.order_allocation = response.rows;
      });
    },
    //格式化穴盘类型
    formdata_type(data) {
      let plug_type_map = new Map();
      this.plug_type.forEach((type) => {
        plug_type_map.set(type.plugTypeId, type.plugType);
      });
      data.forEach((type) => {
        let plug_type_name = plug_type_map.get(type.plugTypeId);
        type.plugType = plug_type_name;
      });
    },
    /**获取用户名称*/
    formdata_userList(data) {
      let type_map = new Map();
      this.user_ID.forEach((type) => {
        type_map.set(type.userId, type.userName);
      });
      data.forEach((type) => {
        let user_name = type_map.get(type.userId);
        type.userName = user_name;
      });
    },
    getUserID() {
      return new Promise((resolve, rejected) => {
        listUser().then((response) => {
          this.user_ID = response.rows;
          resolve();
        });
      });
    },
    getPlugTypes() {
      return new Promise((resolve, rejected) => {
        listPlugType().then((response) => {
          this.plug_type = response.rows;
          resolve();
        });
      });
    },
    /** 查询穴盘申请列表 */
    getList() {
      this.loading = true;
      listApply(this.queryParams).then((response) => {
        this.applyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_type(this.applyList);
        this.formdata_userList(this.applyList);
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
        plugApplyId: null,
        orderAllocationId: null,
        plugTypeId: null,
        originPlace: null,
        brand: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核领用生产资料",
        menuName3: "穴盘审核",
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["production_director", "technical_director"],
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
      this.ids = selection.map((item) => item.plugApplyId);
      this.approvalStatusProducts = selection.map(
        (item) => item.approvalStatusProduct
      );
      this.approvalStatusTechnologys = selection.map(
        (item) => item.approvalStatusTechnology
      );
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加穴盘申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const plugApplyId = row.plugApplyId || this.ids;
      getApply(plugApplyId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改穴盘申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.plugApplyId != null) {
            updateApply(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApply(this.form).then((response) => {
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
      this.reset();
      let that = this;
      that.form2 = this.form2;
      const plugApplyIds = row.plugApplyId || this.ids;
      this.$confirm("是否确认删除该穴盘申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delApply(plugApplyIds).then((response) => {
            delNews1(that.form2).then((response) => {
              bus.$emit("getTodoNum");
              console.log("form2", that.form2);
            });
          });
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
        for (let i = 0; i < this.applyList.length; i++) {
          queryParams.exportIds.push(this.applyList[i].plugApplyIds);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有穴盘申请数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportApply(queryParams);
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
