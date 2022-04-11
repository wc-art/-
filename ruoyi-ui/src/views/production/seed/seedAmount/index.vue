<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <!--      <el-form-item label="编号" prop="seedAmountId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.seedAmountId"-->
      <!--          placeholder="请输入编号"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="蔬菜类型" prop="cropTypeId">
        <el-select
          v-model="queryParams.cropTypeId"
          placeholder="请选择蔬菜类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeList"
            :key="dict.cropTypeId"
            :label="dict.cropType"
            :value="dict.cropTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="种子类型" prop="seedType">
        <el-select
          v-model="queryParams.seedType"
          placeholder="请选择种子类型"
          clearable
          size="small"
        >
          <el-option label="接穗" value="接穗" />
          <el-option label="砧木" value="砧木" />
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
          v-hasPermi="['seed:amount:add']"
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
          v-hasPermi="['seed:amount:edit']"
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
          v-hasPermi="['seed:amount:remove']"
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
          v-hasPermi="['seed:amount:export']"
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
      :data="seedAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="蔬菜类型" align="center" prop="cropTypeId">
        <template slot-scope="scope">
          <span>{{
            typeList.filter(
              (item) => item.cropTypeId == scope.row.cropTypeId
            )[0].cropType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="种子类型" align="center" prop="seedType" />
      <el-table-column label="品种名称" align="center" prop="varietyName" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="库存量（粒）"
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
            v-hasPermi="['seed:amount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['seed:amount:remove']"
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

    <!-- 添加或修改种子量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="蔬菜类型" prop="cropTypeId">
          <el-select v-model="form.cropTypeId" placeholder="请选择蔬菜类型">
            <el-option
              v-for="dict in typeList"
              :key="dict.cropTypeId"
              :label="dict.cropType"
              :value="dict.cropTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="种子类型" prop="seedType">
          <el-select v-model="form.seedType" placeholder="请选择种子类型">
            <el-option label="接穗" value="接穗" />
            <el-option label="砧木" value="砧木" />
          </el-select>
        </el-form-item>
        <el-form-item label="品种名称" prop="varietyName">
          <el-input v-model="form.varietyName" placeholder="请输入品种名称" />
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
  listCropType,
  listSeedAmount,
  getSeedAmount,
  delSeedAmount,
  addSeedAmount,
  updateSeedAmount,
  exportSeedAmount,
} from "@/api/production/seed/seedAmount";

export default {
  name: "SeedAmount",
  components: {},
  data() {
    return {
      //种子类型
      seedtypelist: {
        0: "接穗",
        1: "砧木",
      },
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
      // 种子量表格数据
      seedAmountList: [],
      // 种子类型表格数据
      typeList: [],
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
        seedAmountId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        storageAmount: null,
      },
      // 表单参数
      form: {},
      // 查询参数
      croptype: {
        pageNum: 1,
        pageSize: 10,
        cropType: null,
        cropTypeId: null,
      },
      // 表单校验
      rules: {
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" },
        ],
        seedType: [
          { required: true, message: "种子类型不能为空", trigger: "change" },
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" },
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
    /** 查询种蔬菜类型列表 */
    typegetList() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listCropType(this.croptype).then((response) => {
          this.typeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },

    /** 查询种子量列表 */
    getList() {
      this.loading = true;
      listSeedAmount(this.queryParams).then((response) => {
        this.seedAmountList = response.rows;
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
        seedAmountId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
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
      this.ids = selection.map((item) => item.seedAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加种子量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const seedAmountId = row.seedAmountId || this.ids;
      getSeedAmount(seedAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改种子量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.seedAmountId != null) {
            updateSeedAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSeedAmount(this.form).then((response) => {
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
      const seedAmountIds = row.seedAmountId || this.ids;
      this.$confirm("是否确认删除该种子量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delSeedAmount(seedAmountIds);
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
        for (let i = 0; i < this.seedAmountList.length; i++) {
          queryParams.exportIds.push(this.seedAmountList[i].seedAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有种子量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportSeedAmount(queryParams);
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
