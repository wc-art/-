<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="类型" prop="bladeType">
        <el-input
          v-model="queryParams.bladeType"
          placeholder="请输入类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入品牌"
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
      <el-form-item label="退回时间">
        <el-date-picker
          v-model="queryParams.daterangeReturnTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="退回人" prop="userName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.userName"-->
      <!--          placeholder="请输入退回人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
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
          v-hasPermi="['production:bladere:add']"
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
          v-hasPermi="['production:bladere:edit']"
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
          v-hasPermi="['production:bladere:remove']"
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
          v-hasPermi="['production:bladere:export']"
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
      :data="bladereList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="bladeType" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="退回量" align="center" prop="returnAmount" />
      <el-table-column
        label="退回时间"
        align="center"
        prop="returnTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.returnTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退回人" align="center" prop="userName" />
      <el-table-column
        label="仓库管理员审核"
        align="center"
        prop="approval"
        width="140px"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approval] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handlethrough(scope.row)"
              v-hasPermi="['production:bladere:permit']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThrough(scope.row)"
              v-hasPermi="['production:bladere:permit']"
              >不通过</el-button
            >
          </div>
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
            v-hasPermi="['production:bladere:edit']"
            >修改</el-button
          >
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:bladere:remove']"
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

    <!-- 添加或修改刀片退回对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="bladeTypeId">
          <el-select
            v-model="form.bladeTypeId"
            placeholder="请输入类型"
            @change="getTypeSelected"
          >
            <el-option
              v-for="item in bladeTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-select v-model="form.brand" placeholder="请选择品牌">
            <el-option
              v-for="item in brandList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-select v-model="form.originCompany" placeholder="请选择购自公司">
            <el-option
              v-for="item in companyList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退回量" prop="returnAmount">
          <el-input v-model="form.returnAmount" placeholder="请输入退回量" />
        </el-form-item>
        <el-form-item label="退回时间" prop="returnTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.returnTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择退回时间"
          >
          </el-date-picker>
        </el-form-item>
        <!--        <el-form-item label="退回人" prop="userId">-->
        <!--          <el-select v-model="form.userId" placeholder="请选择退回人" @change="getUserSelected">-->
        <!--            <el-option v-for="item in userList" :label="item.name" :value="item.id"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
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
  listBladere,
  getBladere,
  getType,
  getUserName,
  getBrand,
  getOriginCompany,
  delBladere,
  addBladere,
  updateBladere,
  exportBladere,
} from "@/api/productionre/bladere";
import { getUserId } from "@/api/system/user";
export default {
  name: "Bladere",
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
      userId: null,
      loginUserName: null,
      userRoles: [],
      userName: null,
      //审批状态
      approvalStatus: {
        0: "未审批",
        1: "通过",
        2: "不通过",
      },
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approvalStatuss: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 刀片退回表格数据
      bladereList: [],
      bladeTypeList: [],
      //用户列表
      userList: [],
      //品牌类型列表
      brandList: [],
      //公司类型列表
      companyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 退回时间时间范围
      // daterangeReturnTime: [],
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        daterangeReturnTime: [],
        bladeReturnIds: [],
        pageNum: 1,
        pageSize: 10,
        bladeTypeId: null,
        bladeType: null,
        brand: null,
        originCompany: null,
        returnTime: null,
        userId: null,
        userName: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        bladeTypeId: [
          { required: true, message: "类型不能为空", trigger: "change" },
        ],
        originCompany: [
          { required: true, message: "购自公司不能为空", trigger: "change"},
        ],
        brand: [
          { required: true, message: "品牌不能为空", trigger: "change"}
        ],
        returnAmount: [
          { required: true, message: "退回量不能为空", trigger: "blur" },
          { validator: isNum, trigger: "blur" },
        ],
        returnTime: [
          { required: true, message: "退回时间不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "退回人不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    console.log("当前user名称", this.$store.getters.name);
    this.userName = this.$store.getters.name;
    this.getUserId();
    console.log("当前用户的角色", this.$store.getters.roles);
    this.userRoles = this.$store.getters.roles;
    for (var i = 0; i < this.userRoles.length; i++) {
      //片区主管/棚长根据退回人“看自己的”退回信息
      if (
        this.userRoles[i] == "greenhouse_director" ||
        this.userRoles[i] == "area_director"
      ) {
        this.loginUserName = this.$store.getters.name;
      }
    }

    this.getList();
    this.getTypeList();
    this.getUserList();
  },
  beforeMount() {
    this.getList();
  },
  methods: {
    setTopBtn() {
      console.log(this.approvalStatuss);
      for (var i = 0; i < this.approvalStatuss.length; i++) {
        if (
          (this.approvalStatuss[i] != "0" ||
            this.single == true ||
            this.multiple == true) &&
          this.$store.getters.name != "admin"
        ) {
          console.log("true");
          return true;
        } else return false;
      }
    },

    getUserId() {
      getUserId({ userName: this.userName }).then((response) => {
        this.userId = response.data;
        console.log("userId", this.userId);
      });
    },
    //控制审核后修改删除按钮
    setEditBtn(row) {
      if (row.approval != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },
    //片区主管审核后，不能再按通过和不通过按钮
    setpassBtn(row) {
      if (row.approval != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },

    /**通过按钮操作*/
    handlethrough(row) {
      this.reset();
      this.form2.approvalBy = "warehouse_keeper";
      let that = this;
      that.form2 = this.form2;
      const bladeReturnId = row.bladeReturnId || this.ids;
      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((response) => {
        console.log("1111", bladeReturnId);
        getBladere(bladeReturnId).then((response) => {
          let data = {};
          data = response.data;
          data.approval = 1;
          console.log("data", data);
          updateBladere(data).then((response) => {
            console.log(response);
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
            this.getList();
          });
          // this.getList()
        });
      });
    },
    /**不通过按钮操作*/
    handleNotThrough(row) {
      this.reset();
      this.form2.approvalBy = "warehouse_keeper";
      let that = this;
      that.form2 = this.form2;
      const bladeReturnId = row.bladeReturnId || this.ids;
      this.$confirm("是否确认不通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((response) => {
        getBladere(bladeReturnId).then((response) => {
          let data = {};
          data = response.data;
          data.approval = 2;
          console.log("data", data);
          updateBladere(data).then((response) => {
            console.log(response);
            delNews(that.form2).then((response) => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit("getTodoNum");
            });
            this.getList();
          });
          // this.getList()
        });
      });
    },

    /** 查询刀片退回列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (
        null != this.queryParams.daterangeReturnTime &&
        "" != this.queryParams.daterangeReturnTime
      ) {
        this.queryParams.params["beginReturnTime"] =
          this.queryParams.daterangeReturnTime[0];
        this.queryParams.params["endReturnTime"] =
          this.queryParams.daterangeReturnTime[1];
      }
      listBladere(this.queryParams).then((response) => {
        // if(this.loginUserName!=null){
        //   console.log("111")
        //   this.bladereList=[]
        //   for(var i=0;i<response.rows.length;i++){
        //     if(this.loginUserName==response.rows[i].userName){
        //       this.bladereList.push(response.rows[i]);
        //     }
        //   }
        //   this.total = response.total;
        //   console.log("11this.bladereList",this.bladereList)
        // }

        // else {
        this.bladereList = response.rows;
        this.total = response.total;
        console.log("22this.bladereList", this.bladereList);
        // }
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
        bladeReturnId: null,
        bladeTypeId: null,
        brand: null,
        originCompany: null,
        returnAmount: null,
        returnTime: null,
        userId: null,
        approval: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "生产资料退回",
        menuName3: "刀片退回",
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
      this.$set(this.queryParams, "daterangeReturnTime", []);
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.bladeReturnId);
      this.approvalStatuss = selection.map((item) => item.approval);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 获取基质类型下拉框列表 */
    getTypeList() {
      this.loading = true;
      let list = [];
      getType().then((response) => {
        let status = null;
        for (let i = 0; i < response.rows.length; i++) {
          status = response.rows[i].value;
          list.push({ id: response.rows[i].key, name: status });
        }
        this.loading = false;
      });
      this.bladeTypeList = list;
    },
    getTypeSelected(val) {
      for (let i = 0; i < this.bladeTypeList.length; i++) {
        if (this.bladeTypeList[i].id === val) {
          this.form.bladeTypeId = this.bladeTypeList[i].id;
        }
      }
      this.getBrandList(this.form.bladeTypeId);
      this.getCompanyList(this.form.bladeTypeId);
    },
    /** 获取品牌下拉框列表 */
    getBrandList(typeId) {
      var that = this;
      this.loading = true;
      getBrand(typeId).then((response) => {
        that.brandList = response.rows;
        this.loading = false;
      });
    },
    /** 获取公司下拉框列表 */
    getCompanyList(typeId) {
      var that = this;
      this.loading = true;
      getOriginCompany(typeId).then((response) => {
        that.companyList = response.rows;
        this.loading = false;
      });
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
      this.form.createBy = this.$store.state.user.name;
      this.form.updateBy = this.$store.state.user.name;
      this.title = "添加刀片退回";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bladeReturnId = row.bladeReturnId || this.ids;
      getBladere(bladeReturnId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.form.updateBy = this.$store.state.user.name;
        this.title = "修改刀片退回";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.bladeReturnId != null) {
            updateBladere(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            if (this.form.approval == null) {
              this.form.approval = 0;
            }
            this.form.userId = this.userId;
            addBladere(this.form).then((response) => {
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
      const bladeReturnIds = row.bladeReturnId || this.ids;
      this.$confirm("是否确认删除刀片退回?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delBladere(bladeReturnIds).then((response) => {
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
      queryParams.bladeReturnIds = [];
      if (this.ids.length == 0) {
        for (var i = 0; i < this.bladereList.length; i++) {
          queryParams.bladeReturnIds.push(this.bladereList[i].bladeReturnId);
        }
      } else if (this.ids.length != 0) {
        queryParams.bladeReturnIds = this.ids;
      }
      this.$confirm("是否确认导出刀片退回数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportBladere(queryParams);
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
