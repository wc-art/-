<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="编号" prop="greenhouseId">
        <el-input
          v-model="queryParams.greenhouseId"
          placeholder="请输入编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="片区名称" prop="areaId">
        <el-select v-model="queryParams.areaId" placeholder="请选择片区名称" clearable size="small">
          <el-option
            v-for="ID in areaimform"
            :key="ID.areaId"
            :value="ID.areaId"
            :label="ID.areaName"
          ></el-option>
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
          v-hasPermi="['system:greenhouse:add']"
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
          v-hasPermi="['system:greenhouse:edit']"
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
          v-hasPermi="['system:greenhouse:remove']"
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
          v-hasPermi="['system:greenhouse:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="greenhouseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="编号" align="center" prop="greenhouseId" />
      <el-table-column label="大棚名称" align="center" prop="greenhouseName" />
      <el-table-column label="大棚类型" align="center" prop="greenhouseType" :formatter="greenhouseTypeFormat" />
      <el-table-column label="面积" align="center" prop="acreage" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="片区编号" align="center" prop="areaId" />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:greenhouse:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:greenhouse:remove']"
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

    <!-- 添加或修改大棚管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="大棚名称" prop="greenhouseName">
          <el-input v-model="form.greenhouseName" placeholder="请输入大棚名称" />
        </el-form-item>
        <el-form-item label="大棚类型" prop="greenhouseType">
          <el-select v-model="form.greenhouseType" placeholder="请选择大棚类型">
            <el-option
              v-for="dict in greenhouseTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面积" prop="acreage">
          <el-input v-model.number="form.acreage" placeholder="请输入面积" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="片区编号" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择片区名称" clearable size="small">
            <el-option
              v-for="ID in areaimform"
              :key="ID.areaId"
              :value="ID.areaId"
              :label="ID.areaName"
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
import { listGreenhouse, getGreenhouse, delGreenhouse, addGreenhouse, updateGreenhouse, exportGreenhouse,listarea } from "@/api/system/greenhouse";

export default {
  name: "Greenhouse",
  components: {
  },
  data() {
    return {
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
      // 大棚管理表格数据
      greenhouseList: [],
      // 弹出层标题
      title: "",
      //存放area的来自数据库的全部信息
      areaimform:[],
      // 是否显示弹出层
      open: false,
      // 大棚类型日光温室 | 连栋温室 | 塑料大棚字典
      greenhouseTypeOptions: [],
      // 查询参数
      queryParams: {
orderByColumn:"create_time",
        pageNum: 1,
        pageSize: 10,
        greenhouseId: null,
        areaId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        greenhouseName: [
          { required: true, message: "大棚名称不能为空", trigger: "blur" }
        ],
        greenhouseType: [
          { required: true, message: "大棚类型不能为空", trigger: "change" }
        ],
        acreage: [
          { required: true, message: "面积不能为空", trigger: "blur" },
          { required: true, message:"请输入数字" ,type : "number",trigger: "blur"}
        ],
        unit: [
          { required: true, message: "单位 默认平方米不能为空", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "片区编号不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getareaimform();
    this.getDicts("greenhouse_types").then(response => {
      this.greenhouseTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询大棚管理列表 */
    getList() {
      this.loading = true;
      listGreenhouse(this.queryParams).then(response => {
        this.greenhouseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**将area信息放在定义的areaimform数组中**/
    getareaimform(){
      listarea().then(response=>{
        console.log(response)
        this.areaimform=response.rows;
      })
    },
    // 大棚类型日光温室 | 连栋温室 | 塑料大棚字典翻译
    greenhouseTypeFormat(row, column) {
      return this.selectDictLabel(this.greenhouseTypeOptions, row.greenhouseType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        greenhouseId: null,
        greenhouseName: null,
        greenhouseType: null,
        acreage: null,
        unit: null,
        areaId: null,
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
      this.ids = selection.map(item => item.greenhouseId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加大棚管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const greenhouseId = row.greenhouseId || this.ids
      getGreenhouse(greenhouseId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改大棚管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.greenhouseId != null) {
            updateGreenhouse(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGreenhouse(this.form).then(response => {
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
      const greenhouseIds = row.greenhouseId || this.ids;
      this.$confirm('是否确认删除该大棚管理信息?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delGreenhouse(greenhouseIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有大棚管理数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.exportLoading = true;
        return exportGreenhouse(queryParams);
      }).then(response => {
        this.download(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
