<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="穴盘类型" prop="plugTypeId">
        <el-select
          v-model="queryParams.plugTypeId"
          placeholder="请选择穴盘类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="dict in plug_type"
            :key="dict.plugTypeId"
            :label="dict.plugType"
            :value="dict.plugTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="originPlace">
        <el-select
          v-model="queryParams.originPlace"
          placeholder="请选择产地"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        >
          <el-option label="国产" value="国产"></el-option>
          <el-option label="进口" value="进口"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="穴盘品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入穴盘品牌"
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
          v-hasPermi="['production:plugPurchase:add']"
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
          v-hasPermi="['production:plugPurchase:edit']"
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
          v-hasPermi="['production:plugPurchase:remove']"
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
          v-hasPermi="['production:plugPurchase:export']"
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
      :data="plugPurchaseList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="plugTypeId">
        <template slot-scope="scope">
          <span>{{
            plug_type.filter(
              (item) => item.plugTypeId == scope.row.plugTypeId
            )[0].plugType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column label="穴盘品牌" align="center" prop="brand" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="购买量（个）"
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
            v-hasPermi="['production:plugPurchase:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['production:plugPurchase:remove']"
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

    <!-- 添加或修改穴盘购买信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="plugTypeId">
          <el-select
            v-model="form.plugTypeId"
            placeholder="请选择穴盘类型"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in plug_type"
              :key="dict.plugTypeId"
              :label="dict.plugType"
              :value="dict.plugTypeId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="产地" prop="originPlace">
          <el-select
            v-model="form.originPlace"
            placeholder="请选择产地"
            clearable
            size="small"
          >
            <el-option label="国产" value="国产"></el-option>
            <el-option label="进口" value="进口"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="穴盘品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入穴盘品牌" />
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
  listPlugType,
  listPlugPurchase,
  getPlugPurchase,
  delPlugPurchase,
  addPlugPurchase,
  updatePlugPurchase,
  exportPlugPurchase,
} from "@/api/production/plug/plugPurchase";

export default {
  name: "PlugPurchase",
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
      // 穴盘购买信息表格数据
      plugPurchaseList: [],
      // 穴盘类型表格数据
      plug_type: [],
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
        plugTypeId: null,
        originPlace: null,
        brand: null,
        originCompany: null,
        purchaseAmount: null,
        purchaseTime: null,
        price: null,
        totalPrice: null,
        note: null,
      },
      // 表单参数
      form: {},
      // 查询参数
      plugtype: {
        pageNum: 1,
        pageSize: 10,
        plugType: null,
        plugTypeId: null,
      },
      // 表单校验
      rules: {
        plugTypeId: [
          { required: true, message: "类型外码不能为空", trigger: "blur" },
        ],
        originPlace: [
          { required: true, message: "产地不能为空", trigger: "blur" },
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
        brand: [{ required: true, message: "品牌不能为空", trigger: "blur" }],
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
    Promise.all([this.getPlugTypes()]).then((res) => {
      this.getList();
    });
  },
  methods: {
    //查询种类
    getPlugTypes() {
      return new Promise((resolve, rejected) => {
        listPlugType().then((response) => {
          this.plug_type = response.rows;
          resolve();
        });
      });
    },
    /** 查询穴盘购买信息列表 */
    getList() {
      this.loading = true;
      listPlugPurchase(this.queryParams).then((response) => {
        this.plugPurchaseList = response.rows;
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
        plugPurchaseId: null,
        plugTypeId: null,
        originPlace: null,
        brand: null,
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
      this.ids = selection.map((item) => item.plugPurchaseId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加穴盘购买信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const plugPurchaseId = row.plugPurchaseId || this.ids;
      getPlugPurchase(plugPurchaseId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改穴盘购买信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.plugPurchaseId != null) {
            updatePlugPurchase(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlugPurchase(this.form).then((response) => {
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
      const plugPurchaseIds = row.plugPurchaseId || this.ids;
      this.$confirm("是否确认删除该穴盘购买信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delPlugPurchase(plugPurchaseIds);
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
        for (let i = 0; i < this.plugPurchaseList.length; i++) {
          queryParams.exportIds.push(this.plugPurchaseList[i].plugPurchaseId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出穴盘购买信息数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportPlugPurchase(queryParams);
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
