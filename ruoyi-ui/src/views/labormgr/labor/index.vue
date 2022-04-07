<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="工作时间">
        <el-date-picker
          v-model="daterangeWorkTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="操作名称" prop="operationName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.operationName"-->
      <!--          placeholder="请输入操作名称"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="操作名称" prop="operationName">
        <el-select
          v-model="queryParams.operationName"
          placeholder="请选择操作名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="item in operationList"
            :label="item.name"
            :value="item.name"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作地点" prop="workPlace">
        <el-input
          v-model="queryParams.workPlace"
          placeholder="请输入工作地点"
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
          v-hasPermi="['labormgr:labor:add']"
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
          v-hasPermi="['labormgr:labor:edit']"
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
          v-hasPermi="['labormgr:labor:remove']"
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
          v-hasPermi="['labormgr:labor:export']"
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
      :data="laborList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column
        label="工作时间"
        align="center"
        prop="workTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作名称" align="center" prop="operationName" />
      <el-table-column label="工作人数" align="center" prop="laborNumber" />
      <el-table-column label="工作地点" align="center" prop="workPlace" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="生产厂长审批状态"
        align="center"
        prop="approvalStatusProduct"
        width="140px"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalOptions[scope.row.approvalStatusProduct]["label"] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleApprovalProdPass(scope.row)"
              v-hasPermi="['labormgr:labor:review1']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleApprovalProdNo(scope.row)"
              v-hasPermi="['labormgr:labor:review1']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="育苗场厂长审批状态"
        align="center"
        prop="approvalStatusManage"
        width="140px"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalOptions[scope.row.approvalStatusManage]["label"] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handleApprovalManaPass(scope.row)"
              v-hasPermi="['labormgr:labor:review2']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn2(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleApprovalManaNo(scope.row)"
              v-hasPermi="['labormgr:labor:review2']"
              >不通过</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <span>
            {{
              approvalStatus(
                scope.row.approvalStatusProduct,
                scope.row.approvalStatusManage
              )
            }}
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
            v-hasPermi="['labormgr:labor:edit']"
            >修改</el-button
          >
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['labormgr:labor:remove']"
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

    <!-- 添加或修改劳动力情况对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工作时间" prop="workTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.workTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择工作时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作名称" prop="operationName">
          <el-select
            v-model="form.operationId"
            placeholder="请选择操作名称"
            @change="getSelected"
          >
            <el-option
              v-for="item in operationList"
              :label="item.name"
              :value="item.id"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作人数" prop="laborNumber">
          <el-input v-model="form.laborNumber" placeholder="请输入工作人数" />
        </el-form-item>
        <el-form-item label="工作地点" prop="workPlace">
          <el-input v-model="form.workPlace" placeholder="请输入工作地点" />
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
  listLabor,
  getLabor,
  getOperation,
  delLabor,
  addLabor,
  updateLabor,
  exportLabor,
  reviewLabor,
} from "@/api/labormgr/labor";

