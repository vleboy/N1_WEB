<template>
  <div ref="scrollCon" class="tags-outer-scroll-con">
    <div ref="scrollBody" class="tags-inner-scroll-body">
      <!--  :style="{left: tagBodyLeft + 'px'}"-->
      <transition-group name="taglist-moving-animation">
        <Tag type="dot" v-for="(item, index) in pageTagsList" ref="tagsPageOpened" :key="item.name" :name="item.name" @on-close="closePage" @click.native="linkTo(item)" :closable="true" :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')">{{ item.title }}</Tag>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "tagsPageOpened",
  data() {
    return {
      currentPageName: this.$route.name
    };
  },
  props: {
    pageTagsList: Array,
    beforePush: {
      type: Function,
      default: item => {
        return true;
      }
    }
  },
  computed: {
    tagsList() {
      return this.$store.state.home.pageOpenedList;
    }
  },
  methods: {
    closePage(event, name) {
      let pageOpenedList = this.$store.state.home.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPageName === name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name === name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
      }
      this.$store.commit("removeTag", name);
      this.$store.commit("closePage", name);
      pageOpenedList = this.$store.state.home.pageOpenedList;
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj);
      }
    },
    linkTo(item) {
      let routerObj = {};
      routerObj.name = item.name;
      if (item.argu) {
        routerObj.params = item.argu;
      }
      if (item.query) {
        routerObj.query = item.query;
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj);
      }
    }
  },
  mounted() {
  },
  watch: {
    $route(to) {
      this.currentPageName = to.name;
    }
  }
};
</script>
<style lang="less">
.tags-outer-scroll-con {
  position: relative;
  box-sizing: border-box;
  padding-right: 120px;
  width: 100%;
  height: 100%;
  .tags-inner-scroll-body {
    // position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
}
</style>