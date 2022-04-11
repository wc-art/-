<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="基质种类" prop="stromaKindId">
          <el-select
            v-model="queryParams.stromaKindId"
            placeholder="请选择基质种类"
            clearable size="small"
          >
            <el-option
              v-for="kind in stroma_kind"
              :key="kind.stromaKindId"
              :value="kind.stromaKindId"
              :label="kind.stromaKind"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基质类型" prop="stromaTypeId">
          <el-select
            v-model="queryParams.stromaTypeId"
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
      <el-form-item label="基质品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入基质品牌"
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

      <el-form-item label="审批状态" prop="approvalStatus">
        <el-select v-model="queryParams.approvalStatus" placeholder="请选择审批状态" clearable size="small">
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
          v-hasPermi="['system:stromapurchaseApply:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn()||single"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['system:stromapurchaseApply:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn()||multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['system:stromapurchaseApply:remove']"
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
          v-hasPermi="['system:stromapurchaseApply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

<el-table v-loading="loading" :data="stromapurchaseApplyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
  <el-table-column label="编号" align="center" type="index" />
<!--      <el-table-column label="编号主码" align="center" prop="stromaPurchaseApplyId" />-->
      <el-table-column label="基质种类" align="center" prop="stromaKind" />
      <el-table-column label="基质类型" align="center" prop="stromaTypeName" />
      <el-table-column label="基质品牌" align="center" prop="brand" />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
  <el-table-column label="申请时间" align="center" prop="createTime" width="100">
    <template slot-scope="scope">
      <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
    </template>
  </el-table-column>
  <el-table-column label="预计使用时间" align="center" prop="createTime" width="100">
    <template slot-scope="scope">
      <span>{{ parseTime(scope.row.planUseTime, '{y}-{m}-{d}') }}</span>
    </template>
  </el-table-column>
      <el-table-column label="单位" align="center" prop="applyUnit" />
      <el-table-column label="审批状态" align="center" prop="approvalStatus" >
        <template slot-scope="scope">
          <span>
            {{approvalStatus[scope.row.approvalStatus]}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:stromapurchaseApply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:stromapurchaseApply:remove']"
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

   <!-- 添加或修改基质购买申请信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="基质种类" prop="stromaKindId">
          <el-select
            v-model="form.stromaKindId"
            placeholder="请选择基质种类"
            clearable
            size="small"
          >
            <el-option
              v-for="kind in stroma_kind"
              :key="kind.stromaKindId"
              :value="kind.stromaKindId"
              :label="kind.stromaKind"
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
        <el-form-item label="基质品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入基质品牌" />
        </el-form-item>
        <el-form-item label="购自公司" prop="originCompany">
          <el-input v-model="form.originCompany" placeholder="请输入购自公司" />
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="单位" prop="applyUnit">
          <el-input v-model="form.applyUnit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="预计使用时间" prop="planUseTime">
          <el-date-picker clearable size="small"
                          v-model="form.planUseTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择预计使用时间">
          </el-date-picker>
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
import {listNews,getNews,delNews,delNews1,addNews,updateNews,exportNews,} from "@/api/news/news";
import bus from "@/utils/bus";
import { listStromapurchaseApply, getStromapurchaseApply, delStromapurchaseApply, addStromapurchaseApply, updateStromapurchaseApply, exportStromapurchaseApply } from "@/api/production/stroma/purchaseApply";
import { listStromaKind } from "@/api/production/stroma/stromaKind";
import { listStromaType } from "@/api/production/stroma/stromaType";

export default {
  name: "StromapurchaseApply",
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
      approval: [],
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
        brand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: null,
        note: null,
      },
      // 表单参数
      form: {},
      form2: {},
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
          { type: 'number',
              message: '请输入非负数',
              trigger: 'blur',
              transform (value) {
                if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
                  return true
                }else{
                }
              }
            }
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
        planUseTime: [
          { required: true, message: "预计使用时间不能为空", trigger: "blur" }
        ],
      },
    };
  },
  created() {
    Promise.all(
      [
        this.getStromaKinds(),this.getStromaTypes(),
      ]
    ).then((res)=>{
      this.getList();
    })
  },
  methods: {
    setTopBtn(){
      for(var i=0;i<this.approval.length;i++) {
        if ((this.approval[i] != '0' ||this.single==true||this.multiple==true)&&this.$store.getters.name!="admin") {
          return true;
        } else return false;
      }
    },
    setEditBtn(row){
      if(row.approvalStatus == '1'&&this.$store.getters.name!="admin"){
        return true;
      }else return false;
    },
    //格式化基质种类名称
    formdata_stroma(data) {
      let stroma_kind_map = new Map();
      this.stroma_kind.forEach((type) => {
        stroma_kind_map.set(type.stromaKindId, type.stromaKind);
      });
      data.forEach((type) => {
        let stroma_kind_name = stroma_kind_map.get(type.stromaKindId);
        type.stromaKind = stroma_kind_name;
      });
    },

    //格式化基质类型名称
    formdata_stroma_type(data) {
      let stroma_type_map = new Map();
      this.stroma_type.forEach((type) => {
        stroma_type_map.set(type.stromaTypeId, type.stromaTypeName);
      });
      data.forEach((type) => {
        let stroma_type_name = stroma_type_map.get(type.stromaTypeId);
        type.stromaTypeName = stroma_type_name;
      });
    },

    //查询基质种类
    getStromaKinds(){
      return new Promise((resolve,rejected)=> {
        listStromaKind().then(response =>{
          this.stroma_kind = response.rows;
          resolve()
        });
      })
    },
    //查询基质类型
    getStromaTypes() {
      return new Promise((resolve,rejected)=> {
        listStromaType().then((response) => {
          this.stroma_type = response.rows;
          resolve()
        });
      })
    },
    /** 查询基质购买申请信息列表 */
    getList() {
      this.loading = true;
      console.log("this.queryParams",this.queryParams)
      listStromapurchaseApply(this.queryParams).then(response => {
        this.stromapurchaseApplyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_stroma(this.stromapurchaseApplyList);
        this.formdata_stroma_type(this.stromapurchaseApplyList);
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
        brand: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
        note: null,
        planUseTime:null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核采购生产资料",
        menuName3: "基质审核",
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["warehouse_keeper"],
      };
      this.resetForm("form");
      this.resetForm("form2");
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
      this.approval = selection.map(item => item.approvalStatus)
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
            console.log(this.form)
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
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.reset()
      let that = this
      that.form2 = this.form2
      console.log("form2", that.form2);
      const stromaPurchaseApplyIds = row.stromaPurchaseApplyId || this.ids;
      this.$confirm(
        '是否确认删除该基质购买申请信息?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delStromapurchaseApply(stromaPurchaseApplyIds).then(response =>{
            delNews1(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
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
      this.$confirm("是否确认导出基质购买申请信息数据项?", "提示", {
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
