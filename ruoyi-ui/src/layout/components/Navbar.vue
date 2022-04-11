<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      v-if="!topNav"
    />
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <!--        <el-tooltip content="源码地址" effect="dark" placement="bottom">-->
        <!--          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->

        <!--        <el-tooltip content="文档地址" effect="dark" placement="bottom">-->
        <!--          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!--&lt;!&ndash;加&ndash;&gt;-->

        <!--        <div class="oversee">-->
        <!--          <el-badge :value="todoNum" :hidden="isHidden" :max="99" class="item">-->
        <!--            <img src="@/assets/images/profile.jpg"  @click="todo"/>-->
        <!--          </el-badge>-->
        <!--          <span>待办事项</span>-->
        <!--        </div>-->
      </template>

      <!--加-->

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <el-dropdown-menu></el-dropdown-menu>
        <el-badge
          :value="todoNum"
          :hidden="isHidden"
          :max="99"
          style="margin-top: 5px"
        >
          <div class="avatar-wrapper">
            <img
              src="@/assets/images/news.png"
              class="news-avatar"
              @click="drawer = true"
            />
            <i class="el-icon-caret-bottom" />
          </div>
        </el-badge>
        <el-drawer
          title="待办事项"
          :visible.sync="drawer"
          :direction="direction"
        >
          <el-table
            v-loading="loading"
            :data="newsList"
            :cell-style="cellStyle"
          >
            <el-table-column label="编号" align="center" type="index" />
            <el-table-column
              label="菜单名称1"
              align="center"
              prop="menuName1"
            />
            <el-table-column
              label="菜单名称2"
              align="center"
              prop="menuName2"
            />
            <el-table-column
              label="菜单名称3"
              align="center"
              prop="menuName3"
            />
            <el-table-column
              label="审核状态"
              align="center"
              prop="approvalStatus"
              style="color: red"
            />
            <el-table-column
              v-if="false"
              label="菜单id1"
              align="center"
              prop="menuId1"
            />
            <el-table-column
              v-if="false"
              label="菜单id2"
              align="center"
              prop="menuId2"
            />
            <el-table-column
              v-if="false"
              label="菜单id3"
              align="center"
              prop="menuId3"
            />

            <el-table-column
              label="操作"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="goto(scope.row)"
                  >详情</el-button
                >
                <!--                      <el-button-->
                <!--                        size="mini"-->
                <!--                        type="text"-->
                <!--                        icon="el-icon-delete"-->
                <!--                        @click="handleDelete(scope.row)"-->
                <!--                      >删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>
        <!--        <span>待办事项</span>-->
      </el-dropdown>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { getUserId } from "@/api/system/user";
import {
  listNews,
  getNews,
  delNewsRelated,
  addNews,
  updateNews,
  exportNews,
} from "@/api/news/news";

