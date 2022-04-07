<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="请选择穴盘类型" prop="plugTypeId">
        <el-select v-model="queryParams.plugTypeId" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="type in plugs_type"
            :key="type.plugTypeId"
            :value="type.plugTypeId"
            :label="type.plugType"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="产地" prop="originPlace">
        <el-select v-model="queryParams.originPlace" placeholder="请选择产地">
            <el-option label="国产" value="国产"/>
            <el-option label="进口 " value="进口"/>
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
      <el-form-item label="审批状态" prop="approvalStatus">
        <el-select v-model="queryParams.approvalStatus" placeholder="请选择审批状态0表示申请，1表示审批通过，2表示不通过" clearable size="small">
          <el-option label="申请" value="0"/>
          <el-option label="审批通过" value="1"/>
          <el-option label="不通过" value="2"/>
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
          v-hasPermi="['system:plugpurchaseApply:add']"
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
          v-hasPermi="['system:plugpurchaseApply:edit']"
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
          v-hasPermi="['system:plugpurchaseApply:remove']"
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
          v-hasPermi="['system:plugpurchaseApply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="plugpurchaseApplyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="plugPurchaseApplyId" />
      <el-table-column label="穴盘类型" align="center" prop="plugType" />
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column label="穴盘品牌" align="center" prop="brand" />
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
      <el-table-column label="审核" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlethrough(scope.row)"
            v-hasPermi="['system:apply:permit']"
          >通过</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleNotThrogh(scope.row)"
            v-hasPermi="['system:apply:premit']"
          >不通过</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:plugpurchaseApply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:plugpurchaseApply:remove']"
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
import {plugsType} from "@/api/applyParchaseUse/plug/plugType";

export default {
  name: "PlugpurchaseApply",
  components: {
  },
  data() {
    return {
      //申请状态转换
      approvalStatus:{
        0:'申请中',
        1:'申请通过',
        2:'不通过'
      },
      //穴盘类型
      plugs_type:[],
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
      plugpurchaseApplyList: [],
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
        originPlace: null,
        brand: null,
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
          { required: true, message: "审批状态0表示申请，1表示审批通过，2表示不通过不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getPlugs();
    this.getList();

  },
  methods: {
     //格式化穴盘种类名称
    formdata_plug(data) {
      let plugs_type_map = new Map();

      this.plugs_type.forEach((type) => {
        plugs_type_map.set(type.plugTypeId, type.plugType);
      });

      data.forEach((type) => {
        let plugs_type_name = plugs_type_map.get(type.plugTypeId);
        type.plugType = plugs_type_name;
      });
      console.log(this.plugpurchaseApplyLists);
    },
       //查询穴盘类型
    getPlugs(){
      plugsType().then(response =>{
        console.log(response);
        // this.plugs_type = response.data
        let map = new Map();
        response.data.forEach((item) => {
          map.set(item.plugTypeId, item.plugType);
        });

        map.forEach((value,key)=>{
          this.plugs_type.push({
            plugTypeId:key,
            plugType:value
          })
        })
        console.log(this.plugs_type);
      })
    },
    /** 查询穴盘购买申请列表 */
    getList() {
      this.loading = true;
      listPlugpurchaseApply(this.queryParams).then(response => {
        this.plugpurchaseApplyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_plug(this.plugpurchaseApplyList)
        console.log(this.plugpurchaseApplyList)
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
      this.ids = selection.map(item => item.plugPurchaseApplyId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加穴盘购买申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const plugPurchaseApplyId = row.plugPurchaseApplyId || this.ids
      getPlugpurchaseApply(plugPurchaseApplyId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改穴盘购买申请";
      });
    },
    /** 通过按钮操作 */
    handlethrough(row) {
      this.reset();
      const plugPurchaseApplyId = row.plugPurchaseApplyId || this.ids
      let data ={}
      data.plugPurchaseApplyId = plugPurchaseApplyId;
      data.approvalStatus = 1;
      console.log(data)
      updatePlugpurchaseApply(data).then(response =>{
        console.log(response)
      })
      this.getList();
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
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const plugPurchaseApplyIds = row.plugPurchaseApplyId || this.ids;
      this.$confirm('是否确认删除穴盘购买申请编号为"' + plugPurchaseApplyIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPlugpurchaseApply(plugPurchaseApplyIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 不通过按钮操作 */
    handleNotThrogh(row) {
      const plugPurchaseApplyIds = row.plugPurchaseApplyId || this.ids;
      let data ={}
      data.plugPurchaseApplyId = plugPurchaseApplyIds;
      data.approvalStatus = 2;
      this.$confirm('是否确认不通过种子审核编号为"' + plugPurchaseApplyIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return updatePlugpurchaseApply(data).then(response =>{
            console.log(response)
      })
        }).then(() => {
          this.getList();
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
          return exportPlugpurchaseApply(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
