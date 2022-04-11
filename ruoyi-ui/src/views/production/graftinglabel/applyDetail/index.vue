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
            :value="item.orderAllocationId"
            :label="item.orderAllocationId"
            @keyup.enter.native="handleQuery"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="graftinglabelTypeId">
        <el-select
          v-model="queryParams.graftinglabelTypeId"
          placeholder="请选择嫁接签类型"
        >
          <el-option
            v-for="type in graftinglabel_type"
            :key="type.graftinglabelTypeId"
            :value="type.graftinglabelTypeId"
            :label="type.graftinglabelType"
            @keyup.enter.native="handleQuery"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="graftinglabelSpecification">
        <el-input
          v-model="queryParams.graftinglabelSpecification"
          placeholder="请输入规格"
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
      <el-form-item label="申请时间">
        <el-date-picker
          v-model="daterangeApplyTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
      <!--          v-hasPermi="['graftinglabel:apply:add']"-->
      <!--        >新增</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || single"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['graftinglabel:apply:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['graftinglabel:apply:remove']"
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
          v-hasPermi="['graftinglabel:apply:export']"
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
      <el-table-column label="类型" align="center" prop="graftinglabelType" />
      <el-table-column
        label="规格"
        align="center"
        prop="graftinglabelSpecification"
      />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="订单名称"
        align="center"
        prop="ordername"
        width="110"
      />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
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
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusProduct] }}
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
            {{ approvalStatus[scope.row.approvalStatusTechnology] }}
          </span>
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
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['graftinglabel:apply:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['graftinglabel:apply:remove']"
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

    <!-- 添加或修改嫁接签申请领用详细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="订单分配号" prop="orderAllocationId">
          <el-select
            v-model="form.orderAllocationId"
            placeholder="请选择订单分配号"
          >
            <el-option
              v-for="order in order_allocation"
              :key="order.orderAllocationId"
              :value="order.orderAllocationId"
              :label="order.orderAllocationId"
              @click.native="getOrderId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号" prop="orderId">
          <el-select v-model="form.orderId" placeholder="请选择订单编号">
            <el-option
              v-for="order in orderList"
              :key="order.orderId"
              :value="order.orderId"
              :label="order.orderId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="graftinglabelTypeId">
          <el-select
            v-model="form.graftinglabelTypeId"
            placeholder="请选择嫁接签类型"
          >
            <el-option
              v-for="type in graftinglabel_type"
              :key="type.graftinglabelTypeId"
              :value="type.graftinglabelTypeId"
              :label="type.graftinglabelType"
              @click.native="getAmount1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="graftinglabelSpecification">
          <el-select
            v-model="form.graftinglabelSpecification"
            placeholder="请选择规格"
          >
            <el-option
              v-for="(item, index) in graftinglabel_amount"
              :key="index"
              :label="item.graftinglabelSpecification"
              :value="item.graftinglabelSpecification"
              @click.native="getAmount2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="originCompany">
          <el-select v-model="form.originCompany" placeholder="请选择公司">
            <el-option
              v-for="(item, index) in graftinglabel_amount"
              :key="index"
              :label="item.originCompany"
              :value="item.originCompany"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model="form.applyAmount" placeholder="请输入申请量" />
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
        <el-form-item label="申请人" prop="userId">
          <el-select
            v-model="form.userId"
            placeholder="请选择申请人"
            clearable
            size="small"
          >
            <el-option
              v-for="Id in user_ID"
              :key="Id.userId"
              :value="Id.userId"
              :label="Id.userName"
            ></el-option>
          </el-select>
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
} from "@/api/production/graftinglabel/apply";
import { listGraftinglabelType } from "@/api/production/graftinglabel/graftinglabelType";
import { listAllocation } from "@/api/order/allocation";
import { listGraftinglabelAmount } from "@/api/production/graftinglabel/graftinglabelAmount";
import { listUser } from "@/api/system/user";