export default {
  name: "Labor",
  components: {},
  data() {
    let num = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    let isNum = (rule, value, callback) => {
      if (!num.test(value)) {
        return callback(new Error("请输入非负数"));
      } else {
        callback();
      }
    };
    return {
      //存储当前用户的名称和角色
      userName: null,
      userRoles: [],

      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approvalStatus1: [],
      approvalStatus2: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 劳动力情况表格数据
      laborList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 工作时间时间范围
      daterangeWorkTime: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 更新时间时间范围
      daterangeUpdateTime: [],
      // 操作id和名称列表
      operationList: [],
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        laborEmployIds: [],
        pageNum: 1,
        pageSize: 10,
        workTime: null,
        operationId: null,
        operationName: null,
        laborNumber: null,
        workPlace: null,
        note: null,
        approvalStatusProduct: null,
        approvalStatusManage: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      form2: {},
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
      // 表单校验
      rules: {
        workTime: [
          { required: true, message: "工作时间不能为空", trigger: "blur" },
        ],
        operationId: [
          { required: true, message: "请选择下拉选择", trigger: "change" },
        ],
        laborNumber: [
          { required: true, message: "工作人数不能为空", trigger: "blur" },
          { validator: isNum, trigger: "blur" },
        ],
        workPlace: [
          { required: true, message: "工作地点不能为空", trigger: "blur" },
        ],
      },
    };
  },
  //
  // mounted() {
  //   this.getOperationList();
  // },

  created() {
    console.log("当前user名称", this.$store.getters.name);
    console.log("当前用户的角色", this.$store.getters.roles);
    this.userName = this.$store.getters.name;
    this.userRoles = this.$store.getters.roles;
    this.getOperationList();
    this.getList();
    this.getDicts("lab_approval_status").then((response) => {
      this.approvalStatusProductOptions = response.data;
    });
    this.getDicts("lab_approval_status").then((response) => {
      this.approvalStatusManageOptions = response.data;
    });
  },
  methods: {
    setTopBtn() {
      console.log(this.approvalStatus1);
      for (var i = 0; i < this.approvalStatus1.length; i++) {
        console.log("id1", this.approvalStatus1[i]);
        for (var j = 0; j < this.approvalStatus2.length; j++) {
          console.log("id2", this.approvalStatus2[j]);
          if (
            (this.approvalStatus1[i] != "0" ||
              this.approvalStatus2[j] != "0" ||
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
        (row.approvalStatusProduct != "0" || row.approvalStatusManage != "0") &&
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
    //育苗场厂长审核后，不能再按通过和不通过按钮
    setpassBtn2(row) {
      if (
        row.approvalStatusManage != "0" &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },
    /** 审批状态展示 */
    approvalStatus: function (prod, mana) {
      if (prod === 2 || mana === 2) {
        return "不通过";
      } else if (prod === 0 && mana === 0) {
        return "申请中";
      } else if (prod === 1 && mana === 1) {
        return "通过";
      } else {
        return "审核中";
      }
    },
    /** 查询劳动力情况列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeWorkTime && "" != this.daterangeWorkTime) {
        this.queryParams.params["beginWorkTime"] = this.daterangeWorkTime[0];
        this.queryParams.params["endWorkTime"] = this.daterangeWorkTime[1];
      }
      listLabor(this.queryParams).then((response) => {
        console.log("laborList的response", response.rows);
        //判断角色是否包含片区主管
        // var flag=0
        // for(var i=0;i<this.userRoles.length;i++) {
        //   if(this.userRoles[i]=="area_director"){
        //     flag=1
        //   }
        // }
        // console.log("角色是否包含片区主管flag",flag)
        // if(flag==1){
        //   this.laborList.length=0
        //   for(var j=0;j<response.rows.length;j++){
        //     if(this.userName==(response.rows[j].createBy)){
        //       this.laborList.push(response.rows[j])
        //     }
        //   }
        // }
        // else {
        this.laborList = response.rows;
        // }
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    onOpen() {},
    closeProduct() {
      this.$refs["formProduct"].resetFields();
    },
    closeManage() {
      this.$refs["formManage"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
    },
    // 表单重置
    reset() {
      this.form = {
        laborEmployId: null,
        workTime: null,
        operationId: null,
        laborNumber: null,
        workPlace: null,
        note: null,
        approvalStatusProduct: null,
        approvalStatusManage: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "劳动力管理",
        menuName2: "劳动力情况",
        menuName3: null,
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["production_director", "nursery_director"],
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
      this.daterangeWorkTime = [];
      this.daterangeCreateTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.laborEmployId);
      this.approvalStatus1 = selection.map(
        (item) => item.approvalStatusProduct
      );
      this.approvalStatus2 = selection.map((item) => item.approvalStatusManage);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    setApproBtn(prod) {
      if (prod == 0) {
        return true;
      } else return false;
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getOperationList();
      this.open = true;
      this.title = "添加劳动力情况";
      this.form.createBy = this.$store.state.user.name;
      this.form.updateBy = this.$store.state.user.name;
      this.form.approvalStatusProduct = 0;
      this.form.approvalStatusManage = 0;
    },
    /** 获取操作名称下拉框列表 */
    getOperationList() {
      var that = this;
      getOperation().then(function (response) {
        var list = [];
        var status = null;
        for (var i = 0; i < response.rows.length; i++) {
          status = response.rows[i].value;
          list.push({ id: response.rows[i].key, name: status });
        }
        that.operationList = list;
        console.log("Operatio", that.operationList);
      });
    },
    getSelected(val) {
      for (let i = 0; i < this.operationList.length; i++) {
        if (this.operationList[i].id === val) {
          this.form.operationId = this.operationList[i].id;
          this.form.operationName = this.operationList[i].name;
        }
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getOperationList();
      const laborEmployId = row.laborEmployId || this.ids;
      getLabor(laborEmployId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改劳动力情况";
        this.form.updateBy = this.$store.state.user.name;
      });
    },
    /** 育苗厂长审核通过 */
    handleApprovalManaPass(row) {
      this.reset();
      this.form2.approvalBy = "nursery_director";
      let that = this;
      that.form2 = this.form2;
      const laborEmployId = row.laborEmployId || this.ids;
      let data = {};
      data.laborEmployId = laborEmployId;
      data.approvalStatusManage = 1;

      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return reviewLabor(data).then((response) => {
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
          });
        })
        .then(() => {
          this.msgSuccess("审核完成");
          this.getList();
        })
        .catch(() => {});
    },

    /** 育苗厂长审核不通过 */
    handleApprovalManaNo(row) {
      this.reset();
      this.form2.approvalBy = "nursery_director";
      let that = this;
      that.form2 = this.form2;
      const laborEmployId = row.laborEmployId || this.ids;
      let data = {};
      data.laborEmployId = laborEmployId;
      data.approvalStatusManage = 2;
      this.$confirm("是否确认不通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return reviewLabor(data).then((response) => {
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });

            console.log(response);
          });
        })
        .then(() => {
          this.msgSuccess("审核完成");
          this.getList();
        })
        .catch(() => {});
    },

    /** 生产审核通过 */
    handleApprovalProdPass(row) {
      this.reset();
      this.form2.approvalBy = "production_director";
      let that = this;
      that.form2 = this.form2;
      const laborEmployId = row.laborEmployId || this.ids;
      let data = {};
      data.laborEmployId = laborEmployId;
      data.approvalStatusProduct = 1;

      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return reviewLabor(data).then((response) => {
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
          this.msgSuccess("审核完成");
          this.getList();
        })
        .catch(() => {});
    },
    /** 生产审核不通过 */
    handleApprovalProdNo(row) {
      this.reset();
      this.form2.approvalBy = "production_director";
      let that = this;
      that.form2 = this.form2;
      const laborEmployId = row.laborEmployId || this.ids;
      let data = {};
      data.laborEmployId = laborEmployId;
      data.approvalStatusProduct = 2;

      this.$confirm("是否确认不通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return reviewLabor(data).then((response) => {
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
          this.msgSuccess("审核完成");
          this.getList();
        })
        .catch(() => {});
    },

    /** 新增或修改提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.laborEmployId != null) {
            updateLabor(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLabor(this.form).then((response) => {
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
      const laborEmployIds = row.laborEmployId || this.ids;
      this.$confirm("是否确认删除劳动力情况?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delLabor(laborEmployIds).then((response) => {
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
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      queryParams.laborEmployIds = [];
      if (this.ids.length == 0) {
        for (var i = 0; i < this.laborList.length; i++) {
          queryParams.laborEmployIds.push(this.laborList[i].laborEmployId);
        }
      } else if (this.ids.length != 0) {
        queryParams.laborEmployIds = this.ids;
      }
      this.$confirm("是否确认导出所有劳动力情况数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportLabor(queryParams);
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
