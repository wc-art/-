<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="片区名称 不能重复" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入片区名称 不能重复"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大棚名称 不能重复" prop="greenhouseName">
        <el-input
          v-model="queryParams.greenhouseName"
          placeholder="请输入大棚名称 不能重复"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号主码，20210621001这种格式编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号主码，20210621001这种格式编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单名称" prop="orderName">
        <el-input
          v-model="queryParams.orderName"
          placeholder="请输入订单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="cropType">
        <el-select v-model="queryParams.cropType" placeholder="请选择类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="seedlingType">
        <el-select v-model="queryParams.seedlingType" placeholder="请选择苗类型嫁接苗 | 实生苗" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="stockseedingTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.stockseedingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择苗类型嫁接苗 | 实生苗">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="scionseedingTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.scionseedingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择苗类型嫁接苗 | 实生苗">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="ssmseedingTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.ssmseedingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择苗类型嫁接苗 | 实生苗">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="graftingTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.graftingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择苗类型嫁接苗 | 实生苗">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划数量" prop="planAmount">
        <el-input
          v-model="queryParams.planAmount"
          placeholder="请输入计划数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="actualAmount">
        <el-input
          v-model="queryParams.actualAmount"
          placeholder="请输入数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计出圃日期" prop="planDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.planDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择预计出圃日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出圃时间" prop="actualDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.actualDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择出圃时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="公司名称" prop="actualCompanyName">
        <el-input
          v-model="queryParams.actualCompanyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入单价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总价" prop="totalPrice">
        <el-input
          v-model="queryParams.totalPrice"
          placeholder="请输入总价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['form:greenhouse:add']"
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
          v-hasPermi="['form:greenhouse:edit']"
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
          v-hasPermi="['form:greenhouse:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
        >导出</el-button>
      </el-col>
