<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="基质种类" prop="stromaKindId">
        <el-select
          v-model="queryParams.stromaKindId"
          placeholder="请选择基质种类"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in StromaKindList"
            :key="dict.stromaKindId"
            :label="dict.stromaKind"
            :value="dict.stromaKindId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="基质类型" prop="stromaTypeId">
        <el-select
          v-model="queryParams.stromaTypeId"
          placeholder="请选择基质类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in StromaTypeList"
            :key="dict.stromaTypeId"
            :label="dict.stromaTypeName"
            :value="dict.stromaTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="基质品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入基质品牌"
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
          v-hasPermi="['production:stromaAmount:add']"
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
          v-hasPermi="['production:stromaAmount:edit']"
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
          v-hasPermi="['production:stromaAmount:remove']"
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
          v-hasPermi="['production:stromaAmount:export']"
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
      :data="stromaAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="基质种类" align="center" prop="stromaKindId">
        <template slot-scope="scope">
          <span>
            {{
              StromaKindList.filter(
                (item) => item.stromaKindId == scope.row.stromaKindId
              )[0].stromaKind
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="基质类型" align="center" prop="stromaTypeId">
        <template slot-scope="scope">
          <span>
            {{
              StromaTypeList.filter(
                (item) => item.stromaTypeId == scope.row.stromaTypeId
              )[0].stromaTypeName
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="基质品牌" align="center" prop="brand" />
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
            v-hasPermi="['production:stromaAmount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:stromaAmount:remove']"
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

    <!-- 添加或修改基质量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="基质种类" prop="stromaKindId">
          <el-select v-model="form.stromaKindId" placeholder="请选择基质种类">
            <el-option
              v-for="dict in StromaKindList"
              :key="dict.stromaKindId"
              :label="dict.stromaKind"
              :value="dict.stromaKindId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="基质类型" prop="stromaTypeId">
          <el-select v-model="form.stromaTypeId" placeholder="请选择基质类型">
            <el-option
              v-for="dict in StromaTypeList"
              :key="dict.stromaTypeId"
              :label="dict.stromaTypeName"
              :value="dict.stromaTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="基质品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入基质品牌" />
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
  listStromaAmount,
  getStromaAmount,
  delStromaAmount,
  addStromaAmount,
  updateStromaAmount,
  exportStromaAmount,
} from "@/api/production/stroma/stromaAmount";
import { listStromaType } from "@/api/production/stroma/stromaType";
import { listStromaKind } from "@/api/production/stroma/stromaKind";

export default {
  name: "StromaAmount",
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
      // 基质量表格数据
      stromaAmountList: [],
      // 基质种
      StromaKindList: [],
      //基质类
      StromaTypeList: [],
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
        stromaKindId: null,
        stromaTypeId: null,
        brand: null,
        originCompany: null,
        storageAmount: null,
      },
      stromaType: {
        pageNum: 1,
        pageSize: 10,
        stromaTypeName: null,
        stromaTypeId: null,
      },
      stromaKind: {
        pageNum: 1,
        pageSize: 10,
        stromaKind: null,
        stromaKindId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        stromaKindId: [
          { required: true, message: "基质种类不能为空", trigger: "change" },
        ],
        stromaTypeId: [
          { required: true, message: "基质类型不能为空", trigger: "change" },
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
    Promise.all([this.getStromaKind(), this.getStromaType()]).then((res) => {
      this.getList();
    });
  },

  methods: {
    /** 查询基质种信息列表 */
    getStromaKind() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listStromaKind(this.queryParams).then((response) => {
          this.StromaKindList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    /** 查询基质类信息列表 */
    getStromaType() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listStromaType(this.queryParams).then((response) => {
          this.StromaTypeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },
    /** 查询基质量列表 */
    getList() {
      this.loading = true;
      listStromaAmount(this.queryParams).then((response) => {
        this.stromaAmountList = response.rows;
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
        stromaAmountId: null,
        stromaKindId: null,
        stromaTypeId: null,
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
      this.ids = selection.map((item) => item.stromaAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加基质量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const stromaAmountId = row.stromaAmountId || this.ids;
      getStromaAmount(stromaAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改基质量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.stromaAmountId != null) {
            updateStromaAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStromaAmount(this.form).then((response) => {
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
      const stromaAmountIds = row.stromaAmountId || this.ids;
      this.$confirm("是否确认删除该基质量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delStromaAmount(stromaAmountIds);
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
        for (let i = 0; i < this.stromaAmountList.length; i++) {
          queryParams.exportIds.push(this.stromaAmountList[i].stromaAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出基质量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportStromaAmount(queryParams);
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
