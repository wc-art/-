<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="类型" prop="graftingclipTypeId">
        <el-select
          v-model="queryParams.graftingclipTypeId"
          placeholder="请选择类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in graftingclipTypeList"
            :key="dict.graftingclipTypeId"
            :label="dict.graftingclipType"
            :value="dict.graftingclipTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="originPlace">
        <el-select
          v-model="queryParams.originPlace"
          placeholder="请选择产地"
          clearable
          size="small"
        >
          <el-option label="国产" value="国产"></el-option>
          <el-option label="进口" value="进口"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="口径型号" prop="graftingclipSpecification">
        <el-input
          v-model="queryParams.graftingclipSpecification"
          placeholder="请输入口径型号"
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
          v-hasPermi="['production:graftingclipAmount:add']"
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
          v-hasPermi="['production:graftingclipAmount:edit']"
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
          v-hasPermi="['production:graftingclipAmount:remove']"
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
          v-hasPermi="['production:graftingclipAmount:export']"
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
      :data="graftingclipAmountList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="graftingclipTypeId">
        <template slot-scope="scope">
          <span>{{
            graftingclipTypeList.filter(
              (item) => item.graftingclipTypeId == scope.row.graftingclipTypeId
            )[0].graftingclipType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column
        label="口径型号"
        align="center"
        prop="graftingclipSpecification"
      />
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
            v-hasPermi="['production:graftingclipAmount:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:graftingclipAmount:remove']"
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

    <!-- 添加或修改嫁接夹量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="graftingclipTypeId">
          <el-select v-model="form.graftingclipTypeId" placeholder="请选择类型">
            <el-option
              v-for="dict in graftingclipTypeList"
              :key="dict.graftingclipTypeId"
              :label="dict.graftingclipType"
              :value="dict.graftingclipTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产地" prop="originPlace">
          <el-select v-model="form.originPlace" placeholder="请选择产地">
            <el-option label="国产" value="国产"></el-option>
            <el-option label="进口" value="进口"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口径型号" prop="graftingclipSpecification">
          <el-input
            v-model="form.graftingclipSpecification"
            placeholder="请输入口径型号"
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
  listGraftingclipType,
  listGraftingclipAmount,
  getGraftingclipAmount,
  delGraftingclipAmount,
  addGraftingclipAmount,
  updateGraftingclipAmount,
  exportGraftingclipAmount,
} from "@/api/production/graftingclip/graftingclipAmount";

export default {
  name: "GraftingclipAmount",
  components: {},
  data() {
    return {
      //产地类型
      placetypelist: {
        0: "国产",
        1: "进口",
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
      // 嫁接夹量表格数据
      graftingclipAmountList: [],
      // 嫁接夹类型表格数据
      graftingclipTypeList: [],
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
        graftingclipTypeId: null,
        originPlace: null,
        graftingclipSpecification: null,
        originCompany: null,
        storageAmount: null,
      },
      // 查询参数
      graftingcliptype: {
        pageNum: 1,
        pageSize: 10,
        graftingclipType: null,
        graftingclipTypeId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        graftingclipTypeId: [
          { required: true, message: "类型不能为空", trigger: "change" },
        ],
        originPlace: [
          { required: true, message: "产地不能为空", trigger: "change" },
        ],
        graftingclipSpecification: [
          { required: true, message: "口径型号不能为空", trigger: "change" },
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
    /** 查询嫁接夹类型列表 */
    typegetList() {
      return new Promise((resolve, rejected) => {
        this.loading = true;
        listGraftingclipType(this.graftingcliptype).then((response) => {
          this.graftingclipTypeList = response.rows;
          this.total = response.total;
          this.loading = false;
          resolve();
        });
      });
    },

    /** 查询嫁接夹量列表 */
    getList() {
      this.loading = true;
      listGraftingclipAmount(this.queryParams).then((response) => {
        this.graftingclipAmountList = response.rows;
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
        graftingclipAmountId: null,
        graftingclipTypeId: null,
        originPlace: null,
        graftingclipSpecification: null,
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
      this.ids = selection.map((item) => item.graftingclipAmountId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加嫁接夹量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const graftingclipAmountId = row.graftingclipAmountId || this.ids;
      getGraftingclipAmount(graftingclipAmountId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改嫁接夹量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.graftingclipAmountId != null) {
            updateGraftingclipAmount(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGraftingclipAmount(this.form).then((response) => {
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
      const graftingclipAmountIds = row.graftingclipAmountId || this.ids;
      this.$confirm("是否确认删除该嫁接夹量?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delGraftingclipAmount(graftingclipAmountIds);
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
        for (let i = 0; i < this.graftingclipAmountList.length; i++) {
          queryParams.exportIds.push(this.graftingclipAmountList[i].graftingclipAmountId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出嫁接夹量数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportGraftingclipAmount(queryParams);
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
