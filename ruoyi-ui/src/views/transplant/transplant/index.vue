<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="订单编号" prop="orderId">
        <el-select
          v-model="queryParams.orderId"
          placeholder="请选择订单编号"
          clearable
          size="small"
        >
          <el-option
            v-for="ID in order_ID"
            :key="ID.orderId"
            :value="ID.orderId"
            :label="ID.orderId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerId">
        <el-select
          v-model="queryParams.customerId"
          placeholder="请选择客户名称"
          clearable
          size="small"
        >
          <el-option
            v-for="Id in customer_ID"
            :key="Id.customerId"
            :value="Id.customerId"
            :label="Id.contactPerson"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提苗人姓名" prop="takeseedlingPerson">
        <el-input
          v-model="queryParams.takeseedlingPerson"
          placeholder="请输入提苗人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提苗人电话" prop="takeseedlingPhone">
        <el-input
          v-model="queryParams.takeseedlingPhone"
          placeholder="请输入提苗人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大棚名称" prop="greenhouseId">
        <el-select
          v-model="queryParams.greenhouseId"
          placeholder="请选择大棚名称"
          clearable
          size="small"
        >
          <el-option
            v-for="ID in greenhouse_ID"
            :key="ID.greenhouseId"
            :value="ID.greenhouseId"
            :label="ID.greenhouseName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出圃时间" prop="outgreenhouseTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.outgreenhouseTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择出圃时间"
        >
        </el-date-picker>
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
          v-hasPermi="['transplant:transplant:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || single"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['transplant:transplant:edit']"
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
          v-hasPermi="['transplant:transplant:remove']"
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
          v-hasPermi="['transplant:transplant:export']"
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
      :data="transplantList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column
        label="订单名称"
        align="center"
        prop="ordername"
        width="110"
      />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="客户编号" align="center" prop="customerId" />
      <el-table-column label="客户名称" align="center" prop="contactPerson" />
      <el-table-column
        label="提苗人姓名"
        align="center"
        prop="takeseedlingPerson"
        width="100"
      />
      <el-table-column
        label="提苗人电话"
        align="center"
        prop="takeseedlingPhone"
        width="130"
      />
      <el-table-column label="大棚名称" align="center" prop="greenhouseName" />
      <el-table-column
        label="出圃时间"
        align="center"
        prop="outgreenhouseTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.outgreenhouseTime, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="数量" align="center" prop="transplantAmount" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="片区主管审核状态"
        align="center"
        prop="approvalStatusManager"
        width="130"
      >
        <template slot-scope="scope"
          ><span>
            {{ approvalStatus[scope.row.approvalStatusManager] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handlethroughpianqu(scope.row)"
              v-hasPermi="['transplant:transplant:permit1']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughpianqu(scope.row)"
              v-hasPermi="['transplant:transplant:permit1']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="销售经理审核状态"
        align="center"
        prop="approvalStatusSale"
        width="130"
      >
        <template slot-scope="scope"
          ><span> {{ approvalStatus[scope.row.approvalStatusSale] }}</span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handlethroughxiaoshou(scope.row)"
              v-hasPermi="['transplant:transplant:permit2']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThroughxiaoshou(scope.row)"
              v-hasPermi="['transplant:transplant:permit2']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['transplant:transplant:edit']"
            >修改</el-button
          >
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['transplant:transplant:remove']"
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

    <!-- 添加或修改出圃管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="订单名称" prop="orderId">
          <el-select
            v-model="form.orderId"
            placeholder="请选择订单名称"
            clearable
            size="small"
            @change="selectCustomer"
          >
            <el-option
              v-for="ID in order_ID"
              :key="ID.orderId"
              :value="ID.orderId"
              :label="ID.orderName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerId" v-if="this.flag == 1">
          {{ this.contactPerson }}
        </el-form-item>

        <el-form-item label="客户名称" prop="customerId" v-if="this.flag == 0">
          <el-select
            v-model="form.customerId"
            placeholder="请选择客户名称"
            clearable
            size="small"
          >
            <el-option
              v-for="Id in customer_ID"
              :key="Id.customerId"
              :value="Id.customerId"
              :label="Id.contactPerson"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提苗人姓名" prop="takeseedlingPerson">
          <el-input
            v-model="form.takeseedlingPerson"
            placeholder="请输入提苗人姓名"
          />
        </el-form-item>
        <el-form-item label="提苗人电话" prop="takeseedlingPhone">
          <el-input
            v-model="form.takeseedlingPhone"
            placeholder="请输入提苗人电话"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="大棚名称" prop="greenhouseId">
          <el-select
            v-model="form.greenhouseId"
            placeholder="请选择大棚名称"
            clearable
            size="small"
          >
            <el-option
              v-for="ID in greenhouseIDs"
              :key="ID.greenhouseId"
              :value="ID.greenhouseId"
              :label="ID.greenhouseName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出圃时间" prop="outgreenhouseTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.outgreenhouseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出圃时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="数量" prop="transplantAmount">
          <el-input v-model="form.transplantAmount" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <!--<el-input v-model="form.totalPrice" placeholder="请输入总价" />-->
          {{ getprice }}
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
  delNews1,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listTransplant,
  getTransplant,
  delTransplant,
  addTransplant,
  updateTransplant,
  exportTransplant,
  listCustomer,
  listOrder,
  listgreenhouse,
} from "@/api/transplant/transplant";
import { getUserId } from "@/api/system/user";
import { getUsergreenhouse } from "@/api/as/usergreenhouse";
export default {
  name: "Transplant",
  components: {},
  data() {
    return {
      flag: 0,
      contactPerson: null,
      userId: null,
      userName: null,
      userRoles: [],
      //审核状态
      approvalStatus: {
        0: "未审核",
        1: "审核通过",
        2: "不通过",
      },
      // 遮罩层
      customer_ID: [],
      order_ID: [],
      greenhouse_ID: [],
      greenhouseIDs: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approvalStatusManagers: [],
      approvalStatusSales: [],
      //存放与用户有关联的greenhouseId
      greenhouseIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 出圃管理表格数据
      transplantList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        transplantIds: [],
        pageNum: 1,
        pageSize: 10,
        orderId: null,
        customerId: null,
        takeseedlingPerson: null,
        takeseedlingPhone: null,
        greenhouseId: null,
        outgreenhouseTime: null,
        orderByColumn: "create_time",
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "change" },
        ],
        customerId: [
          { required: true, message: "客户编号不能为空", trigger: "change" },
        ],
        takeseedlingPerson: [
          { required: true, message: "提苗人姓名不能为空", trigger: "blur" },
        ],
        takeseedlingPhone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
          { required: true, message: "提苗人电话不能为空", trigger: "blur" },
        ],
        greenhouseId: [
          { required: true, message: "大棚编号不能为空", trigger: "change" },
        ],
        outgreenhouseTime: [
          { required: true, message: "出圃时间不能为空", trigger: "blur" },
        ],
        price: [
          { required: true, message: "单价不能为空", trigger: "blur" },
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
        transplantAmount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
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
        approvalStatusManager: [
          {
            required: true,
            message: "片区主管审批状态不能为空",
            trigger: "blur",
          },
        ],
        approvalStatusSale: [
          {
            required: true,
            message: "销售经理审批状态不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    console.log("当前user名称", this.$store.getters.name);
    console.log("当前用户的角色", this.$store.getters.roles);
    this.userRoles = this.$store.getters.roles;
    for (var i = 0; i < this.userRoles.length; i++) {
      //只有是片区主管，棚长，棚员角色的用户才“看自己的”
      if (
        this.userRoles[i] == "area_director" ||
        this.userRoles[i] == "greenhouse_director" ||
        this.userRoles[i] == "greenhouse_employee"
      ) {
        this.userName = this.$store.getters.name;
        this.getUserId();
      }
    }

    // this.getgreenhouseID();
    Promise.all([
      this.getgreenhouseID(),
      this.getcustomerID(),
      this.getorderID(),
    ]).then((res) => {
      this.getList();
    });
  },
  computed: {
    getprice() {
      return (this.form.totalPrice =
        Math.round(
          parseFloat(this.form.price * 100 * this.form.transplantAmount)
        ) / 100);
    },
  },
  methods: {
    // changeDate(){
    // this.transplantList.sort((a, b) => {
    // let aTimeString = a.create_time
    // let bTimeString=b.create_time
    // aTimeString = aTimeString.replace(/-/g, '/')//将其中的“一替换为“/’
    // bTimeString=bTimeString.replace(/-/g,'/')
    // let aTime = new Date(aTimeString).getTime()//转换为距1970年的毫秒
    // let bTime = new Date(bTimeString).getTime()
    // return bTime-aTime//降序排列
    // });
    // },
    //根据片区选大棚
    selectCustomer(value) {
      this.flag = 0;
      (this.contactPerson = null), console.log("value", value);
      if (value != null) {
        this.flag = 1;
      }
      if (value != null) {
        this.form.customerId = null;
        for (let i = 0; i < this.order_ID.length; i++) {
          if (value == this.order_ID[i].orderId) {
            this.form.customerId = this.order_ID[i].customerId;
            console.log("this.form.customerId", this.form.customerId);
          }
        }

        for (let j = 0; j < this.customer_ID.length; j++) {
          if (this.form.customerId == this.customer_ID[j].customerId) {
            this.contactPerson = this.customer_ID[j].contactPerson;
            console.log("this.contactPerson", this.contactPerson);
          }
        }
      }
    },

    setTopBtn() {
      console.log(this.approvalStatusManagers);
      for (var i = 0; i < this.approvalStatusManagers.length; i++) {
        console.log("id1", this.approvalStatusManagers[i]);
        for (var j = 0; j < this.approvalStatusSales.length; j++) {
          console.log("id2", this.approvalStatusSales[j]);
          if (
            (this.approvalStatusManagers[i] != "0" ||
              this.approvalStatusSales[j] != "0" ||
              this.single == true ||
              this.multiple == true) &&
            this.$store.getters.name != "admin"
          ) {
            console.log("true");
            return true;
          } else return false;
        }
      }
    },

    //控制审核后修改删除按钮
    setEditBtn(row) {
      if (
        (row.approvalStatusManager != "0" || row.approvalStatusSale != "0") &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //片区主管审核后，不能再按通过和不通过按钮
    setpassBtn1(row) {
      if (
        row.approvalStatusManager != "0" &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //销售经理审核后，不能再按通过和不通过按钮
    setpassBtn2(row) {
      if (
        row.approvalStatusSale != "0" &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    //根据用户名获取用户id,且根据用户id获取关联的大棚id
    getUserId() {
      getUserId({ userName: this.userName }).then((response) => {
        this.userId = response.data;
        console.log("userId", this.userId);
        //取与用户有关联的大棚id
        getUsergreenhouse(this.userId).then((response) => {
          console.log("大棚信息", response);
          if (response.data.length != 0) {
            this.greenhouseIds.length = 0;
            for (var i = 0; i < response.data.length; i++) {
              console.log(
                "response.data[i].greenhouseId",
                response.data[i].greenhouseId
              );
              this.greenhouseIds.push(response.data[i].greenhouseId);
            }
          }
          console.log("用户大棚关联的大棚id,greenhouseIds", this.greenhouseIds);
          //用这个this.greenhouseIds来匹配符合条件的出圃rows并push
        });
      });
    },

    /**片区主管通过按钮操作*/
    handlethroughpianqu(row) {
      this.reset();
      this.form2.approvalBy = "area_director";
      let that = this;
      that.form2 = this.form2;
      const transplantId = row.transplantId || this.ids;
      let data = {};
      data.transplantId = transplantId;
      data.approvalStatusManager = 1;
      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateTransplant(data).then((response) => {
            console.log("throughform2", that.form2);
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        });
    },
    /**片区不通过按钮操作*/
    handleNotThroughpianqu(row) {
      this.reset();
      this.form2.approvalBy = "area_director";
      let that = this;
      that.form2 = this.form2;
      const transplantId = row.transplantId || this.ids;
      let data = {};
      data.transplantId = transplantId;
      data.approvalStatusManager = 2;
      this.$confirm("是否确认不通过该申请信息？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateTransplant(data).then((response) => {
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        });
    },
    /**销售通过按钮操作*/
    handlethroughxiaoshou(row) {
      this.reset();
      this.form2.approvalBy = "sales_manager";
      let that = this;
      that.form2 = this.form2;
      const transplantId = row.transplantId || this.ids;
      let data = {};
      data.transplantId = transplantId;
      data.approvalStatusSale = 1;
      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateTransplant(data).then((response) => {
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    /**销售不通过按钮操作*/
    handleNotThroughxiaoshou(row) {
      this.reset();
      this.form2.approvalBy = "sales_manager";
      let that = this;
      that.form2 = this.form2;
      const transplantId = row.transplantId || this.ids;
      let data = {};
      data.transplantId = transplantId;
      data.approvalStatusSale = 2;
      this.$confirm("是否确认不通过该申请信息？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateTransplant(data).then((response) => {
            console.log(response);

            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    /**获取订单名称*/
    formdata_sepaseedlingOrderList(data) {
      let sepaseedling_type_map = new Map();
      this.order_ID.forEach((type) => {
        sepaseedling_type_map.set(type.orderId, type.orderName);
      });
      data.forEach((type) => {
        let order_name = sepaseedling_type_map.get(type.orderId);
        console.log(order_name);
        type.orderName = order_name;
        console.log(type.orderName);
      });
    },
    /**获取客户名称*/
    formdata_sepaseedlingUserList(data) {
      let sepaseedling_type_map = new Map();
      this.customer_ID.forEach((type) => {
        sepaseedling_type_map.set(type.customerId, type.contactPerson);
      });
      data.forEach((type) => {
        let user_contactPerson = sepaseedling_type_map.get(type.customerId);
        type.contactPerson = user_contactPerson;
        console.log(type.contactPerson);
      });
    },
    /**获取大棚名称*/
    formdata_sepaseedlingGreenhouseList(data) {
      let sepaseedling_type_map = new Map();
      this.greenhouse_ID.forEach((type) => {
        sepaseedling_type_map.set(type.greenhouseId, type.greenhouseName);
      });
      data.forEach((type) => {
        let user_greenhouseName = sepaseedling_type_map.get(type.greenhouseId);
        type.greenhouseName = user_greenhouseName;
        console.log(type.greenhouseName);
      });
    },
    /** 查询出圃管理列表 */
    getList() {
      this.loading = true;
      listTransplant(this.queryParams).then((response) => {
        console.log("筛选出来的大棚this.greenhouseIds", this.greenhouseIds);
        if (this.greenhouseIds.length != 0) {
          //   console.log("11筛选数据")
          //   this.transplantList=[]
          this.greenhouseIDs = [];
          //   for(var i=0;i<this.greenhouseIds.length;i++){
          //     for(var j=0;j<response.rows.length;j++){
          //       if(this.greenhouseIds[i]==response.rows[j].greenhouseId){
          //         this.transplantList.push(response.rows[j]);
          //       }
          //     }
          //     this.total = response.total;
          //     //对大棚选项进行筛选
          //    for (var k = 0; k < this.greenhouse_ID.length; k++) {
          //      if (this.greenhouseIds[i] == this.greenhouse_ID[k].greenhouseId) {
          //      this.greenhouseIDs.push(this.greenhouse_ID[k]);
          //      }
          //    }
          //   }
          let ids = this.greenhouse_ID.map((item) => item.greenhouseId);
          let idsFLag = [];
          for (let i = 0; i < response.rows.length; i++) {
            const index = ids.indexOf(response.rows[i].greenhouseId);
            if (index && idsFLag.indexOf(index) === -1) {
              idsFLag.push(index);
              this.greenhouseIDs.push(this.greenhouse_ID[index]);
            }
          }
        } else {
          this.greenhouseIDs = this.greenhouse_ID;
        }
        console.log("22全部数据");
        this.transplantList = response.rows;
        this.total = response.total;
        console.log("this.transplantList", this.transplantList);
        console.log("this.greenhouseIDs", this.greenhouseIDs);
        // this.total = response.total;
        this.formdata_sepaseedlingOrderList(this.transplantList);
        this.formdata_sepaseedlingUserList(this.transplantList);
        this.formdata_sepaseedlingGreenhouseList(this.transplantList);
        this.loading = false;
      });
    },
    getcustomerID() {
      return new Promise((resolve, rejected) => {
        listCustomer().then((response) => {
          console.log(response);
          this.customer_ID = response.rows;
          resolve();
        });
      });
    },
    getorderID() {
      return new Promise((resolve, rejected) => {
        listOrder().then((response) => {
          console.log(response);
          this.order_ID = response.rows;
          resolve();
        });
      });
    },
    getgreenhouseID() {
      return new Promise((resolve, rejected) => {
        this.greenhouse_ID = [];
        listgreenhouse().then((response) => {
          console.log(response);
          this.greenhouse_ID = response.rows;
          console.log("this.greenhouse_ID", this.greenhouse_ID);
          resolve();
        });
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.flag = 0;
      (this.contactPerson = null),
        (this.form = {
          transplantId: null,
          orderId: null,
          customerId: null,
          takeseedlingPerson: null,
          takeseedlingPhone: null,
          greenhouseId: null,
          outgreenhouseTime: null,
          price: null,
          transplantAmount: null,
          totalPrice: null,
          note: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          approvalStatusManager: null,
          approvalStatusSale: null,
        });
      this.form2 = {
        newsId: null,
        menuName1: "出圃管理",
        menuName2: "出圃管理",
        menuName3: null,
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["area_director", "sales_manager"],
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
      this.ids = selection.map((item) => item.transplantId);
      this.approvalStatusManagers = selection.map(
        (item) => item.approvalStatusManager
      );
      this.approvalStatusSales = selection.map(
        (item) => item.approvalStatusSale
      );
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      // console.log('kaishi')
      // bus.$emit('getTodoNum')
      this.reset();
      this.open = true;
      this.title = "添加出圃管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      console.log("11row.transplantId");
      const transplantId = row.transplantId || this.ids;
      console.log("11transplantId", transplantId);
      getTransplant(transplantId).then((response) => {
        this.form = response.data;
        console.log("2222response.data", response);
        console.log("33this.form", this.form);
        this.open = true;
        this.title = "修改出圃管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.transplantId != null) {
            this.form.totalPrice = this.getprice;
            updateTransplant(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.totalPrice = this.getprice;
            console.log("this.form", this.form);
            console.log("this.form2", this.form2);
            addTransplant(this.form).then((response) => {
              addNews(this.form2).then((response) => {
                // this.msgSuccess("新增成功");
                // this.open = false;
                // this.getList();
                bus.$emit("getTodoNum");
              });

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
      console.log("11that.form2", that.form2);
      const transplantIds = row.transplantId || this.ids;
      this.$confirm("是否确认删除该出圃管理信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delTransplant(transplantIds).then((response) => {
            console.log("that.form2", that.form2);
            delNews1(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      queryParams.transplantIds = [];
      if (this.ids.length == 0) {
        for (let i = 0; i < this.transplantList.length; i++) {
          queryParams.transplantIds.push(this.transplantList[i].transplantId);
        }
      } else if (this.ids.length != 0) {
        queryParams.transplantIds = this.ids;
      }
      this.$confirm("是否确认导出出圃管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportTransplant(queryParams);
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

<style>
.el-dialog__header {
  background-color: mediumseagreen;
}
.el-dialog__title {
  color: white;
}

/*.el-dialog{*/
/*  background:#b3e5fc;*/
/*}*/
</style>
