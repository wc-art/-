<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="订单名称" prop="orderName">
        <el-input
          v-model="queryParams.orderName"
          placeholder="请输入订单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户公司名称" prop="customerId" label-width="100px">
        <!-- <el-input v-model="form.customerId" placeholder="请输入客户编号" /> -->
        <el-select
          v-model="queryParams.customerId"
          placeholder="请选择客户公司名称"
          clearable
          size="small"
        >
          <el-option
            v-for="(customer, index) in customerName"
            :key="index"
            :label="customer.customerName"
            :value="customer.customerId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="蔬菜类型编号" prop="cropTypeId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.cropTypeId"-->
      <!--          placeholder="请输入蔬菜类型编号"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="苗类型嫁接苗 | 实生苗" prop="seedlingType">-->
      <!--        <el-select v-model="queryParams.seedlingType" placeholder="请选择苗类型嫁接苗 | 实生苗" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="砧木品种 实生苗不需要填写砧木" prop="stockBreed">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.stockBreed"-->
      <!--          placeholder="请输入砧木品种 实生苗不需要填写砧木"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="接穗品种" prop="scionBreed">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.scionBreed"-->
      <!--          placeholder="请输入接穗品种"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="接单日期" prop="receiveorderDate">-->
      <!--        <el-date-picker clearable size="small"-->
      <!--          v-model="queryParams.receiveorderDate"-->
      <!--          type="date"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          placeholder="选择接单日期">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="预计出圃日期" prop="deliveryDate">-->
      <!--        <el-date-picker clearable size="small"-->
      <!--          v-model="queryParams.deliveryDate"-->
      <!--          type="date"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          placeholder="选择预计出圃日期">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="订单数量" prop="orderAmount">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.orderAmount"-->
      <!--          placeholder="请输入订单数量"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="合同单价" prop="contractPrice">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.contractPrice"-->
      <!--          placeholder="请输入合同单价"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="订单类型 代育加工 | 全部委托" prop="orderType">-->
      <!--        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型 代育加工 | 全部委托" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="订单状态 接单 | 实施中 | 完成" prop="status">-->
      <!--        <el-select v-model="queryParams.status" placeholder="请选择订单状态 接单 | 实施中 | 完成" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item>-->
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
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          v-hasPermi="['system:order:add']"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['order:order:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:order:remove']"
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
          v-hasPermi="['system:order:export']"
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
      :data="orderList"
      @selection-change="handleSelectionChange"
      :cell-style="cellStyle"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <!--      <el-table-column label="订单编号" align="center" prop="orderId" width="110"/>-->
      <el-table-column
        label="订单名称"
        align="center"
        prop="orderName"
        width="100"
      />
      <el-table-column label="客户联系人" align="center" prop="customer" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="苗类型" align="center" prop="seedlingType" />
      <el-table-column label="砧木品种" align="center" prop="stockBreed" />
      <el-table-column label="接穗品种" align="center" prop="scionBreed" />
      <el-table-column
        label="接单日期"
        align="center"
        prop="receiveorderDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.receiveorderDate, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预计出圃日期"
        align="center"
        prop="deliveryDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单数量（株）"
        align="center"
        prop="orderAmount"
      />
      <el-table-column
        label="合同单价（元/株）"
        align="center"
        prop="contractPrice"
      />
      <el-table-column
        label="优惠总价（万元）"
        align="center"
        prop="salePrices"
      />
      <el-table-column label="订单要求" align="center" prop="requirement" />
      <el-table-column label="订单类型" align="center" prop="orderType" />
      <el-table-column label="订单状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['order:order:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:order:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="订单分配" align="center" width="90">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-hasPermi="['system:allocation:add']"
            @click="handleAllocationAdd(scope.row)"
            >订单分配</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="订单实施" align="center" width="90">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-hasPermi="['system:fulfillment:add']"
            @click="handleFulfillmentAdd(scope.row)"
            >实施安排</el-button
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

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input
            v-model="form.orderId"
            placeholder="请输入订单编号 类似20210621001这种格式编号"
          />
        </el-form-item>
        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model="form.orderName" placeholder="请输入订单名称" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerId">
          <!-- <el-input v-model="form.customerId" placeholder="请输入客户编号" /> -->
          <el-select
            v-model="form.customerId"
            placeholder="请选择客户名称"
            size="small"
          >
            <el-option
              v-for="(customer, index) in customerName"
              :key="index"
              :label="customer.customerName"
              :value="customer.customerId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蔬菜类型" prop="cropTypeId">
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
          <el-select
            v-model="form.seedlingType"
            placeholder="请选择苗类型"
            @change="setflag"
          >
            <el-option label="嫁接苗" value="嫁接苗" />
            <el-option label="实生苗" value="实生苗" />
          </el-select>
        </el-form-item>
        <el-form-item label="砧木品种" prop="stockBreed" v-if="this.flag != 1">
          <el-input v-model="form.stockBreed" placeholder="请输入砧木品种" />
        </el-form-item>
        <el-form-item label="品种" prop="scionBreed" v-if="this.flag == 1">
          <el-input v-model="form.scionBreed" placeholder="请输入接穗品种" />
        </el-form-item>
        <el-form-item label="接穗品种" prop="scionBreed" v-if="this.flag != 1">
          <el-input v-model="form.scionBreed" placeholder="请输入接穗品种" />
        </el-form-item>
        <el-form-item label="接单日期" prop="receiveorderDate">
          <el-date-picker
            clearable
            size="small"
            v-model="form.receiveorderDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择接单日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="预计出圃日期"
          prop="deliveryDate"
          label-width="107px"
        >
          <el-date-picker
            clearable
            size="small"
            v-model="form.deliveryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预计出圃日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单数量" prop="orderAmount">
          <el-input
            v-model.number="form.orderAmount"
            placeholder="请输入订单数量"
          />
        </el-form-item>
        <el-form-item label="合同单价（元/株）" prop="contractPrice">
          <el-input v-model="form.contractPrice" placeholder="请输入合同单价" />
        </el-form-item>
        <el-form-item label="优惠总价（万元）" prop="salePrices">
          <el-input
            v-model="form.salePrices"
            placeholder="请输入总价"
            v-value="getprice"
          />
          <!--          {{getprice}}-->
        </el-form-item>
        <el-form-item label="订单要求" prop="requirement">
          <el-input
            v-model="form.requirement"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单类型">
            <el-option label="代育加工" value="代育加工" />
            <el-option label="全部委托" value="全部委托" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="接单">接单</el-radio>
            <el-radio label="实施中">实施中</el-radio>
            <el-radio label="完成">完成</el-radio>
          </el-radio-group>
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

    <!-- 添加或修改订单分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openAllocation"
      width="500px"
      append-to-body
    >
      <el-form
        ref="allocationform"
        :model="allocationform"
        :rules="allocationrules"
        label-width="80px"
      >
        <el-form-item label="片区名称" prop="areaId" :required="true">
          <el-select
            v-model="allocationform.areaId"
            placeholder="请选择片区名称"
            size="small"
            @change="selectgreenhouse"
          >
            <el-option
              v-for="(area, index) in areaName"
              :key="index"
              :value="area.areaId"
              :label="area.areaName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大棚名称" prop="greenhouseId" :required="true">
          <el-select
            v-model="allocationform.greenhouseId"
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
        <el-form-item label="订单编号" prop="orderId" :required="true">
          <el-input v-model="allocationform.orderId" readonly />
        </el-form-item>
        <el-form-item label="蔬菜类型" prop="cropTypeId" :required="true">
          <!--          <el-select-->
          <!--            v-model="allocationform.cropTypeId"-->
          <!--            placeholder="请选择蔬菜类型"-->
          <!--            size="small"-->
          <!--          >-->
          <!--            <el-option-->
          <!--              v-for="(crop, index) in cropType"-->
          <!--              :key="index"-->
          <!--              :label="crop.cropTypeName"-->
          <!--              :value="crop.cropTypeId"-->
          <!--            >-->
          <!--            </el-option>-->
          <!--          </el-select>-->
          <el-input
            v-model="allocationform.cropTypeId"
            placeholder="请输入蔬菜类型"
          />
        </el-form-item>
        <el-form-item label="苗类型" prop="seedlingType" :required="true">
          <!--          <el-select-->
          <!--            v-model="allocationform.seedlingType"-->
          <!--            placeholder="请选择苗类型"-->
          <!--          >-->
          <!--            <el-option label="嫁接苗" value="嫁接苗" />-->
          <!--            <el-option label="实生苗" value="实生苗" />-->
          <!--          </el-select>-->
          <el-input
            v-model="allocationform.seedlingType"
            placeholder="请输入苗类型"
          />
        </el-form-item>
        <el-form-item label="砧木品种" prop="stockBreed">
          <el-input
            v-model="allocationform.stockBreed"
            placeholder="请输入砧木品种"
          />
        </el-form-item>
        <el-form-item label="接穗品种" prop="scionBreed">
          <el-input
            v-model.number="allocationform.scionBreed"
            placeholder="请输入接穗品种"
          />
        </el-form-item>
        <el-form-item label="计划数量" prop="amount" :required="true">
          <el-input
            v-model.number="allocationform.amount"
            placeholder="请输入计划数量"
          />
        </el-form-item>
        <el-form-item label="所占面积" prop="acreage">
          <el-input
            v-model="allocationform.acreage"
            placeholder="请输入所占面积"
          />
        </el-form-item>
        <el-form-item label="单位" prop="unit" :required="true">
          <el-input v-model="allocationform.unit" placeholder="请输入单位" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAllocationForm"
          >确 定</el-button
        >
        <el-button @click="cancelAllocation">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改订单任务执行对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openFulfillment"
      width="500px"
      append-to-body
    >
      <el-form
        ref="fulfillmentform"
        :model="fulfillmentform"
        :rules="fulfillmentrules"
        label-width="80px"
      >
        <el-form-item label="订单编号" prop="orderId" :required="true">
          <el-input v-model="fulfillmentform.orderId" readonly />
        </el-form-item>
        <el-form-item label="操作名称" prop="operationId" :required="true">
          <el-select
            v-model="fulfillmentform.operationId"
            placeholder="请选择操作类型"
            size="small"
          >
            <el-option
              v-for="(operation, index) in operationName"
              :key="index"
              :label="operation.operationName"
              :value="operation.operationId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginDate" :required="true">
          <el-date-picker
            clearable
            size="small"
            v-model="fulfillmentform.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate" :required="true">
          <el-date-picker
            clearable
            size="small"
            v-model="fulfillmentform.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="说明" prop="note">
          <el-input
            v-model="fulfillmentform.note"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFulfillmentForm"
          >确 定</el-button
        >
        <el-button @click="cancelFulfillment">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
} from "@/api/order/order";
import { addAllocation } from "@/api/order/allocation";
import { addFulfillment } from "@/api/order/fulfillment";
import { listArea } from "@/api/order/area";
import { listGreenhouse } from "@/api/order/greenhouse";
import { listCropType } from "@/api/production/seed/cropType";
import { listOperation } from "@/api/order/operation";
import { listCustomer } from "@/api/order/customer";

