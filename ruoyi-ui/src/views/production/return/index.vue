<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="蔬菜类型" prop="cropType">
        <el-input
          v-model="queryParams.cropType"
          placeholder="请输入蔬菜类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="种子类型" prop="seedType">
        <el-input
          v-model="queryParams.seedType"
          placeholder="接穗 | 砧木"
          clearable
          size="small"
        >
          @keyup.enter.native="handleQuery"
        </el-input>
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
      <el-form-item label="退回时间">
        <el-date-picker
          v-model="daterangeReturnTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="退回人" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入退回人"
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
          v-hasPermi="['production:return:add']"
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
          v-hasPermi="['production:return:edit']"
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
          v-hasPermi="['production:return:remove']"
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
          v-hasPermi="['production:return:export']"
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
      :data="returnList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="种子类型" align="center" prop="seedType" />
      <el-table-column label="品种名称" align="center" prop="varietyName" />
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
      <el-table-column
        label="退回人"
        align="center"
        prop="userName"
        class-name="small-padding fixed-width"
      />
      <el-table-column label="操作" align="center" width="130px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['production:return:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:return:remove']"
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

    <!-- 添加或修改种子退回对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="蔬菜类型" prop="cropType">
          <el-select
            v-model="form.cropType"
            placeholder="请选择蔬菜类型"
            @change="getCropSelected"
          >
            <el-option
              v-for="(item, index) in cropList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种子类型" prop="seedType">
          <el-radio-group v-model="form.seedType">
            <el-radio
              v-for="(item, index) in seedTypeOptions"
              :key="index"
              :label="item.label"
              :disabled="item.disabled"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="品种名称" prop="varietyName">
          <el-select v-model="form.varietyName" placeholder="请输入品种名称">
            <el-option
              v-for="(item, index) in varietyList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="退回量" prop="returnAmount">
          <el-input v-model="form.returnAmount" placeholder="默认为0" />
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
        <el-form-item label="退回人" prop="userName">
          <el-select
            v-model="form.userId"
            placeholder="请选择退回人"
            @change="getUserSelected"
          >
            <el-option
              v-for="(item, index) in userList"
              :key="index"
              :label="item.name"
              :value="item.id"
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
  listReturn,
  getReturn,
  delReturn,
  addReturn,
  getUserName,
  getVarietyName,
  getCropType,
  updateReturn,
  exportReturn,
} from "@/api/production/return";

export default {
  name: "Return",
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
      // 种子退回表格数据
      returnList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 退回时间时间范围
      daterangeReturnTime: [],
      //蔬菜类型列表
      cropList: [],
      //用户列表
      userList: [],
      //品种类型列表
      varietyList: [],
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        pageNum: 1,
        pageSize: 10,
        cropTypeId: null,
        cropType: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        returnAmount: null,
        returnTime: null,
        userId: null,
        userName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cropType: [
          { required: true, message: "蔬菜类型不能为空", trigger: "change" },
        ],
        seedType: [
          {
            required: true,
            message: "种子类型不能为空",
            trigger: "change",
          },
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "change" },
        ],
        returnAmount: [
          { required: true, message: "退回量不能为空", trigger: "blur" },
          { validator: isNum, trigger: "blur" },
        ],
        returnTime: [
          { required: true, message: "退回时间不能为空", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "退回人姓名不能为空", trigger: "change" },
        ],
      },
      seedTypeOptions: [
        {
          label: "接穗",
          value: 1,
        },
        {
          label: "砧木",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询种子退回列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeReturnTime && "" != this.daterangeReturnTime) {
        this.queryParams.params["beginReturnTime"] =
          this.daterangeReturnTime[0];
        this.queryParams.params["endReturnTime"] = this.daterangeReturnTime[1];
      }
      listReturn(this.queryParams).then((response) => {
        this.returnList = response.rows;
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
        seedReturnId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        returnAmount: null,
        returnTime: null,
        userId: null,
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
      this.ids = selection.map((item) => item.seedReturnId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getCropList();
      this.getUserList();
      this.open = true;
      this.title = "添加种子退回";
    },

    /** 获取蔬菜类型下拉框列表 */
    getCropList() {
      var that = this;
      getCropType().then(function (response) {
        var list = [];
        var status = null;
        for (var i = 0; i < response.rows.length; i++) {
          status = response.rows[i].value;
          list.push({ id: response.rows[i].key, name: status });
        }
        that.cropList = list;
      });
    },
    getCropSelected(val) {
      console.log(val);
      for (let i = 0; i < this.cropList.length; i++) {
        if (this.cropList[i].id === val) {
          this.getVarietyNameList(val);
          console.log(this.varietyList);
          this.form.cropTypeId = this.cropList[i].id;
          this.form.cropType = this.cropList[i].name;
        }
      }
    },
    /** 获取用户下拉框列表 */
    getUserList() {
      var that = this;
      getUserName().then(function (response) {
        var list = [];
        var status = null;
        for (var i = 0; i < response.rows.length; i++) {
          status = response.rows[i].value;
          list.push({ id: response.rows[i].key, name: status });
        }
        that.userList = list;
      });
    },
    getUserSelected(val) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === val) {
          this.form.userId = this.userList[i].id;
          this.form.userName = this.userList[i].name;
        }
      }
    },
    /** 获取品种名称列表 */
    getVarietyNameList(cropId) {
      var that = this;
      getVarietyName(cropId).then(function (response) {
        that.varietyList = response.rows;
      });
    },
    // getVarietySelected(val){
    //   for(let i=0;i<this.varietyList.length;i++){
    //     if(this.varietyList[i].id===val){
    //       this.form.varietyName=this.varietyList[i].name;
    //       // this.form.cropType=this.userList[i].name;
    //     }
    //   }
    // },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getCropList();
      this.getUserList();
      const seedReturnId = row.seedReturnId || this.ids;
      getReturn(seedReturnId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改种子退回";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.seedReturnId != null) {
            updateReturn(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReturn(this.form).then((response) => {
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
      const seedReturnIds = row.seedReturnId || this.ids;
      this.$confirm("是否确认删除该种子退回信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delReturn(seedReturnIds);
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
      this.$confirm("是否确认导出种子退回数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportReturn(queryParams);
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
