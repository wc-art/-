<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="农药类型" prop="pesticideTypeId">
        <el-select
          v-model="queryParams.pesticideTypeId"
          placeholder="请选择农药类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in PesticideTypeList"
            :key="dict.pesticideTypeId"
            :label="dict.pesticideType"
            :value="dict.pesticideTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="农药名称" prop="pesticideNameId">
        <el-select
          v-model="queryParams.pesticideNameId"
          placeholder="请选择农药名称"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in PesticideNameList"
            :key="dict.pesticideNameId"
            :label="dict.pesticideName"
            :value="dict.pesticideNameId"
          />
        </el-select>
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
      <!--      <el-form-item label="购买量" prop="purchaseAmount">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.purchaseAmount"-->
      <!--          placeholder="请输入购买量"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="购买时间" prop="purchaseTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.purchaseTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择购买时间"
        >
        </el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="单价" prop="price">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.price"-->
      <!--          placeholder="请输入单价"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="总价" prop="totalPrice">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.totalPrice"-->
      <!--          placeholder="请输入总价"-->
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
          v-hasPermi="['production:pesticidePurchase:add']"
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
          v-hasPermi="['production:pesticidePurchase:edit']"
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
          v-hasPermi="['production:pesticidePurchase:remove']"
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
          v-hasPermi="['production:pesticidePurchase:export']"
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
      :data="pesticidePurchaseList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="农药类型" align="center" prop="pesticideTypeId">
        <template slot-scope="scope">
          <span>{{
            PesticideTypeList.filter(
              (item) => item.pesticideTypeId == scope.row.pesticideTypeId
            )[0].pesticideType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="农药名称" align="center" prop="pesticideNameId">
        <template slot-scope="scope">
          <span>{{
            PesticideNameList.filter(
              (item) => item.pesticideNameId == scope.row.pesticideNameId
            )[0].pesticideName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效含量" align="center" prop="content" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="购买量（瓶/袋）"
        align="center"
        prop="purchaseAmount"
      />
      <el-table-column
        label="购买时间"
        align="center"
        prop="purchaseTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.purchaseTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['production:pesticidePurchase:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:pesticidePurchase:remove']"
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

    <!-- 添加或修改农药购买信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="农药类型" prop="pesticideTypeId">
          <el-select
            v-model="form.pesticideTypeId"
            placeholder="请选择农药类型外码"
          >
            <el-option
              v-for="dict in PesticideTypeList"
              :key="dict.pesticideTypeId"
              :label="dict.pesticideType"
              :value="dict.pesticideTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="农药名称" prop="pesticideNameId">
          <el-select
            v-model="form.pesticideNameId"
            placeholder="请选择农药名称"
          >
            <el-option
              v-for="dict in PesticideNameList"
              :key="dict.pesticideNameId"
              :label="dict.pesticideName"
              :value="dict.pesticideNameId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效含量" prop="content">
          <el-input v-model="form.content" placeholder="请输入有效含量" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="购买量" prop="purchaseAmount">
          <el-input
            v-model="form.purchaseAmount"
            placeholder="请输入购买量"
            @input="totalPrice"
          />
        </el-form-item>
        <el-form-item label="购买时间" prop="purchaseTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.purchaseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择购买时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input
            v-model="form.price"
            placeholder="请输入单价"
            @input="totalPrice"
          />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入总价" />
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
  listPesticideType,
  listPesticideName,
  listPesticidePurchase,
  getPesticidePurchase,
  delPesticidePurchase,
  addPesticidePurchase,
  updatePesticidePurchase,
  exportPesticidePurchase,
} from "@/api/production/pesticide/pesticidePurchase";
import Editor from "@/components/Editor";

export default {
  name: "PesticidePurchase",
  components: {
    Editor,
  },
  data() {
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
      // 农药购买信息表格数据
      pesticidePurchaseList: [],
      PesticideTypeList: [],
      PesticideNameList: [],
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
        pesticideTypeId: null,
        pesticideNameId: null,
        content: null,
        originCompany: null,
        purchaseAmount: null,
        purchaseTime: null,
        price: null,
        totalPrice: null,
        note: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pesticideTypeId: [
          { required: true, message: "农药类型不能为空", trigger: "change" },
        ],
        pesticideNameId: [
          { required: true, message: "农药名称不能为空", trigger: "change" },
        ],
        purchaseAmount: [
          { required: true, message: "购买量不能为空", trigger: "blur" },
          {
            type: "number",
            message: "请输入正数",
            trigger: "blur",
            transform(value) {
              if (!/^(?!0)\d+(\.\d{1,4})?$/.test(value)) {
                return true;
              } else {
              }
            },
          },
        ],
        content: [
          { required: true, message: "有效含量不能为空", trigger: "blur" },
        ],
        originCompany: [
          { required: true, message: "购自公司不能为空", trigger: "blur" },
        ],
        purchaseTime: [
          { required: true, message: "购买时间不能为空", trigger: "blur" },
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
        totalPrice: [
          { required: true, message: "总价不能为空", trigger: "blur" },
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
      },
    };
  },
  created() {
    Promise.all([
      this.getPesticideTypeList(),
      this.getPesticideKindList(),
    ]).then((res) => {
      this.getList();
    });
  },
  methods: {
    getPesticideTypeList() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listPesticideType(this.queryParams).then((response) => {
          this.PesticideTypeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    getPesticideKindList() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listPesticideName(this.queryParams).then((response) => {
          this.PesticideNameList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },

    /** 查询农药购买信息列表 */
    getList() {
      this.loading = true;
      listPesticidePurchase(this.queryParams).then((response) => {
        this.pesticidePurchaseList = response.rows;
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
        pesticidePurchaseId: null,
        pesticideTypeId: null,
        pesticideNameId: null,
        content: null,
        originCompany: null,
        purchaseAmount: null,
        purchaseTime: null,
        price: null,
        totalPrice: null,
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
      this.ids = selection.map((item) => item.pesticidePurchaseId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加农药购买信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const pesticidePurchaseId = row.pesticidePurchaseId || this.ids;
      getPesticidePurchase(pesticidePurchaseId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改农药购买信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.pesticidePurchaseId != null) {
            updatePesticidePurchase(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPesticidePurchase(this.form).then((response) => {
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
      const pesticidePurchaseIds = row.pesticidePurchaseId || this.ids;
      this.$confirm("是否确认删除该农药购买信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delPesticidePurchase(pesticidePurchaseIds);
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
        for (let i = 0; i < this.pesticidePurchaseList.length; i++) {
          queryParams.exportIds.push(this.pesticidePurchaseList[i].pesticidePurchaseId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出农药购买信息数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportPesticidePurchase(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    totalPrice() {
      this.form.totalPrice =
        Math.round(
          parseFloat(this.form.price * 100 * this.form.purchaseAmount)
        ) / 100;
    },
  },
};
</script>
