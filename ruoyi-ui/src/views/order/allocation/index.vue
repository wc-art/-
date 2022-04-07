<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="片区编号 外码" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入片区编号 外码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大棚编号 外码" prop="greenhouseId">
        <el-input
          v-model="queryParams.greenhouseId"
          placeholder="请输入大棚编号 外码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号 外码" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号 外码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蔬菜类型编号 外码" prop="cropTypeId">
        <el-input
          v-model="queryParams.cropTypeId"
          placeholder="请输入蔬菜类型编号 外码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="苗类型 嫁接苗|实生苗" prop="seedlingType">
        <el-select v-model="queryParams.seedlingType" placeholder="请选择苗类型 嫁接苗|实生苗" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="砧木品种 实生苗不需要填写砧木" prop="stockBreed">
        <el-input
          v-model="queryParams.stockBreed"
          placeholder="请输入砧木品种 实生苗不需要填写砧木"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接穗品种" prop="scionBreed">
        <el-input
          v-model="queryParams.scionBreed"
          placeholder="请输入接穗品种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划数量" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入计划数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所占面积" prop="acreage">
        <el-input
          v-model="queryParams.acreage"
          placeholder="请输入所占面积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="queryParams.unit"
          placeholder="请输入单位"
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

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['order:allocation:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:allocation:edit']"
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
          v-hasPermi="['system:allocation:remove']"
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
          v-hasPermi="['system:allocation:export']"
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
      :data="allocationList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <!--      <el-table-column label="订单分配号" align="center" prop="orderAllocationId" />-->
      <el-table-column label="片区名称" align="center" prop="area" />
      <el-table-column label="大棚名称" align="center" prop="greenhouse" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="苗类型" align="center" prop="seedlingType" />
      <el-table-column label="砧木品种" align="center" prop="stockBreed" />
      <el-table-column label="接穗品种" align="center" prop="scionBreed" />
      <el-table-column label="计划数量" align="center" prop="amount" />
      <el-table-column label="所占面积" align="center" prop="acreage" />
      <el-table-column label="单位" align="center" prop="unit" />
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
            v-hasPermi="['system:allocation:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:allocation:remove']"
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

    <!-- 添加或修改订单分配对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="片区名称" prop="areaId">
          <el-select
            v-model="form.areaId"
            placeholder="请选择片区名称"
            @change="selectgreenhouse"
          >
            <el-option
              v-for="(area, index) in areaName"
              :key="index"
              :label="area.areaName"
              :value="area.areaId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大棚名称" prop="greenhouseId">
          <!-- <el-input v-model="form.greenhouseId" placeholder="请输入大棚编号" /> -->
          <el-select
            v-model="form.greenhouseId"
            placeholder="请选择大棚名称"
            size="small"
          >
            <el-option
              v-for="(greenhouse, index) in greenhouseName"
              :key="index"
              :label="greenhouse.greenhouseName"
              :value="greenhouse.greenhouseId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号" prop="orderId">
          <el-select
            v-model="form.orderId"
            placeholder="请选择订单名称"
            clearable
            size="small"
          >
            <el-option
              v-for="ID in order_ID"
              :key="ID.orderId"
              :value="ID.orderId"
              :label="ID.orderId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蔬菜类型" prop="cropTypeId">
          <!-- <el-input v-model="form.cropTypeId" placeholder="请输入蔬菜类型编号" /> -->
          <el-select
            v-model="form.cropTypeId"
            placeholder="请选择蔬菜类型"
            size="small"
          >
            <el-option
              v-for="(crop, index) in cropType"
              :key="index"
              :label="crop.cropTypeName"
              :value="crop.cropTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="苗类型" prop="seedlingType">
          <el-select v-model="form.seedlingType" placeholder="请选择苗类型">
            <el-option label="嫁接苗" value="嫁接苗" />
            <el-option label="实生苗" value="实生苗" />
          </el-select>
        </el-form-item>
        <el-form-item label="砧木品种" prop="stockBreed">
          <el-input v-model="form.stockBreed" placeholder="请输入砧木品种" />
        </el-form-item>
        <el-form-item label="接穗品种" prop="scionBreed">
          <el-input v-model="form.scionBreed" placeholder="请输入接穗品种" />
        </el-form-item>
        <el-form-item label="计划数量" prop="amount">
          <el-input v-model.number="form.amount" placeholder="请输入计划数量" />
        </el-form-item>
        <el-form-item label="所占面积" prop="acreage">
          <el-input v-model="form.acreage" placeholder="请输入所占面积" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
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
  listAllocation,
  getAllocation,
  delAllocation,
  addAllocation,
  updateAllocation,
  exportAllocation,
} from "@/api/order/allocation";
import { listOrder } from "@/api/order/order";
import { listArea } from "@/api/order/area";
import { listGreenhouse } from "@/api/order/greenhouse";
import { listCropType } from "@/api/production/seed/cropType";
export default {
  name: "Allocation",
  components: {},
  data() {
    return {
      order_ID: [],
      areaName: [],
      greenhouseName: [],
      cropType: [],
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
      // 订单分配表格数据
      allocationList: [],
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
        areaId: null,
        greenhouseId: null,
        orderId: null,
        cropTypeId: null,
        seedlingType: null,
        stockBreed: null,
        scionBreed: null,
        amount: null,
        acreage: null,
        unit: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        areaId: [
          { required: true, message: "片区编号不能为空", trigger: "blur" },
        ],
        greenhouseId: [
          { required: true, message: "大棚编号不能为空", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" },
        ],
        seedlingType: [
          { required: true, message: "苗类型不能为空", trigger: "change" },
        ],
        amount: [
          { required: true, message: "计划数量不能为空", trigger: "blur" },
        ],
        acreage: [
          { required: true, message: "所占面积不能为空", trigger: "blur" },
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
        unit: [{ required: true, message: "单位不能为空", trigger: "blur" }],
        // createBy: [
        //   { required: true, message: "创建者不能为空", trigger: "blur" }
        // ],
        // createTime: [
        //   { required: true, message: "创建时间不能为空", trigger: "blur" }
        // ],
        // updateBy: [
        //   { required: true, message: "更新者不能为空", trigger: "blur" }
        // ],
      },
    };
  },
  created() {
    this.getAreaList();
    this.getorderID();
    this.getGreenhouseList();
    this.getCropList();
    this.getList();
  },
  methods: {
    //查询订单，取订单编号
    getorderID() {
      listOrder().then((response) => {
        this.order_ID = response.rows;
      });
    },

    /** 查询订单分配列表 */
    getList() {
      this.loading = true;
      listAllocation(this.queryParams).then((response) => {
        this.allocationList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log("this.allocationList", this.allocationList);
      });
    },
    // 获取片区信息
    getAreaList() {
      listArea().then((res) => {
        // console.log(res.rows);
        let data = res.rows;
        data.forEach((area) => {
          this.areaName.push({ areaId: area.areaId, areaName: area.areaName });
        });
        console.log("areaName列表", this.areaName);
      });
    },
    // 获取大棚信息
    getGreenhouseList() {
      listGreenhouse().then((res) => {
        // console.log(res.rows);
        let datas = res.rows;
        datas.forEach((greenhouse) => {
          this.greenhouseName.push({
            greenhouseName: greenhouse.greenhouseName,
            greenhouseId: greenhouse.greenhouseId,
          });
        });
        console.log("this.greenhouseName", this.greenhouseName);
      });
    },
    //根据片区选大棚
    selectgreenhouse(value) {
      console.log("value:", value);
      this.greenhouseName = [];
      listGreenhouse().then((response) => {
        for (let j = 0; j < response.rows.length; j++) {
          console.log("response.rows[].areaId:", response.rows[j].areaId);
          if (response.rows[j].areaId == value) {
            console.log("匹配到的greenhouseId:", response.rows[j].greenhouseId);
            this.greenhouseName.push({
              greenhouseName: response.rows[j].greenhouseName,
              greenhouseId: response.rows[j].greenhouseId,
            });
            console.log("this.greenhouseName", this.greenhouseName);
          }
        }
      });
    },

    // 获取蔬菜类型信息
    getCropList() {
      listCropType().then((res) => {
        // console.log(res.rows);
        let dating = res.rows;
        dating.forEach((crop) => {
          // console.log(crop);
          this.cropType.push({
            cropTypeName: crop.cropType,
            cropTypeId: crop.cropTypeId,
          });
        });
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
        orderAllocationId: null,
        areaId: null,
        greenhouseId: null,
        orderId: null,
        cropTypeId: null,
        seedlingType: null,
        stockBreed: null,
        scionBreed: null,
        amount: null,
        acreage: null,
        unit: null,
        // createBy: null,
        // createTime: null,
        // updateBy: null,
        // updateTime: null
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
      this.ids = selection.map((item) => item.orderAllocationId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单分配";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderAllocationId = row.orderAllocationId || this.ids;
      getAllocation(orderAllocationId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单分配";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.orderAllocationId != null) {
            updateAllocation(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAllocation(this.form).then((response) => {
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
      const orderAllocationIds = row.orderAllocationId || this.ids;
      this.$confirm(
        '是否确认删除订单名称为"' + orderAllocationIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delAllocation(orderAllocationIds);
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
        for (let i = 0; i < this.orderList.length; i++) {
          queryParams.exportIds.push(this.orderList[i].orderAllocationId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有订单分配数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportAllocation(queryParams);
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
