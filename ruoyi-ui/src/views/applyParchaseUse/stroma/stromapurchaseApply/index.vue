<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          :loading="exportLoading"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:stromapurchaseApply:export']"-->
<!--          >导出</el-button-->
<!--        >-->
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="stromapurchaseApplyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="orderId" width="110" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column
        label="编号主码"
        align="center"
        prop="stromaPurchaseApplyId"
      />
      <el-table-column label="基质种类" align="center" prop="stromaKindId" />
      <el-table-column label="基质类型" align="center" prop="stromaTypeId" />
      <el-table-column label="基质品牌" align="center" prop="stromabrand" />
      <el-table-column
        label="接单日期"
        align="center"
        prop="receiveorderDate"
        width="120"
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
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center" prop="orderAmount" />
      <el-table-column label="合同单价" align="center" prop="contractPrice" />
      <el-table-column label="订单要求" align="center" prop="requirement" />
      <el-table-column
        label="订单类型"
        align="center"
        prop="orderType"
      />
      <el-table-column
        label="订单状态 "
        align="center"
        prop="status"
      />
      <el-table-column
        label="基质采购申请"
        align="center"
        class-name="small-padding fixed-width"
        width="120"
      >
        <template slot-scope="">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleAdd"
            v-hasPermi="['system:stromapurchaseApply:add']"
            width="100"
            >申请</el-button
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

    <!-- 添加或修改基质购买申请信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="基质种类" prop="stromaKindId">
          <el-select
            v-model="form.stromaKindId"
            placeholder="请选择基质种类"
            clearable
            size="small"
          >
            <el-option
              v-for="type in stroma_kind"
              :key="type.stromaKindId"
              :value="type.stromaKindId"
              :label="type.stromaKind"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基质类型" prop="stromaTypeId">
          <el-select
            v-model="form.stromaTypeId"
            placeholder="请选择基质类型"
            clearable
          >
            <el-option
              v-for="type in stroma_type"
              :key="type.stromaTypeId"
              :value="type.stromaTypeId"
              :label="type.stromaTypeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基质品牌" prop="stromabrand">
          <el-input v-model="form.stromabrand" placeholder="请输入基质品牌" />
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
  listStromapurchaseApply,
  getStromapurchaseApply,
  delStromapurchaseApply,
  addStromapurchaseApply,
  updateStromapurchaseApply,
  exportStromapurchaseApply,
} from "@/api/applyParchaseUse/stroma/stromapurchaseApply";
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
} from "@/api/system/order";
import { stromaKind } from "@/api/applyParchaseUse/stroma/stromaKind";
import { stromaType } from "@/api/applyParchaseUse/stroma/stromaType";

export default {
  name: "StromapurchaseApply",
  components: {},
  data() {
    return {
      //基质种类
      stroma_kind: [],
      //基质类型
      stroma_type: [],
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
      // 基质购买申请信息表格数据
      stromapurchaseApplyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        stromaKindId: null,
        stromaTypeId: null,
        stromabrand: null,
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
        stromaKindId: [
          { required: true, message: "基质种类不能为空", trigger: "blur" },
        ],
        stromaTypeId: [
          { required: true, message: "基质类型不能为空", trigger: "blur" },
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          {type:'number',message:'申请量必须为数字'}
        ],
        applyUnit: [
          { required: true, message: "单位不能为空", trigger: "blur" },
        ],
        approvalStatus: [
          {
            required: true,
            message: "审批状态0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getStromaskind();
    this.getStromastype();
  },
  methods: {
    //格式化基质种类名称
    // formdata_stroma(data) {
    //   let stroma_kind_map = new Map();
    //
    //   this.stroma_kind.forEach((type) => {
    //     stroma_kind_map.set(type.stromaKindId, type.stromaKind);
    //   });
    //
    //   data.forEach((type) => {
    //     let stroma_kind_name = stroma_kind_map.get(type.stromaKindId);
    //     type.stromaKind = stroma_kind_name;
    //   });
    //   console.log(this.stromapurchaseApplyList);
    // },
    //格式化基质类型名称
    // formdata_stroma_type(data) {
    //   let stroma_type_map = new Map();
    //
    //   this.stroma_type.forEach((type) => {
    //     stroma_type_map.set(type.stromaTypeId, type.stromaTypeName);
    //   });
    //
    //   data.forEach((type) => {
    //     let stroma_type_name = stroma_type_map.get(type.stromaTypeId);
    //     type.stromaTypeName = stroma_type_name;
    //   });
    // },

    //查询基质种类
    getStromaskind() {
      stromaKind().then((response) => {
        this.stroma_kind = response.rows;
        console.log("kind111111",this.stroma_kind);
      });
    },
    //查询基质类型
    getStromastype() {
      stromaType().then((response) => {
        //查询基质类型
        console.log("查询基质类型", response);

        let map = new Map();
        response.rows.forEach((item) => {
          map.set(item.stromaTypeId, item.stromaTypeName);
        });

        map.forEach((value,key)=>{
          this.stroma_type.push({
            stromaTypeId:key,
            stromaTypeName:value
          })
        })
        console.log("Type2222222",this.stroma_type);
      });
    },
    /** 查询基质购买申请信息列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then((response) => {
        this.stromapurchaseApplyList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log(this.stromapurchaseApplyList);
        // this.formdata_stroma(this.stromapurchaseApplyList);
        // this.formdata_stroma_type(this.stromapurchaseApplyList);
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
        stromaPurchaseApplyId: null,
        stromaKindId: null,
        stromaTypeId: null,
        stromabrand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
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
      this.ids = selection.map((item) => item.stromaPurchaseApplyId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加基质购买申请信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const stromaPurchaseApplyId = row.stromaPurchaseApplyId || this.ids;
      getStromapurchaseApply(stromaPurchaseApplyId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改基质购买申请信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.stromaPurchaseApplyId != null) {
            updateStromapurchaseApply(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStromapurchaseApply(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.$router.push('/production/purchaseApply/stromapplyDetail')
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const stromaPurchaseApplyIds = row.stromaPurchaseApplyId || this.ids;
      this.$confirm(
        '是否确认删除基质购买申请信息编号为"' +
          stromaPurchaseApplyIds +
          '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delStromapurchaseApply(stromaPurchaseApplyIds);
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
      this.$confirm("是否确认导出所有基质购买申请信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportStromapurchaseApply(queryParams);
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
