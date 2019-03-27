<template>
    <div class="gamecount">
        <p class="title">游戏局数排名</p>
        <Table :columns="columns" :data="countRank"></Table>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  props:['countRank'],
  data() {
    return {
      columns: [
         {
          title:'排名',
          type:'index',
          maxWidth:60,
          className: "demo-table-info-column"
        },
        {
          title: "游戏名",
          key: "name"
        },
        {
          title: '游戏局数',
          key: "profit",
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.profit));
          }
        }
      ],
     
    };
  },
};
</script>
<style lang="less" scoped>
.gamecount {
  width: 300px;
  margin:0 auto;
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
