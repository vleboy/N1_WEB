<template>
  <div class="rank">
    <p class="title">{{range}}排名</p>
    <Table :columns="columns" :data="rankList" size="small"></Table>
  </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  props: {
    range:String,
    rankList:Array
  },
  data() {
    return {
      columns: [
        {
          title: "排名",
          type: "index",
          maxWidth: 60,
        },
        {
          title: "游戏名",
          key: "name",
        },
      ]
    };
  },
};
</script>
<style lang="less" scoped>
.rank {
  margin:0 auto;
  background-color: #fff;
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
