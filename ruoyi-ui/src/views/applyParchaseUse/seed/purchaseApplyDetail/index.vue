<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="蔬菜类型" prop="cropTypeId">
        <el-select v-model="queryParams.cropTypeId" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="type in vegertables_type"
            :key="type.cropTypeId"
            :value="type.cropTypeId"
            :label="type.cropType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="种子类型" prop="seedType">
        <el-select v-model="queryParams.seedType" placeholder="请选择种子类型" clearable size="small">
          <el-option
            v-for="type in seed_type"
            :key="type.dictValue"
            :label="type.dictLabel"
            :value="type.dictValue"
            />
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
      <el-form-item label="申请量" prop="applyAmount">
        <el-input
          v-model="queryParams.applyAmount"
          placeholder="请输入申请量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="approvalStatus">
        <el-select v-model="queryParams.approvalStatus" placeholder="请选择审批状态" clearable size="small">
          <el-option label="审核中" value="0" />
          <el-option label="审核通过" value="1" />
          <el-option label="审核不通过" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="applyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主码" align="center" prop="seedPurchaseApplyId" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="种子类型:" align="center" prop="seedType" />
      <el-table-column label="品种名称" align="center" prop="varietyName" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column label="单位" align="center" prop="applyUnit" />
      <el-table-column label="审批状态" align="center" prop="approvalStatus" >
        <template slot-scope="scope">
          <span>
            {{approvalStatus[scope.row.approvalStatus]}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="130">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:apply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:apply:remove']"
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

    <!-- 添加或修改种子申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="蔬菜类型" prop="cropTypeId">
        <el-select v-model="form.cropTypeId" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="type in vegertables_type"
            :key="type.cropTypeId"
            :value="type.cropTypeId"
            :label="type.cropType"
          ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="种子类型" prop="seedType">
          <el-select v-model="form.seedType" placeholder="请选择种子类型">
            <el-option
            v-for="type in seed_type"
            :key="type.dictValue"
            :label="type.dictLabel"
            :value="type.dictValue"
             />
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
import { listApply, getApply, delApply, addApply, updateApply, exportApply } from "@/api/applyParchaseUse/seed/applyDetail";
import {vegetableType } from "@/api/applyParchaseUse/seed/type";

export default {
  name: "Apply",
  components: {
  },
  data() {
    return {
      //申请领用状态
      approvalStatus:{
        0:'审核中',
        1:'审核通过',
        2:'审核不通过'
      },
      //蔬菜类型
      vegertables_type:[],
      //种子类型
      seed_type:[],
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
      // 种子购买申请表格数据
      applyList: [],
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
        applyUnit: null,
        approvalStatus: null,
        note: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cropTypeId: [
          { required: true, message: "蔬菜类型不能为空", trigger: "blur" }
        ],
        seedType: [
          { required: true, message: "种子类型：接穗| 砧木不能为空", trigger: "change" }
        ],
        varietyName: [
          { required: true, message: "品种名称不能为空", trigger: "blur" }
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
          { type:'number',message:'申请量必须为数字'}
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
    this.getVegertables();
    this.getDicts("seed_type").then(response => {
      this.seed_type = response.data;
    });
    this.getList();
  },
  methods: {
    //格式化蔬菜名称
    formdata_vegertable(data){
      let vegert_type_map = new Map();
      this.vegertables_type.forEach(type =>{
        vegert_type_map.set(type.cropTypeId,type.cropType)
      })
      data.forEach(type => {
        let vegert_name = vegert_type_map.get(type.cropTypeId)
        type.cropType = vegert_name
      });
    },
    //查询蔬菜类型
    getVegertables(){
      vegetableType().then(response =>{
        this.vegertables_type = response.data
      })
    },
    /** 查询种子购买申请列表 */
    getList() {
      this.loading = true;
      listApply(this.queryParams).then(response => {
        this.applyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_vegertable(this.applyList)
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
        seedPurchaseApplyId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
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
      this.ids = selection.map(item => item.seedPurchaseApplyId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加种子购买申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const seedPurchaseApplyId = row.seedPurchaseApplyId || this.ids
      console.log(seedPurchaseApplyId)
      getApply(seedPurchaseApplyId).then(response => {
        console.log(response)
        this.form = response.data;
        this.open = true;
        this.title = "修改种子购买申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.seedPurchaseApplyId != null) {
            updateApply(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApply(this.form).then(response => {
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
      const seedPurchaseApplyIds = row.seedPurchaseApplyId || this.ids;
      this.$confirm('是否确认删除种子购买申请编号为"' + seedPurchaseApplyIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delApply(seedPurchaseApplyIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有种子购买申请数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportApply(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
