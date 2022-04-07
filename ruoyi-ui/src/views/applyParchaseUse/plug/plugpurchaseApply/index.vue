<template>
  <div class="app-container">
    <!--el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型外码" prop="plugTypeId">
        <el-input
          v-model="queryParams.plugTypeId"
          placeholder="请输入类型外码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产地国产 | 进口" prop="originPlace">
        <el-input
          v-model="queryParams.originPlace"
          placeholder="请输入产地国产 | 进口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="申请量" prop="applyAmount">
        <el-input
          v-model="queryParams.applyAmount"
          placeholder="请输入申请量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="applyUnit">
        <el-input
          v-model="queryParams.applyUnit"
          placeholder="请输入单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态0表示申请，1表示审批通过，2表示不通过" prop="approvalStatus">
        <el-select v-model="queryParams.approvalStatus" placeholder="请选择审批状态0表示申请，1表示审批通过，2表示不通过" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form-->

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--		  :loading="exportLoading"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:plugpurchaseApply:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="序号" align="center" prop="plugPurchaseApplyId" />
       <el-table-column label="客户编号" align="center" prop="customerId" />
      <el-table-column label="穴盘类型" align="center" prop="plugTypeId" />
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column label="穴盘品牌" align="center" prop="brand" />
      <el-table-column label="接单日期" align="center" prop="receiveorderDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.receiveorderDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计出圃日期" align="center" prop="deliveryDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center" prop="orderAmount" />
      <el-table-column label="合同单价" align="center" prop="contractPrice" />
      <el-table-column label="订单要求" align="center" prop="requirement" />
      <el-table-column label="订单类型 " align="center" prop="orderType" />
      <el-table-column label="订单状态 " align="center" prop="status" />
      <el-table-column label="种子采购申请" align="center" class-name="small-padding fixed-width" width="120">
        <template slot-scope="">
         <el-button
          type="primary"
          plain
          size="small"
          @click="handleAdd"
          v-hasPermi="['system:plugpurchaseApply:add']"
          width="100"
        >申请</el-button>
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

    <!-- 添加或修改穴盘购买申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="穴盘类型" prop="plugTypeId">
          <el-select v-model="form.plugTypeId" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="type in plugs_type"
            :key="type.plugTypeId"
            :value="type.plugTypeId"
            :label="type.plugType"
          ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="产地国产 | 进口" prop="originPlace">
            <el-select v-model="form.originPlace" placeholder="请选择产地">
              <el-option label="国产" value="国产"/>
              <el-option label="进口 " value="进口"/>
             </el-select>
        </el-form-item>
        <el-form-item label="穴盘品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入穴盘品牌" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model.number="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="单位" prop="applyUnit">
          <el-input v-model="form.applyUnit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" type="textarea" placeholder="请输入内容" />
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
import { listPlugpurchaseApply, getPlugpurchaseApply, delPlugpurchaseApply, addPlugpurchaseApply, updatePlugpurchaseApply, exportPlugpurchaseApply } from "@/api/applyParchaseUse/plug/plugpurchaseApply";
import {listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/system/order";
import {plugsType} from "@/api/applyParchaseUse/plug/plugType";

export default {
  name: "PlugpurchaseApply",
  components: {
  },
  data() {
    return {
      //穴盘类型
      plugs_type:[],
      //产地
      place_type:[],
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
      // 穴盘购买申请表格数据
      orderList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        plugTypeId: null,
        originPlace:'国产',
        brand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: null,
        note: null,
      },
      // 表单参数
      form: {},
      allocationform: {},
      fulfillmentform: {},
      // 表单校验
      rules: {
        plugTypeId: [
          { required: true, message: "穴盘类型不能为空", trigger: "blur" }
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          {type:'number',message:'申请量必须为数字'}
        ],
        applyUnit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        approvalStatus: [
          { required: true, message: "审批状态:0表示申请，1表示审批通过，2表示不通过不能为空", trigger: "blur" }
        ],
        createBy: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
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
    this.getPlugs();
    this.getList();
    // this.getDicts("pluge_type").then(response =>{
    //   this.pluge_type =response.data;
    //   console.log('pluge_type',this.pluge_type);
    // });
  },
  methods: {

    //格式化穴盘名称
    formdata_plug(data){
      console.log("data",data)
      let plug_type_map = new Map();
      this.plugs_type.forEach(type =>{
        plug_type_map.set(type.plugTypeId,type.plugType)
      })
      data.forEach(type => {
        let plug_name = plug_type_map.get(type.plugTypeId)
        type.plugType = plug_name
      });
    },
    //查询穴盘类型
    getPlugs(){
      plugsType().then (response => {
        this.plugs_type = response.rows
        console.log("11111",this.plugs_type)
    })
    },
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_plug(this.orderList)
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
        plugPurchaseApplyId: null,
        plugTypeId: null,
        originPlace: null,
        brand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
        note: null,
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
      this.ids = selection.map(item => item.orderId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加穴盘购买申请";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.plugPurchaseApplyId != null) {
            updatePlugpurchaseApply(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlugpurchaseApply(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.$router.push('/production/purchaseApply/plugapplyDetail')

            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.orderId || this.ids;
      this.$confirm('是否确认删除穴盘购买申请编号为"' + orderIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(orderIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有穴盘购买申请数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
