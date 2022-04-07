<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="类型" prop="graftingclipTypeId">
        <el-select
          v-model="queryParams.graftingclipTypeId"
          placeholder="请选择嫁接夹类型"
          clearable
          size="small"
        >
          <el-option
            v-for="type in graftingclip_type"
            :key="type.graftingclipTypeId"
            :value="type.graftingclipTypeId"
            :label="type.graftingclipType"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="originPlace">
        <el-select
          v-model="queryParams.originPlace"
          placeholder="请选择产地"
          clearable
          size="small"
        >
          <el-option label="国产" value="国产" />
          <el-option label="进口 " value="进口" />
        </el-select>
      </el-form-item>
      <el-form-item label="口径型号" prop="graftingclipSpecification">
        <el-input
          v-model="queryParams.graftingclipSpecification"
          placeholder="请输入口径型号"
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
      <el-form-item label="规格" prop="graftingclipSpecificationId">
        <el-input
          v-model="queryParams.graftingclipSpecificationId"
          placeholder="请输入规格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!--      <el-form-item label="申请时间">-->
      <!--        <el-date-picker-->
      <!--          v-model="daterangeApplyTime"-->
      <!--          size="small"-->
      <!--          style="width: 240px"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          type="daterange"-->
      <!--          range-separator="-"-->
      <!--          start-placeholder="开始日期"-->
      <!--          end-placeholder="结束日期"-->
      <!--        ></el-date-picker>-->
      <!--      </el-form-item>-->
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人" prop="userId">
        <el-select
          v-model="queryParams.userId"
          placeholder="请选择申请人"
          clearable
          size="small"
        >
          <el-option
            v-for="ID in user_ID"
            :key="ID.userId"
            :value="ID.userId"
            :label="ID.userName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领用状态" prop="consumeStatus">
        <el-select
          v-model="queryParams.consumeStatus"
          placeholder="请选择领用状态"
          clearable
          size="small"
        >
          <el-option label="未领用" value="0" />
          <el-option label="已领用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
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
          v-hasPermi="['graftingclip:applyTemporary:add']"
          >申请</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || single"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['graftingclip:applyTemporary:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn() || multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['graftingclip:applyTemporary:remove']"
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
          v-hasPermi="['graftingclip:applyTemporary:export']"
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
      :data="applyTemporaryList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="类型" align="center" prop="graftingclipType" />
      <el-table-column label="产地" align="center" prop="originPlace" />
      <el-table-column
        label="口径型号"
        align="center"
        prop="graftingclipSpecification"
      />
      <el-table-column label="购自公司" align="center" prop="originCompany" />
      <el-table-column
        label="规格"
        align="center"
        prop="graftingclipSpecificationId"
      />
      <el-table-column label="申请量" align="center" prop="applyAmount" />
      <el-table-column
        label="申请时间"
        align="center"
        prop="applyTime"
        width="100px"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="userName" />
      <el-table-column
        label="生产厂长审批状态"
        align="center"
        prop="approvalStatusProduct"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusProduct] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="技术厂长审批状态"
        align="center"
        prop="approvalStatusTechnology"
      >
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approvalStatusTechnology] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="领用状态" align="center" prop="consumeStatus">
        <template slot-scope="scope">
          <span>
            {{ consumeStatusList[scope.row.consumeStatus] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['graftingclip:applyTemporary:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['graftingclip:applyTemporary:remove']"
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

    <!-- 添加或修改嫁接夹临时申请领用详细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="graftingclipTypeId">
          <el-select
            v-model="form.graftingclipTypeId"
            placeholder="请选择嫁接夹类型"
          >
            <el-option
              v-for="type in graftingclip_type"
              :key="type.graftingclipTypeId"
              :value="type.graftingclipTypeId"
              :label="type.graftingclipType"
              @click.native="getAmount1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产地" prop="originPlace">
          <el-select v-model="form.originPlace" placeholder="请选择产地">
            <el-option label="国产" value="国产" @click.native="getAmount2" />
            <el-option label="进口" value="进口" @click.native="getAmount2" />
          </el-select>
        </el-form-item>
        <el-form-item label="口径型号" prop="graftingclipSpecification">
          <el-select
            v-model="form.graftingclipSpecification"
            placeholder="请选择口径型号"
          >
            <el-option
              v-for="item in graftingclip_amount"
              :key="item.graftinglabelSpecification"
              :label="item.graftingclipSpecification"
              :value="item.graftingclipSpecification"
              @click.native="getAmount3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="originCompany">
          <el-select v-model="form.originCompany" placeholder="请选择公司">
            <el-option
              v-for="item in graftingclip_amount"
              :key="item.originCompany"
              :label="item.originCompany"
              :value="item.originCompany"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="graftingclipSpecificationId">
          <el-input
            v-model="form.graftingclipSpecificationId"
            placeholder="请输入规格"
          />
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
        <el-form-item label="申请人" prop="userId" v-if="xg == 1">
          <el-select
            v-model="form.userId"
            placeholder="请选择申请人"
            clearable
            size="small"
          >
            <el-option
              v-for="Id in user_ID"
              :key="Id.userId"
              :value="Id.userId"
              :label="Id.userName"
            ></el-option>
          </el-select>
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
  delNews1,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";
import bus from "@/utils/bus";
import {
  listApplyTemporary,
  getApplyTemporary,
  delApplyTemporary,
  addApplyTemporary,
  updateApplyTemporary,
  exportApplyTemporary,
} from "@/api/production/graftingclip/applyTemporary";
import { listGraftingclipType } from "@/api/production/graftingclip/graftingclipType";

import { listUser } from "@/api/system/user";
import { listGraftingclipAmount } from "@/api/production/graftingclip/graftingclipAmount";

export default {
  name: "ApplyTemporary",
  components: {},
  data() {
    return {
      xg: 0,
      //存储当前用户的名称和角色
      userName: null,
      userRoles: [],
      user_ID: [],
      //库存表
      graftingclip_amount: [],
      //审核状态转换
      approvalStatus: {
        0: "未审核",
        1: "审核通过",
        2: "不通过",
      },
      consumeStatusList: {
        0: "未领用",
        1: "已领用",
      },
      //嫁接夹类型
      graftingclip_type: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      approvalStatusProducts: [],
      approvalStatusTechnologys: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 嫁接夹临时申请领用详细表格数据
      applyTemporaryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 申请时间时间范围
      daterangeApplyTime: [],
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        exportIds: [],
        pageNum: 1,
        pageSize: 10,
        graftingclipTypeId: null,
        originPlace: null,
        graftingclipSpecification: null,
        originCompany: null,
        graftingclipSpecificationId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        graftingclipTypeId: [
          { required: true, message: "类型不能为空", trigger: "blur" },
        ],
        originPlace: [
          { required: true, message: "产地不能为空", trigger: "blur" },
        ],
        graftingclipSpecificationId: [
          { required: true, message: "规格不能为空", trigger: "blur" },
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
        userId: [
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
        approvalStatusProduct: [
          {
            required: true,
            message: "生产厂长审批状态不能为空",
            trigger: "blur",
          },
        ],
        approvalStatusTechnology: [
          {
            required: true,
            message: "技术厂长审批状态不能为空",
            trigger: "blur",
          },
        ],
        consumeStatus: [
          { required: true, message: "领用状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.userName = this.$store.getters.name;
    this.userRoles = this.$store.getters.roles;
    Promise.all([this.getUserID(), this.getGraftingclipTypes()]).then((res) => {
      this.getList();
    });
  },

  methods: {
    //控制审核后上方修改删除按钮
    setTopBtn() {
      for (var i = 0; i < this.approvalStatusProducts.length; i++) {
        for (var j = 0; j < this.approvalStatusTechnologys.length; j++) {
          if (
            (this.approvalStatusProducts[i] != "0" ||
              this.approvalStatusTechnologys[j] != "0" ||
              this.single == true ||
              this.multiple == true) &&
            this.$store.getters.name != "admin"
          ) {
            return true;
          } else return false;
        }
      }
    },
    setEditBtn(row) {
      if (
        (row.approvalStatusProduct == "1" ||
          row.approvalStatusTechnology == "1") &&
        this.$store.getters.name != "admin"
      ) {
        return true;
      } else return false;
    },

    /**获取用户名称*/
    formdata_userList(data) {
      let type_map = new Map();
      this.user_ID.forEach((type) => {
        type_map.set(type.userId, type.userName);
      });
      data.forEach((type) => {
        let user_name = type_map.get(type.userId);
        type.userName = user_name;
      });
    },
    getUserID() {
      return new Promise((resolve, rejected) => {
        listUser().then((response) => {
          this.user_ID = response.rows;
          resolve();
        });
      });
    },
    //格式化嫁接夹类型
    formdata_type(data) {
      let graftingclip_type_map = new Map();
      this.graftingclip_type.forEach((type) => {
        graftingclip_type_map.set(
          type.graftingclipTypeId,
          type.graftingclipType
        );
      });
      data.forEach((type) => {
        let graftingclip_type_name = graftingclip_type_map.get(
          type.graftingclipTypeId
        );
        type.graftingclipType = graftingclip_type_name;
      });
    },
    //查询种类
    getGraftingclipTypes() {
      return new Promise((resolve, rejected) => {
        listGraftingclipType().then((response) => {
          this.graftingclip_type = response.rows;
          resolve();
        });
      });
    },
    //获取库存
    getAmount1() {
      var data = {};
      data.graftingclipTypeId = this.form.graftingclipTypeId;
      this.form.originPlace = null;
      this.form.graftingclipSpecification = null;
      this.form.originCompany = null;
      listGraftingclipAmount(data).then((response) => {
        this.graftingclip_amount = response.rows;
      });
    },
    //获取库存
    getAmount2() {
      var data = {};
      data.graftingclipTypeId = this.form.graftingclipTypeId;
      data.originPlace = this.form.originPlace;
      this.form.graftingclipSpecification = null;
      this.form.originCompany = null;
      listGraftingclipAmount(data).then((response) => {
        this.graftingclip_amount = response.rows;
      });
    },
    //获取库存
    getAmount3() {
      var data = {};
      data.graftingclipTypeId = this.form.graftingclipTypeId;
      data.originPlace = this.form.originPlace;
      data.graftingclipSpecification = this.form.graftingclipSpecification;
      this.form.originCompany = null;
      listGraftingclipAmount(data).then((response) => {
        this.graftingclip_amount = response.rows;
      });
    },
    /** 查询嫁接夹临时申请领用详细列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeApplyTime && "" != this.daterangeApplyTime) {
        this.queryParams.params["beginApplyTime"] = this.daterangeApplyTime[0];
        this.queryParams.params["endApplyTime"] = this.daterangeApplyTime[1];
      }
      listApplyTemporary(this.queryParams).then((response) => {
        //判断角色是否包含片区主管
        // var flag=0
        // for(var i=0;i<this.userRoles.length;i++) {
        //   if(this.userRoles[i]=="greenhouse_director"){
        //     flag=1
        //   }
        // }
        // if(flag==1){
        //   this.applyTemporaryList.length = 0;
        //   for(var j=0;j<response.rows.length;j++){
        //     if(this.userName==(response.rows[j].createBy)){
        //       this.applyTemporaryList.push(response.rows[j])
        //     }
        //   }
        // }
        // else {
        this.applyTemporaryList = response.rows;
        // }
        this.total = response.total;
        this.loading = false;
        this.formdata_type(this.applyTemporaryList);
        this.formdata_userList(this.applyTemporaryList);
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
        graftingclipApplyId: null,
        orderAllocationId: null,
        graftingclipTypeId: null,
        originPlace: null,
        graftingclipSpecification: null,
        originCompany: null,
        orderId: null,
        applyAmount: null,
        applyTime: null,
        userId: null,
        approvalStatusProduct: null,
        approvalStatusTechnology: null,
        consumeStatus: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产资料管理",
        menuName2: "审核临时生产资料",
        menuName3: "嫁接夹临时审核",
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
      this.daterangeApplyTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.graftingclipApplyTemporaryId);
      this.approvalStatusProducts = selection.map(
        (item) => item.approvalStatusProduct
      );
      this.approvalStatusTechnologys = selection.map(
        (item) => item.approvalStatusTechnology
      );
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.xg = 0;
      this.open = true;
      this.title = "添加嫁接夹临时申请领用详细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const graftingclipApplyTemporaryId =
        row.graftingclipApplyTemporaryId || this.ids;
      getApplyTemporary(graftingclipApplyTemporaryId).then((response) => {
        this.form = response.data;
        this.xg = 1;
        this.open = true;
        this.title = "修改嫁接夹临时申请领用详细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.graftingclipApplyTemporaryId != null) {
            updateApplyTemporary(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.approvalStatusProduct = 0;
            this.form.approvalStatusTechnology = 0;
            addApplyTemporary(this.form).then((response) => {
              addNews(this.form2).then((response) => {
                bus.$emit("getTodoNum");
              });
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
      this.reset();
      let that = this;
      that.form2 = this.form2;
      const graftingclipApplyTemporaryIds =
        row.graftingclipApplyTemporaryId || this.ids;
      this.$confirm("是否确认删除该嫁接夹临时申请领用详细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delApplyTemporary(graftingclipApplyTemporaryIds).then(
            (response) => {
              delNews1(that.form2).then((response) => {
                bus.$emit("getTodoNum");
              });
            }
          );
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
        for (let i = 0; i < this.applyTemporaryList.length; i++) {
          queryParams.exportIds.push(this.applyTemporaryList[i].graftingclipApplyTemporaryId);
        }
      } else if (this.ids.length != 0) {
        queryParams.exportIds = this.ids;
      }
      this.$confirm("是否确认导出所有嫁接夹临时申请领用详细数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportApplyTemporary(queryParams);
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
