<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <!--      <el-form-item label="编号" prop="cartonAmountId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.cartonAmountId"-->
      <!--          placeholder="请输入编号"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="类型" prop="cartonTypeId">
        <el-select
          v-model="queryParams.cartonTypeId"
          placeholder="请选择纸箱类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeList"
            :key="dict.cartonTypeId"
            :label="dict.cartonType"
            :value="dict.cartonTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="cartonSpecification">
        <el-input
          v-model="queryParams.cartonSpecification"
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
      <el-form-item label="库存量" prop="storageAmount">
        <el-input
          v-model="queryParams.storageAmount"
          placeholder="请输入库存量"
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
          v-hasPermi="['system:cartonAmount:add']"
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
          v-hasPermi="['system:cartonAmount:edit']"
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
          v-hasPermi="['system:cartonAmount:remove']"
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
          v-hasPermi="['system:cartonAmount:export']"
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
      :data="cartonAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="cartonTypeId">
        <template slot-scope="scope">
          <span>{{
            typeList.filter(
              (item) => item.cartonTypeId == scope.row.cartonTypeId
            )[0].cartonType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" align="center" prop="cartonSpecification" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="库存量（个）"
        align="center"
        prop="storageAmount"
      />
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
            v-hasPermi="['system:cartonAmount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:cartonAmount:remove']"
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

    <!-- 添加或修改纸箱量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="cartonTypeId">
          <el-select
            v-model="form.cartonTypeId"
            placeholder="请输入类型"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in typeList"
              :key="dict.cartonTypeId"
              :label="dict.cartonType"
              :value="dict.cartonTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="cartonSpecification">
          <el-input
            v-model="form.cartonSpecification"
            placeholder="请输入规格"
          />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="库存量" prop="storageAmount">
          <el-input v-model="form.storageAmount" placeholder="请输入库存量" />
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
  listType,
  listCartonAmount,
  getCartonAmount,
  delCartonAmount,
  addCartonAmount,
  updateCartonAmount,
  exportCartonAmount,
} from "@/api/production/carton/cartonAmount";

export default {
  name: "CartonAmount",
  components: {},
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
      // 纸箱量表格数据
      cartonAmountList: [],
      // 纸箱类型表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        orderIds: [],
        pageNum: 1,
        pageSize: 10,
        cartonAmountId: null,
        cartonTypeId: null,
        cartonSpecification: null,
        originCompany: null,
        storageAmount: null,
      },
      // 表单参数
      form: {},
      // 查询参数
      cartontype: {
        pageNum: 1,
        pageSize: 10,
        cartonType: null,
        cartonTypeId: null,
      },
      // 表单校验
      rules: {
        cartonTypeId: [
          { required: true, message: "类型不能为空", trigger: "change" },
        ],
        cartonSpecification: [
          { required: true, message: "规格不能为空", trigger: "change" },
        ],
        originCompany: [
          { required: true, message: "购自公司不能为空", trigger: "change" },
        ],
        storageAmount: [
          { required: true, message: "库存量不能为空", trigger: "blur" },
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
    Promise.all([this.typegetList()]).then((res) => {
      this.getList();
    });
  },
  methods: {
    /** 查询纸箱类型列表 */
    typegetList() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listType(this.cartontype).then((response) => {
          this.typeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    /** 查询纸箱量列表 */
    getList() {
      this.loading = true;
      listCartonAmount(this.queryParams).then((response) => {
        this.cartonAmountList = response.rows;
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
        cartonAmountId: null,
        cartonTypeId: null,
        cartonSpecification: null,
        originCompany: null,
        storageAmount: null,
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
      this.ids = selection.map((item) => item.cartonAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加纸箱量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cartonAmountId = row.cartonAmountId || this.ids;
      getCartonAmount(cartonAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改纸箱量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.cartonAmountId != null) {
            updateCartonAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCartonAmount(this.form).then((response) => {
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
      const cartonAmountIds = row.cartonAmountId || this.ids;
      this.$confirm("是否确认删除该纸箱量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delCartonAmount(cartonAmountIds);
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
        for (let i = 0; i < this.cartonAmountList.length; i++) {
          queryParams.orderIds.push(this.cartonAmountList[i].cartonAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.orderIds = this.ids;
      }
      this.$confirm("是否确认导出所有纸箱量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportCartonAmount(queryParams);
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
