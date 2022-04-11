<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="棚膜类型" prop="greenhousefilmTypeId">
        <el-select
          v-model="form.greenhousefilmTypeId"
          placeholder="请选择棚膜类型"
          clearable
          size="small"
        >
          <el-option
            v-for="type in greenhousefilm_type"
            :key="type.greenhousefilmTypeId"
            :value="type.greenhousefilmTypeId"
            :label="type.greenhousefilmType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厚度" prop="thickness">
        <el-input
          v-model="queryParams.thickness"
          placeholder="请输入厚度"
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

      <el-form-item label="审批状态" prop="approvalStatus">
        <el-select
          v-model="queryParams.approvalStatus"
          placeholder="请选择审批状态"
          clearable
          size="small"
        >
          <el-option label="审核中" value="0" />
          <el-option label="审核通过" value="1" />
          <el-option label="审核不通过" value="2" />
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
          v-bind:disabled="setTopBtn() || multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['system:greenhousefilmpply:remove']"
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
          v-hasPermi="['system:greenhousefilmpply:export']"
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
      :data="greenhousefilmpplyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="greenhousefilmType" />
      <el-table-column label="厚度" align="center" prop="thickness" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column label="单位" align="center" prop="applyUnit" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="审核"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setpassBtn1(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlethrough(scope.row)"
            v-hasPermi="['system:greenhousefilmpply:permit']"
            >通过</el-button
          >
          <el-button
            v-bind:disabled="setpassBtn1(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleNotThrogh(scope.row)"
            v-hasPermi="['system:greenhousefilmpply:permit']"
            >不通过</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="approvalStatus">
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatus] }}
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
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:greenhousefilmpply:remove']"
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

    <!-- 添加或修改棚膜购买申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="greenhousefilmTypeId">
          <el-select
            v-model="form.greenhousefilmTypeId"
            placeholder="请选择棚膜类型"
            clearable
            size="small"
          >
            <el-option
              v-for="type in greenhousefilm_type"
              :key="type.greenhousefilmTypeId"
              :value="type.greenhousefilmTypeId"
              :label="type.greenhousefilmType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厚度" prop="thickness">
          <el-input v-model.number="form.thickness" placeholder="请输入厚度" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model="form.applyAmount" placeholder="请输入申请量" />
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
  delNews1,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listGreenhousefilmpply,
  getGreenhousefilmpply,
  delGreenhousefilmpply,
  addGreenhousefilmpply,
  updateGreenhousefilmpply,
  exportGreenhousefilmpply,
} from "@/api/production/greenhousefilm/purchaseApply";
import { listGreenhousefilmType } from "@/api/production/greenhousefilm/greenhousefilmType";
import { vegetableType } from "@/api/production/seed/cropType";

export default {
  name: "Greenhousefilmpply",
  components: {},
  data() {
    return {
      //申请领用状态
      approvalStatus: {
        0: "审核中",
        1: "审核通过",
        2: "审核不通过",
      },
      //棚膜类型
      greenhousefilm_type: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approval: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 棚膜购买申请表格数据
      greenhousefilmpplyList: [],
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
        greenhousefilmTypeId: null,
        thickness: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: null,
        note: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        greenhousefilmTypeId: [
          { required: true, message: "类型不能为空", trigger: "blur" },
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
          { required: true, message: "审批状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    Promise.all([this.getGreenhousefilmTypes()]).then((res) => {
      this.getList();
    });
  },
  methods: {
    setTopBtn() {
      for (var i = 0; i < this.approval.length; i++) {
        if (
          (this.approval[i] != "0" ||
            this.single == true ||
            this.multiple == true) &&
          this.$store.getters.name != "admin"
        ) {
          return true;
        } else return false;
      }
    },
    //控制审核后修改删除按钮
    setEditBtn(row) {
      if (row.approvalStatus != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },
    //仓库管理员审核后，不能再按通过和不通过按钮
    setpassBtn1(row) {
      if (row.approvalStatus != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },
    //格式化蔬菜名称
    formdata_type(data) {
      let greenhousefilm_type_map = new Map();
      this.greenhousefilm_type.forEach((type) => {
        greenhousefilm_type_map.set(
          type.greenhousefilmTypeId,
          type.greenhousefilmType
        );
      });
      data.forEach((type) => {
        let greenhousefilm_name = greenhousefilm_type_map.get(
          type.greenhousefilmTypeId
        );
        type.greenhousefilmType = greenhousefilm_name;
      });
    },
    //查询蔬菜类型
    getGreenhousefilmTypes() {
      return new Promise((resolve, rejected) => {
        listGreenhousefilmType().then((response) => {
          this.greenhousefilm_type = response.rows;
          resolve();
        });
      });
    },
    /** 查询棚膜购买申请列表 */
    getList() {
      this.loading = true;
      listGreenhousefilmpply(this.queryParams).then((response) => {
        this.greenhousefilmpplyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_type(this.greenhousefilmpplyList);
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
        greenhousefilmPurchaseApplyId: null,
        greenhousefilmTypeId: null,
        thickness: null,
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
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核采购生产资料",
        menuName3: "棚膜审核",
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
      this.ids = selection.map((item) => item.greenhousefilmPurchaseApplyId);
      this.approval = selection.map((item) => item.approvalStatus);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加棚膜购买申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const greenhousefilmPurchaseApplyId =
        row.greenhousefilmPurchaseApplyId || this.ids;
      getGreenhousefilmpply(greenhousefilmPurchaseApplyId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改棚膜购买申请";
      });
    },
    /** 通过按钮操作 */
    handlethrough(row) {
      this.reset();
      this.form2.approvalBy = "warehouse_keeper";
      let that = this;
      that.form2 = this.form2;
      const greenhousefilmPurchaseApplyId =
        row.greenhousefilmPurchaseApplyId || this.ids;
      let data = {};
      data.greenhousefilmPurchaseApplyId = greenhousefilmPurchaseApplyId;
      data.approvalStatus = 1;
      this.$confirm("是否确认通过该条审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateGreenhousefilmpply(data).then((response) => {
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
    /** 不通过按钮操作 */
    handleNotThrogh(row) {
      this.reset();
      this.form2.approvalBy = "warehouse_keeper";
      let that = this;
      that.form2 = this.form2;
      const greenhousefilmPurchaseApplyId =
        row.greenhousefilmPurchaseApplyId || this.ids;
      let data = {};
      data.greenhousefilmPurchaseApplyId = greenhousefilmPurchaseApplyId;
      data.approvalStatus = 2;
      this.$confirm("是否确认不通过该条棚膜审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateGreenhousefilmpply(data).then((response) => {
            console.log(response);
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
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.greenhousefilmPurchaseApplyId != null) {
            updateGreenhousefilmpply(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGreenhousefilmpply(this.form).then((response) => {
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
      console.log("form2", that.form2);
      const greenhousefilmPurchaseApplyIds =
        row.greenhousefilmPurchaseApplyId || this.ids;
      this.$confirm("是否确认删除该棚膜购买申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delGreenhousefilmpply(greenhousefilmPurchaseApplyIds).then(
            (response) => {
              delNews1(that.form2).then((response) => {
                bus.$emit("getTodoNum");
              });
            }
          );
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
        for (let i = 0; i < this.greenhousefilmpplyList.length; i++) {
          queryParams.exportIds.push(this.greenhousefilmpplyList[i].greenhousefilmPurchaseApplyId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有棚膜购买申请数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportGreenhousefilmpply(queryParams);
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
