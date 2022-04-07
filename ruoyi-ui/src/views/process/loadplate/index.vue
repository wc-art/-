<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="订单编号" prop="orderId">
        <el-select
          v-model="queryParams.orderId"
          placeholder="请选择订单编号"
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
      <el-form-item label="用户名称" prop="userId">
        <el-select
          v-model="queryParams.userId"
          placeholder="请选择用户名称"
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
      <el-form-item label="工作时间" prop="workTime">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.workTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择工作时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作地点" prop="workPlace">
        <el-select
          v-model="queryParams.workPlace"
          placeholder="请输入工作地点"
          clearable
          filterable
          allow-create
          size="small"
        >
          <el-option
            v-for="ID in greenhouse_ID"
            :key="ID.greenhouseName"
            :value="ID.greenhouseName"
            :label="ID.greenhouseName"
          ></el-option>
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
          v-hasPermi="['process:loadplate:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn()||single"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['process:loadplate:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-bind:disabled="setTopBtn()||multiple"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['process:loadplate:remove']"
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
          v-hasPermi="['process:loadplate:export']"
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
      :data="loadplateList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="订单名称" align="center" prop="orderName" />
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column
        label="工作时间"
        align="center"
        prop="workTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作地点" align="center" prop="workPlace" />
      <el-table-column label="工作量" align="center" prop="workLoad" />
      <el-table-column
        label="工作量单位"
        align="center"
        prop="workUnit"
        width="90"
      />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="审批" align="center" prop="approval" width="140px">
        <template slot-scope="scope">
          <span>
            {{ approvalStatus[scope.row.approval] }}
          </span>
          <div style="display: flex">
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-check"
              @click="handlethrough(scope.row)"
              v-hasPermi="['process:loadplate:permit']"
              >通过</el-button
            >
            <el-button
              v-bind:disabled="setpassBtn1(scope.row)"
              size="mini"
              type="text"
              icon="el-icon-close"
              @click="handleNotThrough(scope.row)"
              v-hasPermi="['process:loadplate:permit']"
              >不通过</el-button
            >
          </div>
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
            v-hasPermi="['process:loadplate:edit']"
            >修改</el-button
          >
          <el-button
            v-bind:disabled="setEditBtn(scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['process:loadplate:remove']"
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

    <!-- 添加或修改装盘管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="订单编号" prop="orderId">
          <el-select
            v-model="form.orderId"
            placeholder="请选择订单编号"
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
        <el-form-item label="用户名称" prop="userId">
          <el-select
            v-model="form.userId"
            placeholder="请选择用户名称"
            clearable
            size="small"
          >
            <el-option
              v-for="Id in userAdd"
              :key="Id.userId"
              :value="Id.userId"
              :label="Id.userAddName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作时间" prop="workTime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.workTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择工作时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作地点" prop="workPlace">
          <el-select
            v-model="form.workPlace"
            placeholder="请输入工作地点"
            clearable
            filterable
            allow-create
            size="small"
          >
            <el-option
              v-for="ID in greenhouse_ID"
              :key="ID.greenhouseName"
              :value="ID.greenhouseName"
              :label="ID.greenhouseName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作量" prop="workLoad">
          <el-input v-model.number="form.workLoad" placeholder="请输入工作量" />
        </el-form-item>
        <el-form-item label="工作量单位" prop="workUnit">
          <el-input v-model="form.workUnit" placeholder="请输入工作量单位" />
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
  import { listNews, getNews, delNews,delNews1, addNews, updateNews, exportNews } from "@/api/news/news";
  import bus from '@/utils/bus'
import {
  listLoadplate,
  getLoadplate,
  delLoadplate,
  addLoadplate,
  updateLoadplate,
  exportLoadplate,
  listUser,
  listOrder,
  listgreenhouse,
} from "@/api/process/loadplate";
import { getUserId } from "@/api/system/user";
import { getUsergreenhouse, listUsergreenhouse } from "@/api/as/usergreenhouse";
export default {
  name: "Loadplate",
  components: {},
  data() {
    return {
      userId: null,
      userName: null,
      userRoles: [],
      //flag=1代表棚员，flag=2代表棚长和片区主管，来筛选自己大棚相关的人的数据
      flag: 0,
      userAsSet: [],
      //存放与用户有关联的greenhouseId
      greenhouseIds: [],
      greenhouseNames: [],
      //审批状态
      approvalStatus: {
        0: "未审批",
        1: "审批通过",
        2: "未通过",
      },

      user_ID: [],
      userAdd_ID: [],
      userAdd: [],
      order_ID: [],
      greenhouse_ID: [],
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
      // 装盘管理表格数据
      loadplateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        workLoadplateIds:[],
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderId: null,
        workTime: null,
        workPlace: null,
      },
      // 表单参数
      form: {},
      form2: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户编号不能为空", trigger: "change" },
        ],
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "change" },
        ],
        workTime: [
          { required: true, message: "工作时间不能为空", trigger: "blur" },
        ],
        workPlace: [
          { required: true, message: "工作地点不能为空", trigger: "change" },
        ],
        workLoad: [
          { required: true, message: "工作量不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
        workUnit: [
          { required: true, message: "工作量单位不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    console.log("当前user名称", this.$store.getters.name);
    console.log("当前用户的角色", this.$store.getters.roles);
    this.userRoles = this.$store.getters.roles;
    for (var i = 0; i < this.userRoles.length; i++) {
      //只有是片区主管，棚长，棚员角色的用户才“看自己的”
      if (
        this.userRoles[i] == "area_director" ||
        this.userRoles[i] == "greenhouse_director" ||
        this.userRoles[i] == "greenhouse_employee"
      ) {
        this.userName = this.$store.getters.name;
      }
    }

    Promise.all([
      this.getUserId(),
      this.getgreenhouseID(),
      this.getuserID(),
      this.getorderID(),
    ]).then((res) => {
      this.getList();
    });
  },
  methods: {
    setTopBtn() {
      for (var i = 0; i < this.approval.length; i++) {
        if (
          (this.approval[i] != "0" ||
            this.single == true ||
            this.multiple == true) &&
          this.$store.getters.name != "admin"
        ) {
          return true;
        } else return false;
      }
    },
    //控制审核后修改删除按钮
    setEditBtn(row) {
      if (row.approval != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },
    //片区主管审核后，不能再按通过和不通过按钮
    setpassBtn1(row) {
      if (row.approval != "0" && this.$store.getters.name != "admin") {
        return true;
      } else return false;
    },
    //根据用户名获取用户id,且根据用户id获取关联的大棚id
    getUserId() {
      return new Promise((resolve, rejected) => {
        if (this.userName != null) {
          getUserId({ userName: this.userName }).then((response) => {
            this.userId = response.data;
            var _self = this;
            //取与用户有关联的大棚id
            getUsergreenhouse(this.userId).then((response) => {
              var addId = this.userId;
              if (response.data.length != 0) {
                _self.greenhouseIds.length = 0;
                for (var i = 0; i < response.data.length; i++) {
                  _self.greenhouseIds.push(response.data[i].greenhouseId);
                }
                this.userRoles = this.$store.getters.roles;
                for (var i = 0; i < this.userRoles.length; i++) {
                  if (
                    this.userRoles[i] == "greenhouse_director" ||
                    this.userRoles[i] == "area_director"
                  ) {
                    this.flag = 2;
                    break;
                  }
                  if (this.userRoles[i] == "greenhouse_employee") this.flag = 1;
                } //只是棚员，添加的用户只能是自己
                if (this.flag == 1) {
                  this.userAdd_ID.push(addId);
                } else if (this.flag == 2) {
                  //是棚长
                  var _self1 = this;
                  for (var i = 0; i < _self.greenhouseIds.length; i++) {
                    listUsergreenhouse({
                      greenhouseId: _self.greenhouseIds[i],
                    }).then((res) => {
                      for (var j = 0; j < res.rows.length; j++) {
                        _self1.userAdd_ID.push(res.rows[j].userId);
                      }
                    });
                  }
                  _self.userAdd_ID = _self1.userAdd_ID;
                  this.userAsSet = _self.userAdd_ID;
                }
              }
              resolve();
            });
          });
        } else resolve();
      });
    },
    /**通过按钮操作*/
    handlethrough(row) {
      this.reset()
      this.form2.approvalBy="area_director"
      let that=this
      that.form2=this.form2
      this.form.note = "tonguo";
      const workLoadplateId = row.workLoadplateId || this.ids;
      let data = {};
      data.workLoadplateId = workLoadplateId;
      data.approval = 1;
      this.$confirm("是否确认通过该申请信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateLoadplate(data).then((response) => {
            console.log(response);

            delNews(that.form2).then(response => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit('getTodoNum')
            });

          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    /**不通过按钮操作*/
    handleNotThrough(row) {
      this.reset()
      this.form2.approvalBy="area_director"
      let that=this
      that.form2=this.form2
      const workLoadplateId = row.workLoadplateId || this.ids;
      let data = {};
      data.workLoadplateId = workLoadplateId;
      data.approval = 2;
      this.$confirm("是否确认不通过该申请信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateLoadplate(data).then((response) => {
            console.log(response);

            delNews(that.form2).then(response => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit('getTodoNum')
            });

          });
        })
        .then(() => {
          this.getList();
        })
        .catch(() => {});
    },
    /**获取订单名称*/
    formdata_loadplateOrderList(data) {
      let loadplate_type_map = new Map();
      this.order_ID.forEach((type) => {
        loadplate_type_map.set(type.orderId, type.orderName);
      });
      data.forEach((type) => {
        let order_name = loadplate_type_map.get(type.orderId);
        type.orderName = order_name;
      });
    },
    /**获取用户名称*/
    formdata_loadplateUserList(data) {
      let loadplate_type_map = new Map();
      this.user_ID.forEach((type) => {
        loadplate_type_map.set(type.userId, type.userName);
      });
      data.forEach((type) => {
        let user_name = loadplate_type_map.get(type.userId);
        type.userName = user_name;
      });
    },
    /** 查询装盘管理列表 */
    getList() {
      this.loading = true;
      // //存放符合条件的greenhouseNames
      // this.greenhouseNames.length=0;
      // for(var i=0;i<this.greenhouseIds.length;i++){
      //   for(var j=0;j<this.greenhouse_ID.length;j++){
      //     if(this.greenhouseIds[i]==this.greenhouse_ID[j].greenhouseId){
      //       this.greenhouseNames.push(this.greenhouse_ID[j].greenhouseName)
      //     }
      //   }
      // }
      //查询列表
      listLoadplate(this.queryParams).then((response) => {
        console.log("this.flag", this.flag);
        // 前端数据筛选
        // if (this.flag == 1) {
        //   console.log("我是棚员");
        //   this.loadplateList = [];
        //   for (var j = 0; j < response.rows.length; j++) {
        //     console.log("response", response);
        //     if (this.userId == response.rows[j].userId) {
        //       this.loadplateList.push(response.rows[j]);
        //     }
        //   }
        // } else if (this.flag == 2) {
        //   console.log("我是棚长或片区主管");
        //   console.log("相关的用户id", this.userAsSet);
        //   this.loadplateList = [];
        //   //用userAsSet2来去重this.userAsSet
        //   var userAsSet2 = [];
        //   for (var i = 0; i < this.userAsSet.length; i++) {
        //     console.log("222");
        //     for (var j = i + 1; j < this.userAsSet.length; j++) {
        //       if (this.userAsSet[i] === this.userAsSet[j]) {
        //         i++;
        //         j = i;
        //       }
        //     }
        //     userAsSet2.push(this.userAsSet[i]);
        //   }

        //   for (var i = 0; i < userAsSet2.length; i++) {
        //     for (var j = 0; j < response.rows.length; j++) {
        //       if (userAsSet2[i] == response.rows[j].userId) {
        //         this.loadplateList.push(response.rows[j]);
        //       }
        //     }
        //   }
        // } else {
          this.loadplateList = response.rows;
        // }
        console.log("this.loadplateList", this.loadplateList);
        this.total = response.total;
        this.loading = false;
        this.formdata_loadplateOrderList(this.loadplateList);
        this.formdata_loadplateUserList(this.loadplateList);
        this.userAdd_ID = [...new Set(this.userAdd_ID)];
        this.formdata_addUser(this.userAdd);
      });
    },

    formdata_addUser(data) {
      let useradd_map = new Map();
      this.user_ID.forEach((type) => {
        useradd_map.set(type.userId, type.userName);
      });
      this.userAdd_ID.forEach((type, index) => {
        let user_add_name = useradd_map.get(type);
        data[index] = { userId: type, userAddName: user_add_name };
      });
    },

    getuserID() {
      return new Promise((resolve, rejected) => {
        var _self = this;
        listUser().then((response) => {
          this.user_ID = response.rows;
          this.userRoles = this.$store.getters.roles;
          for (var i = 0; i < this.userRoles.length; i++) {
            if (this.userRoles[i] == "admin") {
              for (var j = 0; j < response.rows.length; j++)
                _self.userAdd_ID.push(response.rows[j].userId);
            }
          }
          resolve();
        });
      });
    },
    getorderID() {
      return new Promise((resolve, rejected) => {
        listOrder().then((response) => {
          this.order_ID = response.rows;
          resolve();
        });
      });
    },
    getgreenhouseID() {
      return new Promise((resolve, rejected) => {
        listgreenhouse().then((response) => {
          //console.log(response)
          this.greenhouse_ID = response.rows;
          resolve();
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
        workLoadplateId: null,
        userId: null,
        orderId: null,
        workTime: null,
        workPlace: null,
        workLoad: null,
        workUnit: null,
        note: null,
        approval: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.form2 = {
        newsId: null,
        menuName1: "生产过程管理",
        menuName2: "装盘管理",
        menuName3: null,
        approvalStatus: 0,
        // 用来存储审核人的角色字符，用于删除的时候，在delete的时候赋值
        approvalBy: null,
        //用来存储该处数据的所有审核人，用于添加的时候，在这里初始化
        approvalBys: ["area_director"],
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
      this.ids = selection.map((item) => item.workLoadplateId);
      this.approval = selection.map(item => item.approval)
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加装盘管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const workLoadplateId = row.workLoadplateId || this.ids;
      getLoadplate(workLoadplateId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改装盘管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.workLoadplateId != null) {
            updateLoadplate(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLoadplate(this.form).then((response) => {

              addNews(this.form2).then(response => {
                // this.msgSuccess("新增成功");
                // this.open = false;
                // this.getList();
                bus.$emit('getTodoNum')
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
      let that=this
      that.form2=this.form2
      const workLoadplateIds = row.workLoadplateId || this.ids;
      this.$confirm("是否确认删除该装盘管理信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delLoadplate(workLoadplateIds).then(response=>{

            console.log("that.form2",that.form2)
            delNews1(that.form2).then(response => {
              // this.msgSuccess("新增成功");
              // this.open = false;
              // this.getList();
              bus.$emit('getTodoNum')
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
      queryParams.workLoadplateIds=[]
      if(this.ids.length==0){
        for(var i=0;i<this.loadplateList.length;i++){
          queryParams.workLoadplateIds.push(this.loadplateList[i].workLoadplateId)
        }
      }
      else if(this.ids.length!=0) {
        queryParams.workLoadplateIds = this.ids
      }
      this.$confirm("是否确认导出所有装盘管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportLoadplate(queryParams);
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
