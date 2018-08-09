<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" @click="handleMenu">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <template v-for="(item,index) in menu">
          <a-sub-menu :key="index" v-if="item.children">
            <span slot="title">
              <a-icon type="setting" />
              <span>{{item.title}}</span>
            </span>
            <a-menu-item :key="sub.path" v-for="sub in item.children">{{sub.title}}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path">
            <a-icon type="user" />
            <span>{{item.title}}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    }
  },
  methods: {
    handleMenu(item, key) {
      this.$router.push(key)
    }
  },
  mounted() {
    console.log('this.menu', this.menu)
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