export default {
  data() {
    return {
      loading: true,
      todoNum: 0,
      total: 0,
      newsList: [],
      userRoles: [],
      isHidden: true,
      drawer: false,
      direction: "rtl",
    };
  },
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },

  created() {
    this.getTodoNum();
    bus.$on("getTodoNum", this.getTodoNum);
  },
  mounted() {},
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (columnIndex === 4) {
        return "color:red";
      }
    },

    /** 跳转按钮操作 */
    async goto(row) {
      // this.reset();
      const { menuId3,menuId2,menuId1} = row
      console.log("row", row);
      this.drawer = false;
      const newsId = row.newsId || this.ids;
      // getNews(newsId).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改消息提示";
      // });
      // if(row.menuName1=="生产过程管理"&&row.menuName2=="基质调配管理"){
      //   console.log("22")
      //   this.$router.push('/process/stromamix');
      // }
      // let ch1 = row.menuName1;
      // let ch2 = row.menuName2;
      // let ch3 = row.menuName3;
      let objRouter = new Map([
        [2158, "/transplant/transplant"], // 出圃信息
        [2207, "/process/stromamix"], // 基质调配管理
        [2177, "/process/loadplate"], // 装盘管理
        [2159, "/process/artiseeding"], // 人工播种管理
        [2183, "/process/machseeding"], // 机器播种管理
        [2201, "/process/sepaseedling"], // 分苗管理
        [2213, "/process/takeoffhat"], // 脱帽管理
        [2151, "/process/moveplate"], //  移盘管理
        [2171, "/process/grafting"], // 嫁接管理
        [2219, "/process/remosproutiller"], // 除萌蘖管理
        [2189, "/process/mergeplate"], // 合盘管理
        [2165, "/process/fertilize"], // 施肥管理
        [2195, "/process/packing"], // 装箱管理
        [2119, "/labormgr/labor"], // 劳动力情况
        [2125, "/labormgr/otherlabor"], // 其他劳动力情况
        [2244, "/production/permitUse/seed"], // 领用中的种子审核
        [2238, "/production/permit/seed"], // 采购中的种子审核
        [3465, "/production/permitUse/stromapermit"], // 基质审核
        [2287, "/production/permit/stromapermit"], // 基质审核
        [3470, "/production/permitUse/plugpermit"], // 穴盘审核
        [2286, "/production/permit/plugpermit"], // 穴盘审核
        [3466, "/production/permitUse/pesticidepermit"], // 农药审核
        [3128, "/production/permit/pesticidepermit"], // 农药审核
        [3467, "/production/permitUse/regulatorpermit"], // 调节剂审核
        [3129, "/production/permit/regulatorpermit"], // 调节剂审核
        [3468, "/production/permitUse/fertilizerpermit"], // 化肥审核
        [3130, "/production/permit/fertilizerpermit"], // 化肥审核
        [3472, "/production/permitUse/graftingclippermit"], // 嫁接夹审核
        [3133, "/production/permit/graftingclippermit"], // 嫁接夹审核
        [3473, "/production/permitUse/graftinglabelpermit"], // 嫁接签审核
        [3132, "/production/permit/graftinglabelpermit"], // 嫁接签审核
        [3474, "/production/permitUse/bladepermit"], // 刀片审核
        [3135, "/production/permit/bladepermit"], // 刀片审核
        [3469, "/production/permitUse/greenhousefilmPermit"], // 棚膜审核
        [3131, "/production/permit/greenhousefilmPermit"], // 棚膜审核
        [3471, "/production/permitUse/cartonpermit"], // 纸箱审核
        [3134, "/production/permit/cartonpermit"], // 纸箱审核
        [2290, "/production/temporaryPermit/seed"], // 种子临时审核
        [3510, "/production/temporaryPermit/stroma"], // 基质临时审核
        [3515, "/production/temporaryPermit/plug"], // 穴盘临时审核
        [3511, "/production/temporaryPermit/pesticide"], // 农药临时审核
        [3512, "/production/temporaryPermit/regulator"], // 调节剂临时审核
        [3513, "/production/temporaryPermit/fertilizer"], // 化肥临时审核
        [3516, "/production/temporaryPermit/graftingclip"], // 嫁接夹临时审核
        [3517, "/production/temporaryPermit/graftinglabel"], // 嫁接签临时审核
        [3519, "/production/temporaryPermit/blade"], // 刀片临时审核
        [3514, "/production/temporaryPermit/greenhousefilm"], // 棚膜临时审核
        [3518, "/production/temporaryPermit/carton"], // 纸箱临时审核
        [2506, "/production/production/seedre"], // 种子退回
        [2507, "/production/production/stromare"], // 基质退回
        [2513, "/production/production/plugre"], // 穴盘退回
        [2519, "/production/production/pesticidere"], // 农药退回
        [2525, "/production/production/regulatorre"], // 调节剂退回
        [2531, "/production/production/fertilizerre"], // 化肥退回
        [2537, "/production/production/graftingclipre"], // 嫁接夹退回
        [2543, "/production/production/graftinglabelre"], // 嫁接签退回
        [2549, "/production/production/bladere"], // 刀片退回
        [2555, "/production/production/greenhousefilmre"], // 棚膜退回
        [2561, "/production/production/cartonre"], // 纸箱退回
      ]);
      this.$router.push(
        `${objRouter.get(
          menuId3 ? menuId3 : menuId2 ? menuId2 : menuId1
        )}`
      );
      await delNewsRelated({
        menuId3,
        menuId2,
        menuId1
      })
      this.getTodoNum()
    },

    handleClose(done) {
      done();
    },
    async getTodoNum() {
      this.todoNum = 0;
      console.log("当前用户的角色", this.$store.getters.roles);
      this.userRoles = this.$store.getters.roles;
      // for(var i=0;i<this.userRoles.length;i++) {
      //   //只有是片区主管，棚长，棚员角色的用户才“看自己的”
      //   if(this.userRoles[i]=="admin"){
      //     this.flag=1
      //   }
      // }

      this.loading = false;
      let response = await listNews();
      let userId = (await getUserId({userName:this.$store.getters.name})).data
      console.log("11");
      this.newsList = [];
      console.log("消息列表", response);
      response.rows.forEach(item => {
        if(item.approvalId === userId) {
          this.newsList.push(item)
        }
      })
      console.log('userId',userId)
      // for (var i = 0; i < this.userRoles.length; i++) {
      //   for (var j = 0; j < response.rows.length; j++) {
      //     // if(this.userRoles[i]=="admin"){
      //     //   this.newsList=response.rows
      //     // }

      //     if (this.userRoles[i] == response.rows[j].approvalBy) {
      //       response.rows[j].approvalStatus = "待审核";
      //       this.newsList.push(response.rows[j]);
      //     }
      //   }
      // }
      // this.minMenuId = response.menuId; // 接收传入的最小一级菜单的id
      this.total = this.newsList.length;
      console.log("数据条数", this.total);
      this.todoNum = this.total;
      console.log("!!", this.todoNum);
      if (this.todoNum !== 0) {
        this.isHidden = false;
      }
      if (this.todoNum == 0) {
        this.isHidden = true;
      }
    },

    // todo() {
    //   console.log(this.$route)
    //   this.$router.push("/user/news");
    // },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .news-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
