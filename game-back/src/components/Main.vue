<template>
  <div class="home">
    <side-bar/>
    <Layout :style="{marginLeft: '200px'}">
      <Header class="main_header">
        <div class="tags-con">
          <tag-close :pageTagsList="pageTagsList" />
        </div>
        <!-- <div class="user-dropdown-menu-con">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Avatar icon="md-person" size="small" style="background: #619fe7;margin-right: 8px;"></Avatar>
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)">
                <span class="main-user-name">({{ uname}})</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
        </div> -->
      </Header>
      <Content>
        <Card :style="{backgroundColor:'#f5f5f5'}">
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
// import BreadCrumb from "@/components/BreadCrumb";
import TagClose from "@/components/TagClose";
import util from "@/libs/util.js";
export default {
  components: { SideBar, TagClose },
  data() {
    return {
      userName: localStorage.subRole,
    };
  },
  computed: {
     pageTagsList() {
      return this.$store.state.home.pageOpenedList; //打开的页面的页面对象
    },
    uname(){
      // return JSON.parse(localStorage.userInfo).uname;
      return 'test'
    }
  },
  created() {},
  mounted(){
    this.init()
  },
  watch: {
    $route(to, from) {
      let name = to.name;
      this.$store.commit("setCurrentPageName", name);
      this.checkTag(name);
    }
  },
  methods:{
    init() {
      this.checkTag(this.$route.name);
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleClickUserDropdown(name) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确认退出</p>",
        onOk: () => {
          localStorage.clear();
          this.$store.commit('clearAllTag')
          this.$router.push({ name: "login" });
          this.$store.commit('changeLoading',{params:false});
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .tags-con {
    height: 60px;
    z-index: -1;
    overflow: hidden;
  }
  .main_header {
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    position: relative;
    z-index: 11;
  }
  .user-dropdown-menu-con {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    text-align: center;
    height: 100%;
    background: white;
    z-index: 10;
    margin-right: 10px;
  }
  .ivu-layout-header {
    padding: 0 50px 0 10px;
  }
}
</style>
