<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item
        label="调节剂类型"
        prop="regulatorTypeId"
        label-width="85px"
      >
        <el-select
          v-model="queryParams.regulatorTypeId"
          placeholder="请选择调节剂类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in RegulatorTypeList"
            :key="dict.regulatorTypeId"
            :label="dict.regulatorType"
            :value="dict.regulatorTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="调节剂名称"
        prop="regulatorNameId"
        label-width="85px"
      >
        <el-select
          v-model="queryParams.regulatorNameId"
          placeholder="请选择调节剂名称"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in RegulatorNameList"
            :key="dict.regulatorNameId"
            :label="dict.regulatorName"
            :value="dict.regulatorNameId"
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
          v-hasPermi="['production:regulatorAmount:add']"
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
          v-hasPermi="['production:regulatorAmount:edit']"
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
          v-hasPermi="['production:regulatorAmount:remove']"
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
          v-hasPermi="['production:regulatorAmount:export']"
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
      :data="regulatorAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="调节剂类型" align="center" prop="regulatorTypeId">
        <template slot-scope="scope">
          <span>
            {{
              RegulatorTypeList.filter(
                (item) => item.regulatorTypeId == scope.row.regulatorTypeId
              )[0].regulatorType
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="调节剂名称" align="center" prop="regulatorNameId">
        <template slot-scope="scope">
          <span>
            {{
              RegulatorNameList.filter(
                (item) => item.regulatorNameId == scope.row.regulatorNameId
              )[0].regulatorName
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="有效含量" align="center" prop="content" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="库存量（瓶/袋）"
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
            v-hasPermi="['production:regulatorAmount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:regulatorAmount:remove']"
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

    <!-- 添加或修改调节剂量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="调节剂类型" prop="regulatorTypeId">
          <el-select
            v-model="form.regulatorTypeId"
            placeholder="请选择调节剂类型"
          >
            <el-option
              v-for="dict in RegulatorTypeList"
              :key="dict.regulatorTypeId"
              :label="dict.regulatorType"
              :value="dict.regulatorTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="调节剂名称" prop="regulatorNameId">
          <el-select
            v-model="form.regulatorNameId"
            placeholder="请选择调节剂名称"
          >
            <el-option
              v-for="dict in RegulatorNameList"
              :key="dict.regulatorNameId"
              :label="dict.regulatorName"
              :value="dict.regulatorNameId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效含量" prop="content">
          <el-input v-model="form.content" placeholder="请输入有效含量" />
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
  listRegulatorName,
  listRegulatorType,
  listRegulatorAmount,
  getRegulatorAmount,
  delRegulatorAmount,
  addRegulatorAmount,
  updateRegulatorAmount,
  exportRegulatorAmount,
} from "@/api/production/regulator/regulatorAmount";
import Editor from "@/components/Editor";
export default {
  name: "RegulatorAmount",

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
      // 调节剂量表格数据
      regulatorAmountList: [],
      RegulatorNameList: [],
      RegulatorTypeList: [],
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
        regulatorTypeId: null,
        regulatorType: null,
        regulatorNameId: null,
        regulatorName: null,
        content: null,
        originCompany: null,
        storageAmount: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        regulatorTypeId: [
          { required: true, message: "调节剂类型不能为空", trigger: "change" },
        ],
        regulatorNameId: [
          { required: true, message: "调节剂名称不能为空", trigger: "change" },
        ],
        content: [
          { required: true, message: "有效含量不能为空", trigger: "change" },
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
    Promise.all([this.getRegulatorNames(), this.getRegulatorTypes()]).then(
      (res) => {
        this.getList();
      }
    );
  },
  methods: {
    //查询种类
    getRegulatorTypes() {
      return new Promise((resolve, rejected) => {
        listRegulatorType().then((response) => {
          this.RegulatorTypeList = response.rows;
          resolve();
        });
      });
    },
    //查询类型
    getRegulatorNames() {
      return new Promise((resolve, rejected) => {
        listRegulatorName().then((response) => {
          this.RegulatorNameList = response.rows;
          resolve();
        });
      });
    },
    /** 查询调节剂量列表 */
    getList() {
      this.loading = true;
      listRegulatorAmount(this.queryParams).then((response) => {
        this.regulatorAmountList = response.rows;
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
        regulatorAmountId: null,
        regulatorTypeId: null,
        regulatorNameId: null,
        content: null,
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
      this.ids = selection.map((item) => item.regulatorAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加调节剂量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const regulatorAmountId = row.regulatorAmountId || this.ids;
      getRegulatorAmount(regulatorAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改调节剂量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.regulatorAmountId != null) {
            updateRegulatorAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRegulatorAmount(this.form).then((response) => {
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
      const regulatorAmountIds = row.regulatorAmountId || this.ids;
      this.$confirm("是否确认删除该调节剂量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delRegulatorAmount(regulatorAmountIds);
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
        for (let i = 0; i < this.regulatorAmountList.length; i++) {
          queryParams.exportIds.push(this.regulatorAmountList[i].regulatorAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有调节剂量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportRegulatorAmount(queryParams);
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
