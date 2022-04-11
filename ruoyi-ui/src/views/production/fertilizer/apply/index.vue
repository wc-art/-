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
          v-hasPermi="['system:allocation:add']"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:allocation:edit']"
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
          v-hasPermi="['system:allocation:remove']"
        >删除</el-button>
      </el-col> -->
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
    </el-row>

    <el-table
      v-loading="loading"
      :data="allocationList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="订单分配号"
        align="center"
        prop="orderAllocationId"
        width="90px"
      />
      <el-table-column label="片区名称" align="center" prop="area" />
      <el-table-column label="大棚名称" align="center" prop="greenhouse" />
      <el-table-column label="订单名称" align="center" prop="ordername" />
      <el-table-column label="蔬菜类型" align="center" prop="cropType" />
      <el-table-column label="苗类型" align="center" prop="seedlingType" />
      <el-table-column label="砧木品种" align="center" prop="stockBreed" />
      <el-table-column label="接穗品种" align="center" prop="scionBreed" />
      <el-table-column label="计划数量" align="center" prop="amount" />
      <el-table-column label="所占面积" align="center" prop="acreage" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column
        label="申请领用化肥"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleAdd(scope.row)"
            v-hasPermi="['fertilizer:apply:add']"
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

    <!-- 添加或修改化肥申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="订单分配号">
          <el-input v-model="form.orderAllocationId" disabled />
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.orderId" disabled />
        </el-form-item>
        <el-form-item label="类型" prop="fertilizerTypeId">
          <el-select
            v-model="form.fertilizerTypeId"
            placeholder="请选择化肥类型"
          >
            <el-option
              v-for="type in fertilizer_type"
              :key="type.fertilizerTypeId"
              :value="type.fertilizerTypeId"
              :label="type.fertilizerType"
              @click.native="getAmount"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="fertilizerNameId">
          <el-select
            v-model="form.fertilizerNameId"
            placeholder="请选择化肥名称"
          >
            <el-option
              v-for="name in fertilizer_name"
              :key="name.fertilizerNameId"
              :value="name.fertilizerNameId"
              :label="name.fertilizerName"
              @click.native="getAmount"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="NPK含量">
          <el-select v-model="form.npkContent" placeholder="请选择NPK">
            <el-option
              v-for="item in fertilizer_amount"
              :key="item.npkContent"
              :label="item.npkContent"
              :value="item.npkContent"
              @click.native="getAmount"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-select v-model="form.brand" placeholder="请选择品牌">
            <el-option
              v-for="item in fertilizer_amount"
              :key="item.brand"
              :label="item.brand"
              :value="item.brand"
              @click.native="getAmount"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="originCompany">
          <el-select v-model="form.originCompany" placeholder="请选择公司">
            <el-option
              v-for="item in fertilizer_amount"
              :key="item.originCompany"
              :label="item.originCompany"
              :value="item.originCompany"
              @click.native="getAmount"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请量" prop="applyAmount">
          <el-input v-model="form.applyAmount" placeholder="请输入申请量" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间"
          >
          </el-date-picker>
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
  listNews,
  getNews,
  delNews,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listAllocation,
  getAllocation,
  delAllocation,
  addAllocation,
  updateAllocation,
  exportAllocation,
} from "@/api/order/allocation";
import { vegetableType } from "@/api/production/seed/cropType";
import {
  listApply,
  getApply,
  delApply,
  addApply,
  updateApply,
  exportApply,
} from "@/api/production/fertilizer/apply";
import { listFertilizerType } from "@/api/production/fertilizer/fertilizerType";
import { listFertilizerName } from "@/api/production/fertilizer/fertilizerName";
import { getUserId, listUser } from "@/api/system/user";
import { listFertilizerAmount } from "@/api/production/fertilizer/fertilizerAmount";
import { getUserarea } from "@/api/as/userarea";

