<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" @click="handleMenu" v-model="key">
        <template v-for="(item,index) in menu">
          <a-sub-menu :key="index" v-if="item.children">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{item.title}}</span>
            </span>
            <a-menu-item :key="sub.path" v-for="sub in item.children">
              <a-icon :type="sub.icon" />{{sub.title}}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path">
            <a-icon :type="item.icon" />
            <span>{{item.title}}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
        <span class="pull-right" style="padding-right:20px">
          <a-dropdown>
            <a class="ant-dropdown-link" v-if="userInfo&&userInfo.data">
              {{userInfo.data.name?userInfo.data.name:userInfo.data.email}}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" disabled>
                <a-icon type="user" style="margin-right:4px" />个人中心
              </a-menu-item>
              <a-menu-item key="1" disabled>
                <a-icon type="setting" style="margin-right:4px" />设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" @click.native="logout">
                <a-icon type="poweroff" style="margin-right:4px" />退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      collapsed: false,
      key: []
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    },
    userInfo() {
      return this.$store.state.sys.userInfo
    }
  },
  methods: {
    handleMenu(item, key) {
      this.$router.push(item.key)
    },
    logout() {
      Cookies.remove('access_token')
      this.$router.replace('/login')
    }
  },
  mounted() {
    this.key = [this.$route.path]
  }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