export default {
  name: "Order",
  components: {},
  data() {
    return {
      flag: null,
      customerName: [],
      operationName: [],
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
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示订单分配弹出
      openAllocation: false,
      // 是否显示订单实施弹出
      openFulfillment: false,
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        orderIds: [],
        pageNum: 1,
        pageSize: 10,
        orderName: null,
        customerId: null,
        customerName: null,
        cropTypeId: null,
        seedlingType: null,
        stockBreed: null,
        scionBreed: null,
        receiveorderDate: null,
        deliveryDate: null,
        orderAmount: null,
        contractPrice: null,
        requirement: null,
        orderType: null,
        status: null,
        note: null,
      },
      // 表单参数
      form: {},
      allocationform: {},
      fulfillmentform: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        orderName: [
          { required: true, message: "订单名称不能为空", trigger: "blur" },
        ],
        customerId: [
          { required: true, message: "客户编号不能为空", trigger: "blur" },
        ],
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" },
        ],
        seedlingType: [
          {
            required: true,
            message: "苗类型不能为空",
            trigger: "change",
          },
        ],
        stockBreed: [
          { required: true, message: "砧木品种不能为空", trigger: "blur" },
        ],
        scionBreed: [
          { required: true, message: "接穗品种不能为空", trigger: "blur" },
        ],

        receiveorderDate: [
          { required: true, message: "接单日期不能为空", trigger: "blur" },
        ],
        deliveryDate: [
          { required: true, message: "预计出圃日期不能为空", trigger: "blur" },
        ],
        orderAmount: [
          { required: true, message: "订单数量不能为空", trigger: "blur" },
          { type: "number", message: "订单数量必须为数字" },
        ],
        contractPrice: [
          { required: true, message: "合同单价不能为空", trigger: "blur" },
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
        salePrices: [
          { required: true, message: "优惠总价不能为空", trigger: "blur" },
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
        orderType: [
          {
            required: true,
            message: "订单类型不能为空",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "订单状态不能为空",
            trigger: "blur",
          },
        ],
        createBy: [
          { required: true, message: "创建者不能为空", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        updateBy: [
          { required: true, message: "更新者不能为空", trigger: "blur" },
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" },
        ],
      },
      // 订单分配表单校验
      allocationrules: {
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
          {
            required: true,
            message: "蔬菜类型不能为空",
            trigger: "blur",
          },
        ],
        seedlingType: [
          {
            required: true,
            message: "苗类型不能为空",
            trigger: "change",
          },
        ],
        amount: [
          { required: true, message: "计划数量不能为空", trigger: "blur" },
          { type: "number", message: "计划数量必须为数字" },
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
      },
      // 订单实施表单校验
      fulfillmentrules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        operationId: [
          { required: true, message: "操作名称不能为空", trigger: "blur" },
        ],
        beginDate: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        endDate: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getAreaList();
    // this.getList();
    // this.getGreenhouseList();
    // this.getCropList()
    // this.getOperationList()
    // this.getCustomerList();
    // console.log(this.cropType)

    Promise.all([
      this.getAreaList(),
      this.getGreenhouseList(),
      this.getCropList(),
      this.getOperationList(),
      this.getCustomerList(),
    ]).then((res) => {
      this.getList();
    });
  },
  computed: {
    getprice() {
      if (this.form.contractPrice == null || this.form.orderAmount == null) {
        this.form.salePrices = null;
        return this.form.salePrices;
      }
      //四位小数
      else
        return (this.form.salePrices = (
          Math.round(
            parseFloat(this.form.contractPrice * 10000 * this.form.orderAmount)
          ) / 100000000
        ).toFixed(4));
    },
  },
  methods: {
    setflag() {
      this.flag = undefined;
      if (this.form.seedlingType == "实生苗") {
        this.flag = 1;
      }
    },
    // 表体字体颜色设置
    /***
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.status === "实施中" && columnIndex === 14) {
        return "color: #409EFF";
      }
      if (row.status === "接单" && columnIndex === 14) {
        return "color: #E6A23C";
      }
      if (row.status === "完成" && columnIndex === 14) {
        return "color: #67C23A";
      }
    },

    /** 查询订单列表 */
    getList() {
      this.loading = true;
      // this.getAreaList();
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
        // console.log(this.orderList);
      });
    },
    // 获取客户列表
    getCustomerList() {
      return new Promise((resolve, rejected) => {
        listCustomer().then((res) => {
          let data = res.rows;
          // console.log(res.rows);
          data.forEach((customer) => {
            this.customerName.push({
              customerId: customer.customerId,
              customerName: customer.companyName,
            });
          });
          resolve();
        });
      });
    },
    // 获取操作类型
    getOperationList() {
      return new Promise((resolve, rejected) => {
        listOperation().then((res) => {
          // console.log(res.rows);
          let data = res.rows;
          data.forEach((operation) => {
            this.operationName.push({
              operationId: operation.operationId,
              operationName: operation.operationName,
            });
          });
          resolve();
        });
      });
    },

    // 获取片区信息
    getAreaList() {
      return new Promise((resolve, rejected) => {
        listArea().then((res) => {
          console.log(res.rows);
          let data = res.rows;
          data.forEach((area) => {
            this.areaName.push({
              areaId: area.areaId,
              areaName: area.areaName,
            });
          });
          resolve();
        });
      });
    },
    // 获取大棚信息
    getGreenhouseList() {
      return new Promise((resolve, rejected) => {
        listGreenhouse().then((res) => {
          // console.log(res.rows);
          let datas = res.rows;
          datas.forEach((greenhouse) => {
            this.greenhouseName.push({
              greenhouseName: greenhouse.greenhouseName,
              greenhouseId: greenhouse.greenhouseId,
            });
          });
          resolve();
        });
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
      return new Promise((resolve, rejected) => {
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
          resolve();
        });
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 订单分配取消按钮
    cancelAllocation() {
      this.openAllocation = false;
      this.resetAllocation();
    },
    // 订单实施取消按钮
    cancelFulfillment() {
      this.openFulfillment = false;
      this.resetFulfillment();
    },
    // 表单重置
    reset() {
      this.form = {
        orderId: null,
        orderName: null,
        customerId: null,
        cropTypeId: null,
        seedlingType: null,
        stockBreed: null,
        scionBreed: null,
        receiveorderDate: null,
        deliveryDate: null,
        orderAmount: null,
        contractPrice: null,
        salePrices: null,
        requirement: null,
        orderType: null,
        status: "0",
        note: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("form");
    },
    // 订单分配表单重置
    resetAllocation() {
      this.allocationform = {
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
      // this.resetAllocationForm("allocationform");
    },
    // 订单实施表单重置
    resetFulfillment() {
      this.fulfillmentform = {
        orderFulfillmentId: null,
        orderId: null,
        operationId: null,
        beginDate: null,
        endDate: null,
        note: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
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
    /** 订单分配重置按钮操作 */
    resetAllocatiionQuery() {
      this.resetAllocationForm("queryForm");
      this.handleQuery();
    },
    /** 重置按钮操作 */
    resetFulfillmentQuery() {
      this.resetFulfillmentForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.orderId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   console.log(row)
    //   this.reset();
    //   const orderId = row.orderId || this.ids
    //   getOrder(orderId).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改订单";
    //   });
    // },
    /** 提交按钮 */
    submitForm() {
      if (this.form.stockBreed == null) {
        this.form.stockBreed = "-";
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // if (this.form.orderId != null) {
          //   updateOrder(this.form).then(response => {
          //     this.msgSuccess("修改成功");
          //     this.open = false;
          //     this.getList();
          //   });
          // } else {

          console.log("this.form", this.form);
          addOrder(this.form).then((response) => {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.orderId || this.ids;
      this.$confirm(
        '删除该订单会同时删除该订单相关的其他信息，是否确认删除订单编号为"' +
          orderIds +
          '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delOrder(orderIds);
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
        for (let i = 0; i < this.orderList.length; i++) {
          queryParams.orderIds.push(this.orderList[i].orderId);
        }
      } else if (this.ids.length != 0) {
        queryParams.orderIds = this.ids;
      }
      this.$confirm("是否确认导出订单数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportOrder(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    /** 订单分配按钮操作 */
    handleAllocationAdd(row) {
      console.log("row", row);
      this.reset();
      const orderIds = row.orderId;
      this.allocationform.orderId = orderIds;
      this.allocationform.cropTypeId = row.cropTypeId;
      this.allocationform.seedlingType = row.seedlingType;
      this.allocationform.stockBreed = row.stockBreed;
      this.allocationform.scionBreed = row.scionBreed;
      this.openAllocation = true;
      this.title = "添加订单分配";
      console.log(this.allocationform);
    },
    /** 提交订单分配按钮 */
    submitAllocationForm() {
      this.$refs["allocationform"].validate((valid) => {
        if (valid) {
          addAllocation(this.allocationform).then((response) => {
            this.msgSuccess("新增成功");
            this.openAllocation = false;
            // console.log(response);
            this.$router.push("/order/allocation");
          });
        }
      });
    },

    //订单实施按钮操作
    handleFulfillmentAdd(row) {
      const orderIds = row.orderId;
      this.fulfillmentform.orderId = orderIds;
      this.reset();
      this.openFulfillment = true;
      this.title = "添加订单实施";
    },
    /** 提交订单实施按钮 */
    submitFulfillmentForm() {
      this.$refs["fulfillmentform"].validate((valid) => {
        if (valid) {
          addFulfillment(this.fulfillmentform).then((response) => {
            this.msgSuccess("新增成功");
            this.openFulfillment = false;
            this.$router.push("/order/fulfillment");
          });
        }
      });
    },
  },
};
</script>
