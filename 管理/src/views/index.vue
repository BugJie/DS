<template>
  <el-container class="home">
    <el-header>
      <span>电商后台管理系统</span>
      <div v-if="user" class="name">
        <el-button class="gogogo" type="info" @click="logout"
          >退出登录</el-button
        >
        <span>{{ user }}</span>
      </div>
      <button @click="login()" v-else>登录</button>
    </el-header>
    <el-container>
      <el-aside width="200px" class="infinite-list" style="overflow: auto">
        <el-menu router>
          <!-- 一级for循环一级路由菜单 -->
          <el-submenu v-for="(item) in list" :key="item.id" :index="String(item.order)">
            <template slot="title"><i :class="icon[item.id]"></i>{{ item.authName }}</template>
            <!-- 二级for循环二级路由菜单 -->
            <el-menu-item v-for="it in item.children" :key="it.id" :index="'/index/' + it.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ it.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "../repuire/index.js";
// import Users from '../components/user/users.vue'
// @ is an alias to /src
export default {
  data() {
    return {
      user: null,
      // 左侧菜单数据
      list: [],
      id: null,
      icon: {
        125: "el-icon-user-solid",
        103: "el-icon-bank-card",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-suitcase",
      },
    };
  },
  components: {
    // Users
  },
  mounted() {
    this.user = window.sessionStorage.getItem("user");
    request({
      url: "menus",
      method: "get",
    }).then((res) => {
      this.list = res.data;
    });
  },
  methods: {
    login() {
      this.$router.replace("login");
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style >
html,
body {
  width: 100%;
  height: 100%;
}

.home {
  height: 100%;
}
.el-header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: rgb(51, 55, 68);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  margin-top: 60px;
}
/* .el-header > button {
  width: 60px;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.4);
  outline: none;
  border: none;
} */

.el-aside {
  background-color: rgb(51, 55, 68);
}
.el-menu-item span {
  color: #fff9f3;
}
/* 路由出口padding */
.el-main {
  padding: 60px 20px 20px 0;
  background-color: #eaedf1;
}
.el-menu-item:hover span {
  color: #000;
}
.el-menu-vertical-demo {
  background-color: rgb(51, 55, 68);
}

.el-menu-item {
  background-color: rgb(51, 55, 68);
}

.el-menu-demo {
  position: absolute;
  left: 200px;
}

.el-menu {
  background-color: rgb(51, 55, 68);
}

.el-submenu__title {
  color: #fff !important;
}

.el-submenu__title:hover {
  color: #000 !important;
}
.name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
}
.gogogo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
}
</style>