export default {
  name: "Apply",
  components: {},
  data() {
    return {
      //存储当前用户的id,名称
      userId: null,
      userName: null,
      userRoles: [],
      //存储当前用户关联的片区id
      areaIds: [],
      //库存表
      fertilizer_amount: [],
      //化肥类型
      fertilizer_type: [],
      //化肥种类
      fertilizer_name: [],
      //蔬菜类型
      vegertables_type: [],
      //种子类型
      seed_type: [],
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
      form2: {},
      // 表单校验
      rules: {
        fertilizerTypeId: [
          { required: true, message: "化肥类型不能为空", trigger: "change" },
        ],
        fertilizerNameId: [
          { required: true, message: "化肥名称不能为空", trigger: "change" },
        ],
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        applyAmount: [
          { required: true, message: "申请量不能为空", trigger: "blur" },
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
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" },
        ],
        userId: [{ required: true, message: "申请人", trigger: "blur" }],
        approvalStatusProduct: [
          {
            required: true,
            message:
              "生产厂长审批状态:0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
        approvalStatusTechnology: [
          {
            required: true,
            message:
              "技术厂长审批状态:0表示申请，1表示审批通过，2表示不通过不能为空",
            trigger: "blur",
          },
        ],
        consumeStatus: [
          {
            required: true,
            message: "领用状态：未领用 | 已领用不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.userName = this.$store.getters.name;
    this.userRoles = this.$store.getters.roles;
    Promise.all([
      this.getUserId(),
      this.getVegertables(),
      this.getFertilizerTypes(),
      this.getFertilizerNames(),
    ]).then((res) => {
      this.getList();
    });
    this.getDicts("seed_type").then((response) => {
      this.seed_type = response.data;
    });
  },

  methods: {
    //根据用户名获取用户id,且根据用户id获取关联的大棚id
    getUserId() {
      return new Promise((resolve, rejected) => {
        getUserId({ userName: this.userName }).then((response) => {
          this.userId = response.data;
          //取与用户有关联的大棚id,用this.areaIds来匹配符合条件的片区rows并push
          getUserarea(this.userId).then((response) => {
            if (response.data.length != 0) {
              for (var i = 0; i < response.data.length; i++) {
                this.areaIds.push(response.data[i].areaId);
              }
            }
            resolve();
          });
        });
      });
    },

    //格式化蔬菜名称
    formdata_vegertable(data) {
      let vegert_type_map = new Map();
      this.vegertables_type.forEach((type) => {
        vegert_type_map.set(type.cropTypeId, type.cropType);
      });
      data.forEach((type) => {
        let vegert_name = vegert_type_map.get(type.cropTypeId);
        type.cropType = vegert_name;
      });
    },
    //获取库存
    getAmount() {
      listFertilizerAmount(this.form).then((response) => {
        this.fertilizer_amount = response.rows;
      });
    },
    //查询蔬菜类型
    getVegertables() {
      return new Promise((resolve, rejected) => {
        vegetableType().then((response) => {
          this.vegertables_type = response.data;
          resolve();
        });
      });
    },
    //查询化肥类型
    getFertilizerTypes() {
      return new Promise((resolve, rejected) => {
        listFertilizerType().then((response) => {
          this.fertilizer_type = response.rows;
          resolve();
        });
      });
    },
    //查询化肥名称
    getFertilizerNames() {
      return new Promise((resolve, rejected) => {
        listFertilizerName().then((response) => {
          this.fertilizer_name = response.rows;
          resolve();
        });
      });
    },
    /** 查询订单分配列表 */
    getList() {
      this.loading = true;
      listAllocation(this.queryParams).then((response) => {
        //判断角色是否包含片区主管
        //   var flag=0
        //   for(var i=0;i<this.userRoles.length;i++) {
        //     if(this.userRoles[i]=="area_director"){
        //       flag=1
        //     }
        //   }
        //   if(this.areaIds.length!=0 && flag==1){
        //   this.allocationList.length=0;    //重置List结果
        //   for(var i=0;i<this.areaIds.length;i++){
        //     for(var j=0;j<response.rows.length;j++){
        //       if(this.areaIds[i]==response.rows[j].areaId){
        //         this.allocationList.push(response.rows[j]);
        //       }
        //     }
        //   }
        // }
        // else {
        this.allocationList = response.rows;
        // }
        this.total = response.total;
        this.loading = false;
        this.formdata_vegertable(this.allocationList);
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
        seedApplyId: null,
        orderAllocationId: null,
        cropTypeId: null,
        seedType: null,
        varietyName: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: 0,
        approvalStatusTechnology: 0,
        consumeStatus: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核领用生产资料",
        menuName3: "化肥审核",
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["production_director", "technical_director"],
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
      this.ids = selection.map((item) => item.orderAllocationId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 申请按钮操作 */
    handleAdd(row) {
      this.reset();
      this.form.orderId = row.orderId;
      this.form.orderAllocationId = row.orderAllocationId;
      this.open = true;
      this.title = "化肥申请领用";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.approvalStatusProduct = 0;
          this.form.approvalStatusTechnology = 0;
          addApply(this.form).then((response) => {
            addNews(this.form2).then((response) => {
              bus.$emit("getTodoNum");
            });
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
            this.$router.push("/production/ApplyUseDetail/fertilizer");
          });
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出订单分配数据项?", "提示", {
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
