<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="纸箱类型" prop="cartonTypeId">
        <el-select v-model="queryParams.cartonTypeId" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="type in cartons_type"
            :key="type.cartonTypeId"
            :value="type.cartonTypeId"
            :label="type.cartonType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="cartonSpecification">
        <el-input
          v-model="queryParams.cartonSpecification"
          placeholder="请输入规格"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:cartonApply:add']"
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
          v-hasPermi="['system:cartonApply:edit']"
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
          v-hasPermi="['system:cartonApply:remove']"
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
          v-hasPermi="['system:cartonApply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cartonApplyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="纸箱类型" align="center" prop="cartonType" />
      <el-table-column label="规格" align="center" prop="cartonSpecification" />
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
            v-hasPermi="['system:cartonApply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:cartonApply:remove']"
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

    <!-- 添加或修改纸箱购买申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="纸箱类型" prop="cartonTypeId">
          <el-select v-model="form.cartonTypeId" placeholder="请选择类型" clearable size="small">
            <el-option
              v-for="type in cartons_type"
              :key="type.cartonTypeId"
              :value="type.cartonTypeId"
              :label="type.cartonType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="cartonSpecification">
          <el-input v-model="form.cartonSpecification" placeholder="请输入规格" />
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
import {listNews,getNews,delNews,delNews1,addNews,updateNews,exportNews,} from "@/api/news/news";
import bus from "@/utils/bus";
import { listCartonApply, getCartonApply, delCartonApply, addCartonApply, updateCartonApply, exportCartonApply } from "@/api/production/carton/purchaseApply";
import {cartonsType} from "@/api/production/carton/cartonType";

export default {
  name: "CartonApply",
  components: {
  },
  data() {
    return {
      //申请状态转换
      approvalStatus:{
        0:'审核中',
        1:'审核通过',
        2:'审核不通过'
      },
      //纸箱类型
      cartons_type:[],
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
      // 纸箱购买申请表格数据
      cartonApplyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        cartonTypeId: null,
        cartonSpecification: null,
        originCompany: null,
        approvalStatus: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        cartonTypeId: [
          { required: true, message: "纸箱类型不能为空", trigger: "blur" }
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
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        approvalStatus: [
          { required: true, message: "审批状态不能为空", trigger: "blur" }
        ],
        planUseTime: [
          { required: true, message: "预计使用时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    Promise.all([
      this.getCartons(),
    ]).then((res)=>{
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
    //格式化纸箱名称
    formdata_carton(data){
      let type_map = new Map();
      this.cartons_type.forEach(type =>{
        type_map.set(type.cartonTypeId,type.cartonType)
      })
      data.forEach(type => {
        let carton_name = type_map.get(type.cartonTypeId)
        type.cartonType = carton_name
      });
    },
    //查询纸箱类型
    getCartons(){
        return new Promise((resolve,rejected)=> {
          cartonsType().then (response => {
            this.cartons_type = response.rows
            resolve()
          });
        })
      },
    /** 查询纸箱购买申请列表 */
    getList() {
      this.loading = true;
      listCartonApply(this.queryParams).then(response => {
        this.cartonApplyList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.formdata_carton(this.cartonApplyList)
        console.log(this.cartonApplyList)
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
        cartonPurchaseApplyId: null,
        cartonTypeId: null,
        cartonSpecification: null,
        originCompany: null,
        applyAmount: null,
        applyUnit: null,
        approvalStatus: 0,
        note: null,
        planUseTime:null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核采购生产资料",
        menuName3: "纸箱审核",
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
      this.ids = selection.map(item => item.cartonPurchaseApplyId)
      this.approval = selection.map(item => item.approvalStatus)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加纸箱购买申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cartonPurchaseApplyId = row.cartonPurchaseApplyId || this.ids
      getCartonApply(cartonPurchaseApplyId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改纸箱购买申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cartonPurchaseApplyId != null) {
            updateCartonApply(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCartonApply(this.form).then(response => {
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
      const cartonPurchaseApplyIds = row.cartonPurchaseApplyId || this.ids;
      this.$confirm('是否确认删除该纸箱购买申请?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delCartonApply(cartonPurchaseApplyIds).then(response =>{
            delNews1(that.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
          });
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有纸箱购买申请数据项?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.exportLoading = true;
        return exportCartonApply(queryParams);
      }).then(response => {
        this.download(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
