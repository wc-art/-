<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="肥料类型" prop="fertilizerTypeId">
        <el-select
          v-model="queryParams.fertilizerTypeId"
          placeholder="请选择肥料类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in FertilizerTypeList"
            :key="dict.fertilizerTypeId"
            :label="dict.fertilizerType"
            :value="dict.fertilizerTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="肥料名称" prop="fertilizerNameId">
        <el-select
          v-model="queryParams.fertilizerNameId"
          placeholder="请选择肥料名称"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in FertilizerNameList"
            :key="dict.fertilizerNameId"
            :label="dict.fertilizerName"
            :value="dict.fertilizerNameId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="肥料品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入肥料品牌"
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
          v-hasPermi="['production:fertilizerAmount:add']"
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
          v-hasPermi="['production:fertilizerAmount:edit']"
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
          v-hasPermi="['production:fertilizerAmount:remove']"
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
          v-hasPermi="['production:fertilizerAmount:export']"
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
      :data="fertilizerAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="肥料类型" align="center" prop="fertilizerType" />
      <el-table-column label="肥料名称" align="center" prop="fertilizerName" />
      <el-table-column label="NPK含量" align="center" prop="npkContent" />
      <el-table-column label="肥料品牌" align="center" prop="brand" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="库存量（袋）"
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
            v-hasPermi="['production:fertilizerAmount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:fertilizerAmount:remove']"
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

    <!-- 添加或修改化肥量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="肥料类型" prop="fertilizerTypeId">
          <el-select
            v-model="form.fertilizerTypeId"
            placeholder="请选择肥料类型"
          >
            <el-option
              v-for="dict in FertilizerTypeList"
              :key="dict.fertilizerTypeId"
              :label="dict.fertilizerType"
              :value="dict.fertilizerTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="肥料名称" prop="fertilizerNameId">
          <el-select
            v-model="form.fertilizerNameId"
            placeholder="请选择肥料名称"
          >
            <el-option
              v-for="dict in FertilizerNameList"
              :key="dict.fertilizerNameId"
              :label="dict.fertilizerName"
              :value="dict.fertilizerNameId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="NPK含量" prop="npkContent">
          <el-input v-model="form.npkContent" placeholder="请输入NPK含量" />
        </el-form-item>
        <el-form-item label="肥料品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入肥料品牌" />
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
  listFertilizerType,
  listFertilizerName,
  listFertilizerAmount,
  getFertilizerAmount,
  delFertilizerAmount,
  addFertilizerAmount,
  updateFertilizerAmount,
  exportFertilizerAmount,
} from "@/api/production/fertilizer/fertilizerAmount";
import Editor from "@/components/Editor";

export default {
  name: "FertilizerAmount",

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
      // 化肥量表格数据
      fertilizerAmountList: [],
      FertilizerTypeList: [],
      FertilizerNameList: [],
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
        fertilizerTypeId: null,
        fertilizerNameId: null,
        npkContent: null,
        brand: null,
        originCompany: null,
        storageAmount: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fertilizerTypeId: [
          { required: true, message: "肥料类型不能为空", trigger: "change" },
        ],
        fertilizerNameId: [
          { required: true, message: "肥料名称不能为空", trigger: "change" },
        ],
        npkContent: [
          { required: true, message: "npk含量不能为空", trigger: "change" },
        ],

        brand: [{ required: true, message: "品牌不能为空", trigger: "change" }],
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
    Promise.all([this.getFertilizerType(), this.getFertilizerName()]).then(
      (res) => {
        this.getList();
      }
    );
  },

  methods: {
    getFertilizerType() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listFertilizerType(this.queryParams).then((response) => {
          this.FertilizerTypeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    getFertilizerName() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listFertilizerName(this.queryParams).then((response) => {
          this.FertilizerNameList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    //格式化化肥类型
    formdata_type(data) {
      let fertilizer_type_map = new Map();
      this.FertilizerTypeList.forEach((type) => {
        fertilizer_type_map.set(type.fertilizerTypeId, type.fertilizerType);
      });
      data.forEach((type) => {
        let fertilizer_type_name = fertilizer_type_map.get(
          type.fertilizerTypeId
        );
        type.fertilizerType = fertilizer_type_name;
      });
    },
    //格式化名称
    formdata_name(data) {
      let fertilizer_name_map = new Map();
      this.FertilizerNameList.forEach((type) => {
        fertilizer_name_map.set(type.fertilizerNameId, type.fertilizerName);
      });
      data.forEach((type) => {
        let fertilizer_name_name = fertilizer_name_map.get(
          type.fertilizerNameId
        );
        type.fertilizerName = fertilizer_name_name;
      });
    },
    /** 查询化肥量列表 */
    getList() {
      this.loading = true;
      listFertilizerAmount(this.queryParams).then((response) => {
        this.fertilizerAmountList = response.rows;
        this.formdata_type(this.fertilizerAmountList);
        this.formdata_name(this.fertilizerAmountList);
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
        fertilizerAmountId: null,
        fertilizerTypeId: null,
        fertilizerNameId: null,
        npkContent: null,
        brand: null,
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
      this.ids = selection.map((item) => item.fertilizerAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加化肥量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fertilizerAmountId = row.fertilizerAmountId || this.ids;
      getFertilizerAmount(fertilizerAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改化肥量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.fertilizerAmountId != null) {
            updateFertilizerAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFertilizerAmount(this.form).then((response) => {
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
      const fertilizerAmountIds = row.fertilizerAmountId || this.ids;
      this.$confirm("是否确认删除该化肥量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delFertilizerAmount(fertilizerAmountIds);
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
        for (let i = 0; i < this.fertilizerAmountList.length; i++) {
          queryParams.exportIds.push(this.fertilizerAmountList[i].fertilizerAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出化肥量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportFertilizerAmount(queryParams);
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
