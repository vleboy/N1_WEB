<template>
    <div class="sider">
        <Sider width='200px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <h2 class="sysName">老虎机数据管理后台</h2>
            <Menu ref="sideMenu" :active-name="$route.name" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="allGame">
                    <span>全部游戏</span>
                </MenuItem>
                <MenuItem name="taluo">
                    <span>塔罗之谜</span>
                </MenuItem>
                <MenuItem name="chuniang">
                    <span>小厨娘</span>
                </MenuItem>
                <MenuItem name="xianglong">
                    <span>祥龙献瑞</span>
                </MenuItem>
                <MenuItem name="sifang">
                    <span>四方神兽</span>
                </MenuItem>
                <MenuItem name="caisheng">
                    <span>财神进宝</span>
                </MenuItem>
                <MenuItem name="fuyun">
                    <span>福运亨通</span>
                </MenuItem>
                <MenuItem name="panda">
                    <span>熊猫传奇</span>
                </MenuItem>
                <MenuItem name="football">
                    <span>幸运足球</span>
                </MenuItem>
                <MenuItem name="mysterySea">
                    <span>神秘海域</span>
                </MenuItem>
                <!-- <MenuItem name="sepcialCount">
                    <span>特殊统计</span>
                </MenuItem> -->
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
  computed: {},
//   props: ["openName"],
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
.sysName{
    text-align: center;
    background-color: #fff;
    line-height: 60px;
    font-weight: bold;
}
</style>
