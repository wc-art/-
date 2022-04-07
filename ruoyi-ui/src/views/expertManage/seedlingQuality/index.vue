<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="expertdbTitle">
        <el-input v-model="queryParams.expertdbTitle" placeholder="请输入标题" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="简介" prop="expertdbBriefIntroduction">
        <el-input v-model="queryParams.expertdbBriefIntroduction" placeholder="请输入简介" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="发布时间" prop="createTime">
        <el-input v-model="queryParams.createTime" placeholder="请输入发布时间" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="发布人" prop="createBy">
        <el-input v-model="queryParams.createBy" placeholder="请输入发布人" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['expertManage:seedlingQuality:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['expertManage:seedlingQuality:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['expertManage:seedlingQuality:remove']">删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="expertList" :row-class-name="rowClassName" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="xh" />
      <el-table-column label="标题" align="center" prop="expertdbTitle" />
      <el-table-column label="简介" align="center" prop="expertdbBriefIntroduction" />
      <el-table-column label="发布时间" align="center" prop="createTime" />
      <el-table-column label="发布人" align="center" prop="createBy" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDetailed(scope.row)"
            v-hasPermi="['expertManage:seedlingQuality:detailed']">详情</el-button>
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['expertManage:seedlingQuality:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['expertManage:seedlingQuality:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <add-or-update :title="title" :open="open" :form="form" :rules="rules" @reset="reset" @cancel="cancel"
      @getList="getList" categoryName="种苗质量标准" from="expert_quality"></add-or-update>

    <detailed title="种苗质量标准详情" :openDetailed="openDetailed" :form="form" @cancelDetailed="cancelDetailed"
      categoryName="种苗质量标准" from="expert_quality"></detailed>
  </div>
</template>

<script>
  import { listSeedling, getSeedling, delSeedling } from "@/api/expertManage/seedling";
  import AddOrUpdate from '../AddOrUpdate'
  import Detailed from '../Detailed'

  export default {
    name: "SeedlingQuality",
    components: {
      AddOrUpdate,
      Detailed
    },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 导出遮罩层
        exportLoading: false,
        // 选中数组
        ids: [],
        // 选中删除的序号数组
        xhs: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 能耗信息表格数据
        expertList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 是否显示详情弹出层
        openDetailed: false,
        // 查询参数
        queryParams: {
orderByColumn:"create_time",
          pageNum: 1,
          pageSize: 10,
          expertdbTitle: null,
          expertdbBriefIntroduction: null,
          expertdbDetails: null,
          createBy: null,
          createTime: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          expertdbTitle: [
            { required: true, message: "标题不能为空", trigger: "blur" }
          ],
          expertdbBriefIntroduction: [
            { required: true, message: "简介不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getList()
    },
    methods: {
      // 序号
      rowClassName({ row, rowIndex }) {
        row.xh = rowIndex + 1;
      },
      /** 查询种苗质量标准列表 */
      getList() {
        this.loading = true;
        listSeedling(this.queryParams).then(response => {
          this.expertList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消添加修改按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 取消详情按钮
      cancelDetailed() {
        this.openDetailed = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          from: 'expert_quality',
          expertdbId: null,
          expertdbTitle: null,
          expertdbBriefIntroduction: null,
          expertdbDetails: null,
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
        this.ids = selection.map(item => item.expertdbId)
        this.xhs = selection.map(item => item.xh)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加种苗质量标准";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const expertIds = row.expertdbId || this.ids[0]
        getSeedling(expertIds).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改种苗质量标准";
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const expertIds = row.expertdbId || this.ids;
        const xh = row.xh || this.xhs
        this.$confirm('是否确认删除种苗质量标准序号为"' + xh + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delSeedling(expertIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch((err) => { console.log(err) });
      },
      // 详情按钮操作
      handleDetailed(row) {
        this.reset()
        const expertId = row.expertdbId || this.ids
        getSeedling(expertId).then(response => {
          this.form = response.data;
          this.openDetailed = true;
          this.title = "种苗质量标准详情";
        });
      }
    }
  };
</script>