export default {
  name: "Apply",
  components: {},
  data() {
    return {
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
      //订单表
      orderList: [],
      //库存表
      graftinglabel_amount: [],
      //嫁接签类型
      graftinglabel_type: [],
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
      // 嫁接签申请领用详细表格数据
      applyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 申请时间时间范围
      daterangeApplyTime: [],
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        exportIds: [],
        pageNum: 1,
        pageSize: 10,
        orderAllocationId: null,
        graftinglabelTypeId: null,
        graftinglabelSpecification: null,
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
          { required: true, message: "订单分配号不能为空", trigger: "blur" },
        ],
        graftinglabelTypeId: [
          { required: true, message: "类型不能为空", trigger: "blur" },
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
    Promise.all([this.getUserID(), this.getGraftinglabelTypes()]).then(
      (res) => {
        this.getList();
      }
    );
  },

  methods: {
    //控制审核后上方修改删除按钮
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
    setEditBtn(row) {
      if (
        (row.approvalStatusProduct == "1" ||
          row.approvalStatusTechnology == "1") &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
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
    //格式化嫁接签类型
    formdata_type(data) {
      let graftinglabel_type_map = new Map();
      this.graftinglabel_type.forEach((type) => {
        graftinglabel_type_map.set(
          type.graftinglabelTypeId,
          type.graftinglabelType
        );
      });
      data.forEach((type) => {
        let graftinglabel_type_name = graftinglabel_type_map.get(
          type.graftinglabelTypeId
        );
        type.graftinglabelType = graftinglabel_type_name;
      });
    },
    //查询种类
    getGraftinglabelTypes() {
      return new Promise((resolve, rejected) => {
        listGraftinglabelType().then((response) => {
          this.graftinglabel_type = response.rows;
          resolve();
        });
      });
    },
    //得到所有订单编号
    getListAllocation() {
      listAllocation().then((response) => {
        this.order_allocation = response.rows;
      });
    },
    //得到所有订单编号
    getOrderId() {
      let data = {};
      data.orderAllocationId = this.form.orderAllocationId;
      listApply(data).then((response) => {
        this.orderList = response.rows;
      });
    },
    //获取库存
    getAmount1() {
      var data = {};
      data.graftinglabelTypeId = this.form.graftinglabelTypeId;
      this.form.graftinglabelSpecification = null;
      this.form.originCompany = null;
      listGraftinglabelAmount(data).then((response) => {
        this.graftinglabel_amount = response.rows;
      });
    },
    //获取库存
    getAmount2() {
      var data = {};
      data.graftinglabelTypeId = this.form.graftinglabelTypeId;
      this.form.originCompany = null;
      data.graftinglabelSpecification = this.form.graftinglabelSpecification;
      listGraftinglabelAmount(data).then((response) => {
        this.graftinglabel_amount = response.rows;
      });
    },
    /** 查询嫁接签申请领用详细列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeApplyTime && "" != this.daterangeApplyTime) {
        this.queryParams.params["beginApplyTime"] = this.daterangeApplyTime[0];
        this.queryParams.params["endApplyTime"] = this.daterangeApplyTime[1];
      }
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
        graftinglabelApplyId: null,
        orderAllocationId: null,
        graftinglabelTypeId: null,
        graftinglabelSpecification: null,
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
        menuName3: "嫁接签审核",
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
      this.daterangeApplyTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.graftinglabelApplyId);
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
      this.title = "添加嫁接签申请领用详细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const graftinglabelApplyId = row.graftinglabelApplyId || this.ids;
      getApply(graftinglabelApplyId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改嫁接签申请领用详细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.graftinglabelApplyId != null) {
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
      const graftinglabelApplyIds = row.graftinglabelApplyId || this.ids;
      this.$confirm("是否确认删除该嫁接签申请领用详细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delApply(graftinglabelApplyIds).then((response) => {
            delNews1(that.form2).then((response) => {
              bus.$emit("getTodoNum");
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
          queryParams.exportIds.push(this.applyList[i].graftinglabelApplyId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出嫁接签申请领用详细数据项?", "提示", {
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
