<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="蔬菜类型" prop="cropTypeId">
        <el-input
          v-model="queryParams.cropTypeId"
          placeholder="请输入蔬菜类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="种子类型：接穗 | 砧木" prop="seedType">
        <el-select v-model="queryParams.seedType" placeholder="请选择种子类型：接穗 | 砧木" clearable size="small">
          <el-option label="请选择字典生成" value="" />
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

      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过" prop="approvalStatusProduct">
        <el-input
          v-model="queryParams.approvalStatusProduct"
          placeholder="请输入生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过" prop="approvalStatusTechnology">
        <el-input
          v-model="queryParams.approvalStatusTechnology"
          placeholder="请输入技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领用状态：未领用 | 已领用" prop="consumeStatus">
        <el-select v-model="queryParams.consumeStatus" placeholder="请选择领用状态：未领用 | 已领用" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['system:temporary:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:temporary:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:temporary:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['system:temporary:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="temporaryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="种子类型：接穗 | 砧木" align="center" prop="seedType" />
      <el-table-column label="品种名称" align="center" prop="varietyName" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column label="申请时间" align="center" prop="applyTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="userId" />
      <el-table-column label="生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过" align="center" prop="approvalStatusProduct" />
      <el-table-column label="技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过" align="center" prop="approvalStatusTechnology" />
      <el-table-column label="领用状态：未领用 | 已领用" align="center" prop="consumeStatus" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:temporary:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:temporary:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改种子临时申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="蔬菜类型" prop="cropTypeId">
          <el-input v-model="form.cropTypeId" placeholder="请输入蔬菜类型" />
        </el-form-item>
        <el-form-item label="种子类型：接穗 | 砧木" prop="seedType">
          <el-select v-model="form.seedType" placeholder="请选择种子类型：接穗 | 砧木">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="品种名称" prop="varietyName">
          <el-input v-model="form.varietyName" placeholder="请输入品种名称" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model.number="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker clearable size="small"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过" prop="approvalStatusProduct">
          <el-input v-model="form.approvalStatusProduct" placeholder="请输入生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过" />
        </el-form-item>
        <el-form-item label="技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过" prop="approvalStatusTechnology">
          <el-input v-model="form.approvalStatusTechnology" placeholder="请输入技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过" />
        </el-form-item>
        <el-form-item label="领用状态：未领用 | 已领用">
          <el-radio-group v-model="form.consumeStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listTemporary, getTemporary, delTemporary, addTemporary, updateTemporary, exportTemporary } from "@/api/production/seed/temporary";

export default {
  name: "Temporary",
  components: {
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
      // 种子临时申请表格数据
      temporaryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" }
        ],
        seedType: [
          { required: true, message: "种子类型：接穗 | 砧木不能为空", trigger: "change" }
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" }
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          { type:'number',message:'申请量必须为数字'}
        ],
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "申请人不能为空", trigger: "blur" }
        ],
        approvalStatusProduct: [
          { required: true, message: "生产厂长审批状态：0表示申请，1表示审批通过，2表示不通过不能为空", trigger: "blur" }
        ],
        approvalStatusTechnology: [
          { required: true, message: "技术厂长审批状态：0表示申请，1表示审批通过，2表示不通过不能为空", trigger: "blur" }
        ],
        consumeStatus: [
          { required: true, message: "领用状态：未领用 | 已领用不能为空", trigger: "blur" }
        ],
        createBy: [
          { required: true, message: "创建者不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询种子临时申请列表 */
    getList() {
      this.loading = true;
      listTemporary(this.queryParams).then(response => {
        this.temporaryList = response.rows;
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
        seedApplyTemporaryId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.ids = selection.map(item => item.seedApplyTemporaryId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加种子临时申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const seedApplyTemporaryId = row.seedApplyTemporaryId || this.ids
      getTemporary(seedApplyTemporaryId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改种子临时申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.seedApplyTemporaryId != null) {
            updateTemporary(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemporary(this.form).then(response => {
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
      const seedApplyTemporaryIds = row.seedApplyTemporaryId || this.ids;
      this.$confirm('是否确认删除种子临时申请?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTemporary(seedApplyTemporaryIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有种子临时申请数据项?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportTemporary(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
