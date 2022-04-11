<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
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
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['seed:temporary:add']"
          >申请</el-button
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
          v-hasPermi="['seed:temporary:edit']"
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
          v-hasPermi="['seed:temporary:remove']"
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
          v-hasPermi="['seed:temporary:export']"
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
      <el-table-column label="申请人" align="center" prop="userName" />
      <el-table-column
        label="生产厂长审批"
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
        label="技术厂长审批"
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
            v-hasPermi="['seed:temporary:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['seed:temporary:remove']"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
              @click.native="getAmount1"
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
              @click.native="getAmount2"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品种名称" prop="varietyName">
          <el-select v-model="form.varietyName" placeholder="请选择品种名称">
            <el-option
              v-for="(item, index) in seed_amount"
              :key="index"
              :label="item.varietyName"
              :value="item.varietyName"
              @click.native="getAmount3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="originCompany">
          <el-select v-model="form.originCompany" placeholder="请选择公司">
            <el-option
              v-for="item in seed_amount"
              :key="item.originCompany"
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
        <el-form-item label="申请人" prop="userId" v-if="xg == 1">
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
  listTemporary,
  getTemporary,
  delTemporary,
  addTemporary,
  updateTemporary,
  exportTemporary,
} from "@/api/production/seed/temporary";
import { vegetableType } from "@/api/production/seed/cropType";
import { listUser } from "@/api/system/user";
import { listSeedAmount } from "@/api/production/seed/seedAmount";

export default {
  name: "temporary",
  components: {},
  data() {
    return {
      xg: 0,
      //存储当前用户的名称和角色
      userName: null,
      userRoles: [],
      user_ID: [],
      //库存表
      seed_amount: [],
      //申请状态转换
      approvalStatus: {
        0: "审核中",
        1: "审核通过",
        2: "审核不通过",
      },
      consumeStatusList: {
        0: "未领用",
        1: "已领用",
      },
      //订单分配号
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
      // 种子申请表格数据
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
      form2: {},
      // 表单校验
      rules: {
        cropTypeId: [
          { required: true, message: "外码不能为空", trigger: "blur" },
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" },
        ],
        orderId: [{ required: true, message: "外码不能为空", trigger: "blur" }],
        applyAmount: [
          { required: true, message: "申请量必须为空", trigger: "blur" },
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
    this.userName = this.$store.getters.name;
    this.userRoles = this.$store.getters.roles;
    Promise.all([this.getVegertables(), this.getUserID()]).then((res) => {
      this.getList();
    });
    this.getDicts("seed_type").then((response) => {
      this.seed_type = response.data;
    });
  },
  methods: {
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
    getUserID() {
      return new Promise((resolve, rejected) => {
        listUser().then((response) => {
          this.user_ID = response.rows;
          resolve();
        });
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
      return new Promise((resolve, rejected) => {
        vegetableType().then((response) => {
          this.vegertables_type = response.data;
          resolve();
        });
      });
    },
    //获取库存
    getAmount1() {
      var data = {};
      data.cropTypeId = this.form.cropTypeId;
      this.form.seedType = null;
      this.form.varietyName = null;
      this.form.originCompany = null;
      listSeedAmount(data).then((response) => {
        this.seed_amount = response.rows;
      });
    },
    //获取库存
    getAmount2() {
      var data = {};
      data.cropTypeId = this.form.cropTypeId;
      data.seedType = this.form.seedType;
      this.form.varietyName = null;
      this.form.originCompany = null;
      listSeedAmount(data).then((response) => {
        this.seed_amount = response.rows;
      });
    },
    //获取库存
    getAmount3() {
      var data = {};
      data.cropTypeId = this.form.cropTypeId;
      data.seedType = this.form.seedType;
      data.varietyName = this.form.varietyName;
      this.form.originCompany = null;
      listSeedAmount(data).then((response) => {
        this.seed_amount = response.rows;
      });
    },
    /** 查询种子申请列表 */
    getList() {
      this.loading = true;
      listTemporary(this.queryParams).then((response) => {
        //判断角色是否包含片区主管
        // var flag = 0;
        // for (var i = 0; i < this.userRoles.length; i++) {
        //   if (this.userRoles[i] == "greenhouse_director") {
        //     flag = 1;
        //   }
        // }
        // console.log("flag", flag);
        // console.log(this.userName);
        // if (flag == 1) {
        //   this.applyList.length = 0;
        //   for (var j = 0; j < response.rows.length; j++) {
        //     if (this.userName == response.rows[j].userName) {
        //       this.applyList.push(response.rows[j]);
        //     }
        //   }
        // } else {
        this.applyList = response.rows;
        console.log(response.rows);
        // }
        this.total = response.total;
        this.loading = false;
        this.formdata_vegertable(this.applyList);
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
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核临时生产资料",
        menuName3: "种子临时审核",
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
      this.ids = selection.map((item) => item.seedApplyTemporaryId);
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
      this.xg = 0;
      this.open = true;
      this.title = "添加种子临时申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      console.log(row);
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids;
      getTemporary(seedApplyTemporaryId).then((response) => {
        this.form = response.data;
        this.xg = 1;
        this.open = true;
        this.title = "修改种子申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(
            "11111this.form.seedApplyTemporaryId",
            this.form.seedApplyTemporaryId
          );
          if (this.form.seedApplyTemporaryId != null) {
            updateTemporary(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemporary(this.form).then((response) => {
              addNews(this.form2).then((response) => {
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
      const seedApplyTemporaryIds = row.seedApplyTemporaryId || this.ids;
      this.$confirm("是否确认删除该种子申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delTemporary(seedApplyTemporaryIds).then((response) => {
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
        for (let i = 0; i < this.applyTemporaryList.length; i++) {
          queryParams.exportIds.push(this.applyTemporaryList[i].seedApplyTemporaryId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出种子申请数据项?", "提示", {
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
