<template>
    <div class="sider">
        <Sider width='200px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <img class="logoimg" src="../../static/logo.png" alt="">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="operatorList" >
                  <span>供应商管理</span>
                </MenuItem>
                <MenuItem name="gameList" >
                <span>游戏管理</span>
                </MenuItem>
                <MenuItem name="gameHallConfig" >
                <span>游戏大厅管理</span>
                </MenuItem>
                <MenuItem name="propList" >
                <span>道具列表</span>
                </MenuItem>
                <MenuItem name="packageList" >
                <span>礼包列表</span>
                </MenuItem>
            </Menu>
        </Sider>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // let permission = this.permission;
    // let str = permission.toString();
    // console.log(str.includes("报表"));
  },
  methods: {
    selectMenu(name) {
        this.$router.push({ name: name });
    }
  },
  computed: {
  },
  props: ["openName"],
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  }
};
</script>

<style scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.logoimg {
  max-width: 180px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
