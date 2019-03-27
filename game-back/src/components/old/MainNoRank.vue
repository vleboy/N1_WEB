<template>
    <div class="home">
        <side-bar/>
        <div class="breadcrumb">
            <bread-crumb :currentPath="currentPath"/>
        </div>
        <Layout :style="{marginLeft: '200px'}">
            <Content>
                <Card>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import SideBar from "@/components/SideBar";
import BreadCrumb from "@/components/BreadCrumb";
export default {
  data() {
    return {};
  },
  computed: {
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    }
  },
  components: { SideBar, BreadCrumb }
};
</script>
<style lang="less" scoped>
.home {
  .breadcrumb {
    height: 40px;
    line-height: 40px;
    margin-left: 210px;
  }
}
</style>