<!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="greenhouseList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="片区名称" align="center" prop="areaName" />
      <el-table-column label="大棚名称" align="center" prop="greenhouseName" />
      <el-table-column label="订单编号" align="center" prop="orderId" width="110" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="原始公司名称" align="center" prop="companyName" />
      <el-table-column label="类型" align="center" prop="cropType" />
      <el-table-column label="苗类型" align="center" prop="seedlingType" />
      <el-table-column label="砧木播种时间" align="center" prop="stockseedingTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.stockseedingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接穗播种时间" align="center" prop="scionseedingTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.scionseedingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实生苗播种时间" align="center" prop="ssmseedingTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ssmseedingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="嫁接时间" align="center" prop="graftingTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.graftingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划出圃数量" align="center" prop="planAmount" />
      <el-table-column label="实际出圃数量" align="center" prop="actualAmount" />
      <el-table-column label="计划出圃日期" align="center" prop="planDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.planDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际出圃日期" align="center" prop="actualDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.actualDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际公司名称" align="center" prop="actualCompanyName" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['form:greenhouse:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['form:greenhouse:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改VIEW对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="片区名称 不能重复" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入片区名称 不能重复" />
        </el-form-item>
        <el-form-item label="大棚名称 不能重复" prop="greenhouseName">
          <el-input v-model="form.greenhouseName" placeholder="请输入大棚名称 不能重复" />
        </el-form-item>
        <el-form-item label="订单编号主码，20210621001这种格式编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单编号主码，20210621001这种格式编号" />
        </el-form-item>
        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model="form.orderName" placeholder="请输入订单名称" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="类型" prop="cropType">
          <el-select v-model="form.cropType" placeholder="请选择类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="苗类型嫁接苗 | 实生苗" prop="seedlingType">
          <el-select v-model="form.seedlingType" placeholder="请选择苗类型嫁接苗 | 实生苗">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="苗类型嫁接苗 | 实生苗" prop="stockseedingTime">
          <el-date-picker clearable size="small"
            v-model="form.stockseedingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择苗类型嫁接苗 | 实生苗">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="苗类型嫁接苗 | 实生苗" prop="scionseedingTime">
          <el-date-picker clearable size="small"
            v-model="form.scionseedingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择苗类型嫁接苗 | 实生苗">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="苗类型嫁接苗 | 实生苗" prop="ssmseedingTime">
          <el-date-picker clearable size="small"
            v-model="form.ssmseedingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择苗类型嫁接苗 | 实生苗">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="苗类型嫁接苗 | 实生苗" prop="graftingTime">
          <el-date-picker clearable size="small"
            v-model="form.graftingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择苗类型嫁接苗 | 实生苗">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划数量" prop="planAmount">
          <el-input v-model="form.planAmount" placeholder="请输入计划数量" />
        </el-form-item>
        <el-form-item label="数量" prop="actualAmount">
          <el-input v-model="form.actualAmount" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="预计出圃日期" prop="planDate">
          <el-date-picker clearable size="small"
            v-model="form.planDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预计出圃日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出圃时间" prop="actualDate">
          <el-date-picker clearable size="small"
            v-model="form.actualDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出圃时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公司名称" prop="actualCompanyName">
          <el-input v-model="form.actualCompanyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入总价" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
  import { listGreenhouse, getGreenhouse, delGreenhouse, addGreenhouse, updateGreenhouse, exportGreenhouse } from "@/api/form/greenhouse";

  export default {
    name: "Greenhouse",
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
        // VIEW表格数据
        greenhouseList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          areaName: null,
          greenhouseName: null,
          orderId: null,
          orderName: null,
          companyName: null,
          cropType: null,
          seedlingType: null,
          stockseedingTime: null,
          scionseedingTime: null,
          ssmseedingTime: null,
          graftingTime: null,
          planAmount: null,
          actualAmount: null,
          planDate: null,
          actualDate: null,
          actualCompanyName: null,
          price: null,
          totalPrice: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          areaName: [
            { required: true, message: "片区名称 不能重复不能为空", trigger: "blur" }
          ],
          greenhouseName: [
            { required: true, message: "大棚名称 不能重复不能为空", trigger: "blur" }
          ],
          orderId: [
            { required: true, message: "订单编号主码，20210621001这种格式编号不能为空", trigger: "blur" }
          ],
          orderName: [
            { required: true, message: "订单名称不能为空", trigger: "blur" }
          ],
          companyName: [
            { required: true, message: "公司名称不能为空", trigger: "blur" }
          ],
          cropType: [
            { required: true, message: "类型不能为空", trigger: "change" }
          ],
          seedlingType: [
            { required: true, message: "苗类型嫁接苗 | 实生苗不能为空", trigger: "change" }
          ],
          stockseedingTime: [
            { required: true, message: "苗类型嫁接苗 | 实生苗不能为空", trigger: "blur" }
          ],
          scionseedingTime: [
            { required: true, message: "苗类型嫁接苗 | 实生苗不能为空", trigger: "blur" }
          ],
          ssmseedingTime: [
            { required: true, message: "苗类型嫁接苗 | 实生苗不能为空", trigger: "blur" }
          ],
          graftingTime: [
            { required: true, message: "苗类型嫁接苗 | 实生苗不能为空", trigger: "blur" }
          ],
          planAmount: [
            { required: true, message: "计划数量不能为空", trigger: "blur" }
          ],
          actualAmount: [
            { required: true, message: "数量不能为空", trigger: "blur" }
          ],
          planDate: [
            { required: true, message: "预计出圃日期不能为空", trigger: "blur" }
          ],
          actualDate: [
            { required: true, message: "出圃时间不能为空", trigger: "blur" }
          ],
          actualCompanyName: [
            { required: true, message: "公司名称不能为空", trigger: "blur" }
          ],
          price: [
            { required: true, message: "单价不能为空", trigger: "blur" }
          ],
          totalPrice: [
            { required: true, message: "总价不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询VIEW列表 */
      getList() {
        this.loading = true;
        listGreenhouse(this.queryParams).then(response => {
          this.greenhouseList = response.rows;
          console.log(this.greenhouseList)
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
          areaName: null,
          greenhouseName: null,
          orderId: null,
          orderName: null,
          companyName: null,
          cropType: null,
          seedlingType: null,
          stockseedingTime: null,
          scionseedingTime: null,
          ssmseedingTime: null,
          graftingTime: null,
          planAmount: null,
          actualAmount: null,
          planDate: null,
          actualDate: null,
          actualCompanyName: null,
          price: null,
          totalPrice: null
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
        this.ids = selection.map(item => item.areaName)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加VIEW";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const areaName = row.areaName || this.ids
        getGreenhouse(areaName).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改VIEW";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.areaName != null) {
              updateGreenhouse(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addGreenhouse(this.form).then(response => {
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
        const areaNames = row.areaName || this.ids;
        this.$confirm('是否确认删除"' + areaNames + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delGreenhouse(areaNames);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.exportLoading = true;
            return exportGreenhouse(queryParams);
          }).then(response => {
            this.download(response.msg);
            this.exportLoading = false;
          }).catch(() => {});
      }

    }
  };
</script>
