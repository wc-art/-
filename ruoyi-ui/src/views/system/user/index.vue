<template>
  <div class="app-container">
    <!--    <el-row :gutter="20">-->
    <!--      &lt;!&ndash;部门数据&ndash;&gt;-->
    <!--      <el-col :span="4" :xs="24">-->
    <!--        <div class="head-container">-->
    <!--          <el-input-->
    <!--            v-model="deptName"-->
    <!--            placeholder="请输入部门名称"-->
    <!--            clearable-->
    <!--            size="small"-->
    <!--            prefix-icon="el-icon-search"-->
    <!--            style="margin-bottom: 20px"-->
    <!--          />-->
    <!--        </div>-->

    <!--        <div class="head-container">-->
    <!--          <el-tree-->
    <!--            :data="deptOptions"-->
    <!--            :props="defaultProps"-->
    <!--            :expand-on-click-node="false"-->
    <!--            :filter-node-method="filterNode"-->
    <!--            ref="tree"-->
    <!--            default-expand-all-->
    <!--            @node-click="handleNodeClick"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--用户数据-->
    <!--      <el-col :span="20" :xs="24">-->
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="年龄" prop="phonenumber">
        <el-input
          v-model="queryParams.age"
          placeholder="请输入年龄"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="用户状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>

        <!--            <el-form-item label="入职时间">-->
        <!--              <el-date-picker-->
        <!--                v-model="dateRange"-->
        <!--                size="small"-->
        <!--                style="width: 240px"-->
        <!--                value-format="yyyy-MM-dd"-->
        <!--                type="daterange"-->
        <!--                range-separator="-"-->
        <!--                start-placeholder="开始日期"-->
        <!--                end-placeholder="结束日期"-->
        <!--              ></el-date-picker>-->
        <el-form-item label="入职时间" prop="entrytime" label-width="85px">
          <el-date-picker
            v-model="queryParams.entrytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form-item>

      <!--          </el-form-item>-->
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
          v-hasPermi="['system:user:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['system:user:import']"
          >导入</el-button
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
          v-hasPermi="['system:user:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="userList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        label="用户编号"
        align="center"
        key="userId"
        type="index"
        v-if="columns[0].visible"
      />
      <el-table-column
        label="用户名称"
        align="center"
        key="userName"
        prop="userName"
        v-if="columns[1].visible"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="用户昵称"
        align="center"
        key="nickName"
        prop="nickName"
        v-if="columns[2].visible"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="手机号码"
        align="center"
        key="phonenumber"
        prop="phonenumber"
        v-if="columns[3].visible"
        width="120"
      />
      <el-table-column
        label="年龄"
        align="center"
        key="age"
        prop="age"
        v-if="columns[4].visible"
        width="120"
      />
      <el-table-column
        label="状态"
        align="center"
        key="status"
        v-if="columns[5].visible"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <!--          <el-table-column label="入职时间" align="center" prop="entrytime" v-if="columns[6].visible" width="160">-->
      <!--            <template slot-scope="scope">-->
      <!--              <span>{{ parseTime(scope.row.entrytime) }}</span>-->
      <!--            </template>-->
      <!--          </el-table-column>-->
      <el-table-column
        label="入职时间"
        align="center"
        prop="entrytime"
        v-if="columns[6].visible"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entrytime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        v-if="columns[7].visible"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:user:edit']"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.userId !== 1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-key"
            @click="handleResetPwd(scope.row)"
            v-hasPermi="['system:user:resetPwd']"
            >重置</el-button
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
    <!--      </el-col>-->

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      append-to-body
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户名称"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入职时间" prop="entrytime">
              <el-date-picker
                clearable
                size="small"
                v-model="form.entrytime"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择入职时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select
                v-model="form.roleIds"
                multiple
                placeholder="请选择"
                @change="isMustArea"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form
              ref="form2"
              :model="form2"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item label="常育作物" v-if="flag1 == null">
                <el-select
                  v-model="form2.cropTypeIds"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in cropTypeOptions"
                    :key="item.cropTypeId"
                    :label="item.cropType"
                    :value="item.cropTypeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="12">
            <el-form
              ref="form2"
              :model="form2"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item label="常育作物" prop="crop" v-if="flag1 != null">
                <el-select
                  v-model="form2.cropTypeIds"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in cropTypeOptions"
                    :key="item.cropTypeId"
                    :label="item.cropType"
                    :value="item.cropTypeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>

          <!--         设置两类输入框，动态设置必填项1-->
          <el-col :span="12">
            <el-form
              ref="form3"
              :model="form3"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item
                label="片区名称"
                v-if="flag2 == null && flag1 == null"
              >
                <el-select
                  v-model="form3.areaIds"
                  multiple
                  placeholder="请选择"
                  @change="selectgreenhouse"
                >
                  <el-option
                    v-for="ID in areaOptions"
                    :key="ID.areaId"
                    :value="ID.areaId"
                    :label="ID.areaName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <!--          加了必填校验2-->
          <el-col :span="12">
            <el-form
              ref="form3"
              :model="form3"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item
                label="片区名称"
                prop="areaId"
                v-if="flag2 != null || flag1 != null"
              >
                <el-select
                  v-model="form3.areaIds"
                  multiple
                  placeholder="请选择"
                  @change="selectgreenhouse"
                >
                  <el-option
                    v-for="ID in areaOptions"
                    :key="ID.areaId"
                    :value="ID.areaId"
                    :label="ID.areaName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form
              ref="form4"
              :model="form4"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item label="大棚名称" v-if="flag1 == null">
                <el-select
                  v-model="form4.greenhouseIds"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="ID in greenhouseOptions"
                    :key="ID.greenhouseId"
                    :value="ID.greenhouseId"
                    :label="ID.greenhouseName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="12">
            <el-form
              ref="form4"
              :model="form4"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item
                label="大棚名称"
                prop="greenhouseId"
                v-if="flag1 != null"
              >
                <el-select
                  v-model="form4.greenhouseIds"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="ID in greenhouseOptions"
                    :key="ID.greenhouseId"
                    :value="ID.greenhouseId"
                    :label="ID.greenhouseName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox
            v-model="upload.updateSupport"
          />是否更新已经存在的用户数据
          <el-link type="info" style="font-size: 12px" @click="importTemplate"
            >下载模板</el-link
          >
        </div>
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUsercrop,
  addUsercrop,
  updateUsercrop,
  getUsercrop,
  delUsercrop,
} from "@/api/as/usercrop";
import {
  listUserarea,
  addUserarea,
  updateUserarea,
  getUserarea,
  delUserarea,
} from "@/api/as/userarea";
import {
  listUsergreenhouse,
  addUsergreenhouse,
  updateUsergreenhouse,
  getUsergreenhouse,
  delUsergreenhouse,
} from "@/api/as/usergreenhouse";
import { listCropType } from "@/api/production/seed/cropType";
import { listarea, listGreenhouse } from "@/api/basic_info/greenhouse";
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  exportUser,
  resetUserPwd,
  changeUserStatus,
  importTemplate,
} from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  components: { Treeselect },
  data() {
    return {
      //标识角色是否包棚长棚员片区主管来设置必填项
      flag1: null,
      flag2: null,
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      cropTypeOptions: [],
      areaOptions: [],
      greenhouseOptions: [],
      // 表单参数
      form: {},
      form2: {},
      form3: {},
      form4: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 查询参数
      queryParams: {
        orderByColumn: "create_time",
        sysuserIds: [],
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        age: undefined,
        entrytime: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `手机号码`, visible: true },
        { key: 4, label: `年龄`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `入职时间`, visible: true },
        { key: 7, label: `创建时间`, visible: true },
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],

        crop: [
          { required: true, message: "片区名称不能为空", trigger: "blur" },
        ],
        areaId: [
          { required: true, message: "片区名称不能为空", trigger: "blur" },
        ],
        greenhouseId: [
          { required: true, message: "片区名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getcrop();
    this.getareaimform();
    // this.getgreenhouse();
    this.getList();
    this.getTreeselect();
    this.getDicts("sys_normal_disable").then((response) => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then((response) => {
      this.sexOptions = response.data;
    });
    this.getConfigKey("sys.user.initPassword").then((response) => {
      this.initPassword = response.msg;
    });
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.userList = response.rows;
          console.log("userlist", this.userList);
          this.total = response.total;
          this.loading = false;
        }
      );
    },

    /**将crop信息放在定义的cropTypeOptions数组中**/
    getcrop() {
      this.loading = true;
      listCropType(this.croptype).then((response) => {
        console.log("常育作物response", response);
        this.cropTypeOptions = response.rows;
        console.log("cropTypeOptions", this.cropTypeOptions);
        this.total = response.total;
        this.loading = false;
      });
    },

    /**将area信息放在定义的areaOptions数组中**/
    getareaimform() {
      listarea().then((response) => {
        console.log("片区列表response", response);
        this.areaOptions = response.rows;
        console.log("areaOptions", this.areaOptions);
      });
    },

    /**将greenhouse信息放在定义的greenhouseOptions数组中**/
    // getgreenhouse(){
    //   listGreenhouse().then(response=>{
    //     console.log("大棚列表response",response)
    //     this.greenhouseOptions=response.rows;
    //     console.log("greenhouseOptions",this.greenhouseOptions)
    //   })
    // },

    //根据片区选大棚
    selectgreenhouse(values) {
      console.log("values:", values);
      //重新再选大棚
      this.form4.greenhouseIds = [];
      this.greenhouseOptions = [];
      listGreenhouse().then((response) => {
        for (let i = 0; i < values.length; i++) {
          var value = values[i];
          console.log("value:", value);
          for (let j = 0; j < response.rows.length; j++) {
            console.log("response.rows[].areaId:", response.rows[j].areaId);
            if (response.rows[j].areaId == value) {
              console.log(
                "匹配到的greenhouseId:",
                response.rows[j].greenhouseId
              );
              this.greenhouseOptions.push(response.rows[j]);
              console.log("this.greenhouseOptions", this.greenhouseOptions);
            }
          }
        }
      });
    },

    close() {
      this.flag1 = null;
      this.flag2 = null;
    },
    //角色包含片区主管,棚长棚员的时候设为必填
    isMustArea(values) {
      this.flag1 = null;
      this.flag2 = null;

      //角色包含片区主管
      for (var i = 0; i < this.form.roleIds.length; i++) {
        //角色包含棚长或棚员角色
        if (this.form.roleIds[i] == 7 || this.form.roleIds[i] == 8) {
          this.flag1 = 1;
        }

        //角色包含片区主管
        if (this.form.roleIds[i] == 6) {
          this.flag2 = 1;
        }
      }
    },

    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.userName + '"用户吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      //传给用户表的
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        age: undefined,
        entrytime: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
      };
      //传给用户常育作物关联表的
      this.form2 = {
        userId: undefined,
        cropTypeIds: [],
      };
      //传给用户片区关联表的
      this.form3 = {
        userId: undefined,
        areaIds: [],
      };
      //传给用户大棚关联表的
      this.form4 = {
        userId: undefined,
        greenhouseIds: [],
      };
      this.resetForm("form");
      this.resetForm("form2");
      this.resetForm("form3");
      this.resetForm("form4");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeselect();
      getUser().then((response) => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加用户";
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const userId = row.userId || this.ids;
      //获取用户数据回显
      getUser(userId).then((response) => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        console.log("roleOptions", this.roleOptions);
        console.log("roleIds", this.form.roleIds);
        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });

      //获取作物数据回显
      getUsercrop(userId).then((response) => {
        // 有的用户没有关联数据，就不做其他操作
        if (response.data.length == 0) {
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        } else {
          this.form2.userId = userId;
          console.log("response", response);
          console.log(
            "datalenth",
            response.data.length,
            response.data[0].cropTypeId
          );
          this.form2.cropTypeIds = [];
          for (var i = 0; i < response.data.length; i++) {
            // this.form2.cropTypeIds[i] = response.data[i].cropTypeId;
            this.form2.cropTypeIds.push(response.data[i].cropTypeId);
          }
          console.log("cropTypeIds", this.form2.cropTypeIds);
          console.log("cropTypeOptions", this.cropTypeOptions);
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        }
      });

      //获取片区数据回显
      getUserarea(userId).then((response) => {
        // 有的用户没有关联数据，就不做其他操作
        if (response.data.length == 0) {
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        } else {
          this.form3.userId = userId;
          console.log("response", response);
          console.log(
            "datalenth",
            response.data.length,
            response.data[0].areaId
          );
          this.form3.areaIds = [];
          for (var i = 0; i < response.data.length; i++) {
            this.form3.areaIds.push(response.data[i].areaId);
          }
          console.log("areaIds", this.form3.areaIds);
          console.log("areaOptions", this.areaOptions);
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        }
      });

      //获取大棚数据回显
      getUsergreenhouse(userId).then((response) => {
        // 有的用户没有关联数据，就不做其他操作
        if (response.data.length == 0) {
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        } else {
          this.form4.userId = userId;
          console.log("response", response);
          console.log(
            "datalength",
            response.data.length,
            response.data[0].areaId
          );
          this.form4.greenhouseIds = [];
          for (var i = 0; i < response.data.length; i++) {
            this.form4.greenhouseIds.push(response.data[i].greenhouseId);
          }
          console.log("greenhouseIds", this.form4.greenhouseIds);
          console.log("greenhouseOptions", this.greenhouseOptions);
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        }
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.msgSuccess("修改成功，新密码是：" + value);
          });
        })
        .catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //修改用户表
          if (this.form.userId != undefined) {
            let this1 = this;
            let this2 = this;
            let this3 = this;
            this1.form2.userId = this.form.userId;
            this2.form3.userId = this.form.userId;
            this3.form4.userId = this.form.userId;
            updateUser(this.form).then((response) => {
              //修改用户作物表
              if (
                this1.form2.userId != undefined &&
                this1.form2.cropTypeIds.length != 0
              ) {
                console.log("form2用户作物", this1.form2);
                updateUsercrop(this1.form2).then((response) => {
                  // this.msgSuccess("修改成功");
                  // this.open = false;
                  // this.getList();
                });
              }
              //修改用户片区表
              if (
                this2.form3.userId != undefined &&
                this2.form3.areaIds.length != 0
              ) {
                console.log("form3用户片区", this2.form3);
                updateUserarea(this2.form3).then((response) => {
                  // this.msgSuccess("修改成功");
                  // this.open = false;
                  // this.getList();
                });
              }
              //修改用户大棚表
              if (
                this3.form4.userId != undefined &&
                this3.form4.greenhouseIds.length != 0
              ) {
                console.log("form4用户大棚", this3.form4.userId);
                updateUsergreenhouse(this3.form4).then((response) => {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                });
              }

              this.getList();
            });
          } else {
            let that = this;
            let that2 = this;
            let that3 = this;
            addUser(this.form).then((response) => {
              console.log("6666");
              console.log("用户添加response：", response);
              that.form2.userId = response.data;
              that.form3.userId = response.data;
              that.form4.userId = response.data;
              // console.log("cropTypeIds.length",that.form2.cropTypeIds.length)
              if (that.form2.cropTypeIds.length != 0) {
                console.log("form2用户作物最终值：", that.form2);
                addUsercrop(that.form2).then((response) => {
                  // this.msgSuccess("新增成功");
                  // this.open = false;
                  // that.getList();
                });
              }

              if (that2.form3.areaIds.length != 0) {
                console.log("form3用户片区最终值：", that2.form3);
                addUserarea(that2.form3).then((response) => {
                  // this.msgSuccess("新增成功");
                  // this.open = false;
                  // that2.getList();
                });
              }

              if (that3.form4.greenhouseIds.length != 0) {
                console.log("form4用户大棚最终值：", that3.form4);
                addUsergreenhouse(that3.form4).then((response) => {
                  // this.msgSuccess("新增成功");
                  // this.open = false;
                  // that3.getList();
                });
              }

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
      const userIds = row.userId || this.ids;
      this.$confirm(
        "删除该用户会同时删除该用户对应的其他信息，是否确认删除该用户信息?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delUser(userIds);
          delUsercrop(userIds);
          delUserarea(userIds);
          delUsergreenhouse(userIds);
          this.getList();
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
      this.getList();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      queryParams.sysuserIds = [];
      if (this.ids.length == 0) {
        for (let i = 0; i < this.userList.length; i++) {
          queryParams.sysuserIds.push(this.userList[i].userId);
        }
      } else if (this.ids.length != 0) {
        queryParams.sysuserIds = this.ids;
      }
      this.$confirm("是否确认导出用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportUser(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then((response) => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
